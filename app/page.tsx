import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import PieceCard from '@/components/PieceCard';
import EditorialStrip from '@/components/EditorialStrip';
import { samplePieces } from '@/lib/sample-data';

export default function Home() {
  const featuredPieces = samplePieces.slice(0, 4);

  const editorialImages = [
    { src: '/images/editorial/lookbook-1.jpg', alt: 'Campaign Image 1' },
    { src: '/images/editorial/lookbook-2.jpg', alt: 'Campaign Image 2' },
    { src: '/images/editorial/lookbook-3.jpg', alt: 'Campaign Image 3' },
    { src: '/images/editorial/lookbook-4.jpg', alt: 'Campaign Image 4' },
  ];

  return (
    <>
      <Hero
        imageSrc="/images/hero-home.jpg"
        imageAlt="Atelier Fashion"
        title="AW 2024"
        subtitle="Atelier"
        height="full"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <SectionHeading className="mb-6">Our Philosophy</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink-900 mb-8">
            Material. Craft. Time.
          </h2>
          <p className="font-sans text-base leading-relaxed text-ink-700 mb-6">
            We design with restraint. Each collection begins with material research—working 
            directly with mills and artisans to understand the properties of fiber, weave, 
            and finish. The result is garments that improve with age, tell stories through 
            wear, and reject the cycle of disposability.
          </p>
          <p className="font-sans text-base leading-relaxed text-ink-700">
            Our atelier operates on a small scale by choice. Limited production allows us 
            to control quality, minimize waste, and maintain relationships with every maker 
            in our supply chain. This is slow luxury—thoughtful, enduring, intentional.
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <SectionHeading>Featured Pieces</SectionHeading>
            <a 
              href="/pieces" 
              className="text-xs font-sans tracking-editorial uppercase text-ink-800 hover:text-ink-900 transition-colors"
            >
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPieces.map((piece) => (
              <PieceCard
                key={piece.id}
                name={piece.name}
                slug={piece.slug}
                designer={piece.designer}
                condition={piece.condition}
                imageSrc={piece.images[0]}
                price={piece.price}
                collectionName={piece.collectionName}
              />
            ))}
          </div>
        </div>
      </section>

      <EditorialStrip images={editorialImages} title="AW 2024 Campaign" />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-xl mx-auto">
          <SectionHeading className="mb-6">Atelier Access</SectionHeading>
          <h3 className="font-display text-2xl md:text-3xl tracking-luxury text-ink-900 mb-6">
            Members-Only Closet
          </h3>
          <p className="font-sans text-sm leading-relaxed text-ink-700 mb-8">
            Early access to new collections, private archive sales, and rental options 
            for statement pieces. Invitation only.
          </p>
          <a 
            href="/auth" 
            className="inline-block bg-ink-900 text-cream-50 px-8 py-3 text-xs font-sans tracking-editorial uppercase hover:bg-ink-800 transition-colors"
          >
            Request Access
          </a>
        </div>
      </section>
    </>
  );
}
