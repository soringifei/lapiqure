import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, preferredDate, preferredTime, message } = body;

    if (!name || !email || !location || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
New Appointment Request - LA PIQÛRE

Client Information:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Appointment Details:
-------------------
Location: ${location}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}

Message:
-------------------
${message || 'No additional message'}

---
This request was submitted via the LA PIQÛRE atelier booking form.
    `.trim();

    const zohoEmailData = {
      from: {
        address: process.env.ZOHO_FROM_EMAIL || 'appointments@lapiqure.com',
      },
      to: [
        {
          email_address: {
            address: process.env.ZOHO_TO_EMAIL || 'alin@lapiqure.com',
          },
        },
      ],
      subject: `New Appointment Request - ${location} - ${name}`,
      textbody: emailContent,
      htmlbody: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #1F1A17;">New Appointment Request - LA PIQÛRE</h2>
            
            <h3 style="color: #4F4843; margin-top: 20px;">Client Information:</h3>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
              </tr>
            </table>

            <h3 style="color: #4F4843; margin-top: 20px;">Appointment Details:</h3>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${preferredDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Time:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${preferredTime}</td>
              </tr>
            </table>

            ${message ? `
              <h3 style="color: #4F4843; margin-top: 20px;">Message:</h3>
              <p style="background: #f5f5f5; padding: 15px; border-left: 3px solid #1F1A17;">${message}</p>
            ` : ''}

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="color: #888; font-size: 12px;">This request was submitted via the LA PIQÛRE atelier booking form.</p>
          </body>
        </html>
      `,
    };

    const zohoApiUrl = 'https://api.zeptomail.com/v1.1/email';
    
    const zohoResponse = await fetch(zohoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.ZOHO_API_KEY || '',
      },
      body: JSON.stringify(zohoEmailData),
    });

    if (!zohoResponse.ok) {
      const errorData = await zohoResponse.json().catch(() => ({}));
      console.error('Zoho API Error:', errorData);
      throw new Error('Failed to send email via Zoho');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Appointment request sent successfully' 
    });

  } catch (error) {
    console.error('Appointment API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment request' },
      { status: 500 }
    );
  }
}
