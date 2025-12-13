import { NextRequest, NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Normalize email (lowercase, trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Initialize Firebase Admin
    const db = initFirebaseAdmin();

    // Check if email already exists
    const existingQuery = await db
      .collection('newsletter_subscriptions')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      // Email already exists, return success but don't create duplicate
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter',
        alreadySubscribed: true,
      });
    }

    // Create new subscription
    const subscriptionData = {
      email: normalizedEmail,
      subscribedAt: Timestamp.now(),
      active: true,
      source: 'website', // Track where subscription came from
    };

    await db.collection('newsletter_subscriptions').add(subscriptionData);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    );
  }
}

