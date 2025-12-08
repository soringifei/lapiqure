import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { initFirebaseAdmin } from '@/lib/firebase-admin';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPageContent(slug: string) {
  try {
    const db = initFirebaseAdmin();

    const snapshot = await db
      .collection('crm_content')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      const docRef = db.collection('crm_content').doc(slug);
      const docSnap = await docRef.get();
      if (docSnap.exists) return docSnap.data();
      return null;
    }

    return snapshot.docs[0].data();
  } catch (error) {
    console.error('Error loading dynamic page content for slug:', slug, error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = await getPageContent(params.slug);
  if (!content) return {};
  
  return {
    title: `${content.title} | LA PIQÛRE`,
    description: content.heroDescription,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const content = await getPageContent(params.slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {content.heroImage && (
          <Image
            src={content.heroImage}
            alt={content.heroTitle}
            fill
            priority
            className="object-cover"
            quality={80}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <div className="text-center px-8">
            <h1 className="font-display text-5xl md:text-7xl tracking-[0.2em] uppercase text-paper drop-shadow-2xl mb-6">
              {content.heroTitle}
            </h1>
            <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
            <p className="font-sans text-lg text-paper/90 max-w-2xl mx-auto">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-8 lg:px-12 py-24 space-y-24">
        {content.sections?.map((section: any, index: number) => (
          <section key={index} className="space-y-8">
            <h2 className="font-display text-3xl tracking-[0.15em] uppercase text-ink">
              {section.title}
            </h2>
            <div className="prose prose-lg font-sans text-ink-700">
              <p>{section.content}</p>
            </div>
            {section.image && (
              <div className="relative aspect-video w-full mt-8">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            )}
          </section>
        ))}

        {content.cta?.text && (
          <div className="text-center pt-12">
            <a
              href={content.cta.href}
              className="inline-block bg-ink text-paper px-10 py-4 font-display text-xs uppercase tracking-[0.15em] hover:bg-ink-800 transition-all"
            >
              {content.cta.text}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
