import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { sampleCollections } from '@/lib/sample-data';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-16">
          <SectionHeading className="mb-4">Collections</SectionHeading>
          <h1 className="font-display text-4xl md:text-5xl tracking-luxury text-ink-900 mb-6">
            Archive
          </h1>
          <p className="font-sans text-base leading-relaxed text-ink-700 max-w-2xl">
            Each collection represents a moment in time. A study in fabric, form, and the 
            stories we tell through dress. Explore our past seasons and ongoing archive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {sampleCollections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] bg-cream-100 overflow-hidden mb-6">
                <Image
                  src={collection.heroImage}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl tracking-luxury text-ink-900 group-hover:text-ink-700 transition-colors">
                    {collection.title}
                  </h2>
                  <span className="text-xs font-sans tracking-editorial uppercase text-ink-600">
                    {collection.season}
                  </span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
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
