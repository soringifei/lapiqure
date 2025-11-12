import Link from 'next/link';
import Image from 'next/image';
import { sampleCollections } from '@/lib/sample-data';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[75vh] overflow-hidden">
        <Image
          src="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          alt="LA PIQÛRE Collections"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <div className="text-center px-8">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-paper/80 mb-6">
              Seasonal Archives
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper mb-6">
              Collections
            </h1>
            <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
            <p className="font-sans text-base text-paper/70 max-w-xl mx-auto leading-relaxed">
              Each collection explores material innovation through contemporary design
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-32">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {sampleCollections.map((collection, index) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] bg-sand/20 overflow-hidden mb-8">
                <Image
                  src={collection.heroImage}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-in-out"
                  quality={90}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center">
                    <span className="font-display text-xs text-ink-700">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="font-display text-xs tracking-[0.2em] uppercase text-ink-700">
                    {collection.season}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-[0.15em] uppercase text-ink group-hover:text-ink-700 transition-colors">
                  {collection.title}
                </h2>
                <div className="w-24 h-px bg-ink/20" />
                <p className="font-sans text-base leading-relaxed text-ink-700">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
