import { notFound } from 'next/navigation';
import Image from 'next/image';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import PieceCard from '@/components/PieceCard';
import { sampleCollections, samplePieces } from '@/lib/sample-data';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = sampleCollections.find((c) => c.slug === params.slug);

  if (!collection) {
    notFound();
  }

  const collectionPieces = samplePieces.filter(
    (piece) => piece.collectionId === collection.id
  );

  return (
    <div className="min-h-screen">
      <Hero
        imageSrc={collection.heroImage}
        imageAlt={collection.title}
        title={collection.title}
        subtitle={collection.season}
        height="large"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading className="mb-6">Collection Story</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink-900 mb-8">
            {collection.description}
          </h2>
          <p className="font-sans text-base leading-relaxed text-ink-700">
            {collection.story}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="flex overflow-x-auto gap-6 px-6 lg:px-8 pb-4">
          {collection.images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-shrink-0 w-[350px] h-[500px] bg-cream-100"
            >
              <Image
                src={image}
                alt={`${collection.title} detail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {collectionPieces.length > 0 && (
        <section className="bg-cream-50 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeading className="mb-12">Pieces in This Collection</SectionHeading>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {collectionPieces.map((piece) => (
                <PieceCard
                  key={piece.id}
                  name={piece.name}
                  slug={piece.slug}
                  designer={piece.designer}
                  condition={piece.condition}
                  imageSrc={piece.images[0]}
                  price={piece.price}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
