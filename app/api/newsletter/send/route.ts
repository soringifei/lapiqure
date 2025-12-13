import { NextRequest, NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { renderEmailTemplate, EmailTemplateType, EmailTemplateData } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      templateType, 
      emailData, 
      recipientEmails, 
      subject,
      campaignId 
    } = body;

    // Validate required fields
    if (!templateType || !emailData || !recipientEmails || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: templateType, emailData, recipientEmails, subject' },
        { status: 400 }
      );
    }

    if (!Array.isArray(recipientEmails) || recipientEmails.length === 0) {
      return NextResponse.json(
        { error: 'recipientEmails must be a non-empty array' },
        { status: 400 }
      );
    }

    // Initialize Firebase Admin
    const db = initFirebaseAdmin();

    // Fetch subscriber emails if not provided
    let emailsToSend: string[] = [];
    
    if (recipientEmails.length === 1 && recipientEmails[0] === 'all_subscribers') {
      // Fetch all active newsletter subscribers
      const subscribersSnapshot = await db
        .collection('newsletter_subscriptions')
        .where('active', '==', true)
        .get();
      
      emailsToSend = subscribersSnapshot.docs.map(doc => doc.data().email);
    } else {
      emailsToSend = recipientEmails;
    }

    if (emailsToSend.length === 0) {
      return NextResponse.json(
        { error: 'No valid recipients found' },
        { status: 400 }
      );
    }

    // Get Zoho API key
    const zohoApiKey = process.env.ZOHO_API_KEY;
    if (!zohoApiKey) {
      return NextResponse.json(
        { error: 'Zoho API key not configured' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lapiqure.vercel.app';
    const fromEmail = process.env.ZOHO_FROM_EMAIL || 'alin@lapiqure.com';

    // Track sending results
    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Send emails via Zoho ZeptoMail
    for (const email of emailsToSend) {
      try {
        // Personalize email data for this recipient
        const personalizedData: EmailTemplateData = {
          ...emailData,
          personalization: {
            firstName: emailData.personalization?.firstName || '',
            // In production, you might want to fetch actual subscriber data
          },
        };

        // Generate unsubscribe URL
        const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

        // Render email template
        const htmlBody = renderEmailTemplate(
          templateType as EmailTemplateType,
          personalizedData,
          unsubscribeUrl
        );

        // Send via Zoho ZeptoMail
        const zohoResponse = await fetch('https://api.zeptomail.com/v1.1/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': zohoApiKey,
          },
          body: JSON.stringify({
            from: {
              address: fromEmail,
            },
            to: [
              {
                email_address: {
                  address: email,
                },
              },
            ],
            subject: subject,
            htmlbody: htmlBody,
          }),
        });

        if (!zohoResponse.ok) {
          const errorData = await zohoResponse.json().catch(() => ({}));
          results.failed++;
          results.errors.push(`${email}: ${JSON.stringify(errorData)}`);
          console.error(`Failed to send email to ${email}:`, errorData);
          continue;
        }

        results.sent++;

        // Track email send in Firestore
        await db.collection('email_sends').add({
          email,
          subject,
          templateType,
          campaignId: campaignId || null,
          sentAt: Timestamp.now(),
          status: 'sent',
        });

      } catch (error) {
        results.failed++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        results.errors.push(`${email}: ${errorMsg}`);
        console.error(`Error sending email to ${email}:`, error);
      }
    }

    // Update campaign if campaignId provided
    if (campaignId) {
      try {
        await db.collection('crm_campaigns').doc(campaignId).update({
          status: 'completed',
          sentAt: Timestamp.now(),
          'metrics.sent': results.sent,
        });
      } catch (error) {
        console.error('Error updating campaign:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent successfully`,
      results: {
        total: emailsToSend.length,
        sent: results.sent,
        failed: results.failed,
        errors: results.errors.slice(0, 10), // Limit errors returned
      },
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter. Please try again later.' },
      { status: 500 }
    );
  }
}

