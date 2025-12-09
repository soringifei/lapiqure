import { NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const db = initFirebaseAdmin();

    if (!id) {
      const snapshot = await db.collection('crm_content').get();
      const pages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || doc.id.charAt(0).toUpperCase() + doc.id.slice(1),
          slug: data.slug || doc.id,
        };
      });
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
    const docRef = db.collection('crm_content').doc(id);
    const existingDoc = await docRef.get();
    
    const updateData: any = {
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    if (!existingDoc.exists) {
      updateData.createdAt = new Date().toISOString();
    }
    
    await docRef.set(updateData, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
