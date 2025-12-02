import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const db = initFirebaseAdmin();

    if (!id) {
      // List all pages
      const snapshot = await db.collection('crm_content').select('id', 'title', 'slug').get();
      const pages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json(pages);
    }

    const docRef = db.collection('crm_content').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // Return default structure if not found
      return NextResponse.json({
        id,
        title: id.charAt(0).toUpperCase() + id.slice(1),
        slug: id,
        heroTitle: '',
        heroDescription: '',
        heroImage: '',
        sections: [],
        cta: { text: '', href: '' },
      });
    }

    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'Page ID required' }, { status: 400 });
    }

    const db = initFirebaseAdmin();
    await db.collection('crm_content').doc(id).set({
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
