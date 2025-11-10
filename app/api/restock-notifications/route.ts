import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseApp } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productId, productName } = body;

    if (!email || !productId || !productName) {
      return NextResponse.json(
        { error: 'Email, productId, and productName are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const app = getFirebaseApp();
    const db = getFirestore(app);

    await addDoc(collection(db, 'restockNotifications'), {
      email,
      productId,
      productName,
      notified: false,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to restock notification' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating restock notification:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to restock notification' },
      { status: 500 }
    );
  }
}
