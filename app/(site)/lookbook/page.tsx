'use client';

import FadeIn from '@/components/fade-in';
import Image from 'next/image';
import Link from 'next/link';

const lookbooks = [
  {
    id: 1,
    title: 'Urban Elegance',
    season: 'AW 2024',
    description: 'Architectural silhouettes meet street sophistication. Monochrome palettes with unexpected textures.',
    coverImage: '/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg',
    images: [
      '/images/faux_leather_mixed_with_embossed_zebra_leather_jacket2.jpg',
      '/images/faux_leather_cropped_pants3.jpeg',
      '/images/oversized_green_faux_leather_pants2.jpg'
    ]
  },
  {
    id: 2,
    title: 'Soft Power',
    season: 'SS 2024',
    description: 'Fluid forms and tactile materials. The strength of subtlety expressed through precise tailoring.',
    coverImage: '/images/turtleneck_sweater_with_intarsia_pattern1.jpg',
    images: [
      '/images/turtleneck_sweater_with_intarsia_pattern2.jpg',
      '/images/cutsew_distressed_knit_top2.jpeg',
      '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs3.jpg'
    ]
  },
  {
    id: 3,
    title: 'Midnight Garden',
    season: 'AW 2024',
    description: 'Dark florals and organic textures. Nature reimagined through an urban lens.',
    coverImage: '/images/over_sized_faux_leather_pants1.jpg',
    images: [
      '/images/over_sized_faux_leather_pants2.jpg',
      '/images/over_sized_faux_leather_pants3.jpg',
      '/images/faux_leather_cropped_pants5.jpeg'
    ]
  }
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen">
        <Image
          src="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          alt="LA PIQÛRE Lookbook"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <FadeIn>
            <div className="text-center px-8">
              <p className="font-display text-sm tracking-[0.3em] uppercase text-paper/80 mb-6">
                AW 2024
              </p>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper mb-6">
                Lookbook
              </h1>
              <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
              <p className="font-sans text-base text-paper/70 max-w-xl mx-auto leading-relaxed">
                Curated visual narratives exploring design, material, and form
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-32 bg-paper">
        <div className="max-w-3xl mx-auto px-8 lg:px-12 text-center">
          <FadeIn>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700 mb-8">Editorial</p>
            <div className="w-32 h-px bg-ink/20 mx-auto mb-12" />
            <p className="font-sans text-base leading-relaxed text-ink-700 max-w-2xl mx-auto">
              Each lookbook explores a distinct aesthetic vision, showcasing how our pieces 
              come together to create complete statements. From urban elegance to quiet power, 
              discover the stories behind the collections.
            </p>
          </FadeIn>
        </div>
      </section>

      <div>

        {lookbooks.map((lookbook, index) => (
          <section key={lookbook.id} className={index % 2 === 0 ? 'bg-paper' : 'bg-sand/5'}>
            <div className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
              <FadeIn delay={index * 50}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                    <div className="space-y-8">
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.3em] text-ink-700 mb-4">
                          {lookbook.season}
                        </p>
                        <h2 className="font-display text-5xl md:text-6xl tracking-[0.15em] text-ink mb-6 uppercase">
                          {lookbook.title}
                        </h2>
                        <div className="w-24 h-px bg-ink/20 mb-6" />
                        <p className="font-sans text-base leading-relaxed text-ink-700">
                          {lookbook.description}
                        </p>
                      </div>

                      <Link
                        href="/pieces"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-ink/20 text-ink hover:border-ink hover:bg-sand/5 transition-all font-display text-xs uppercase tracking-[0.15em] group"
                      >
                        <span>Explore Collection</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-8">
                        <div className="relative aspect-[4/5] overflow-hidden bg-sand/20 group">
                          <Image
                            src={lookbook.coverImage}
                            alt={lookbook.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            quality={90}
                          />
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-4 space-y-4">
                        {lookbook.images.slice(0, 2).map((img, imgIndex) => (
                          <div key={imgIndex} className="relative aspect-square overflow-hidden bg-sand/20 group">
                            <Image
                              src={img}
                              alt={`${lookbook.title} ${imgIndex + 2}`}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-1000"
                              quality={85}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-ink text-paper py-32">
        <div className="max-w-3xl mx-auto px-8 lg:px-12 text-center">
          <FadeIn>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-paper/60 mb-8">Services</p>
            <h3 className="font-display text-4xl md:text-5xl tracking-[0.15em] text-paper mb-8 uppercase">
              Private Styling
            </h3>
            <div className="w-32 h-px bg-paper/20 mx-auto mb-12" />
            <p className="font-sans text-base leading-relaxed text-paper/70 max-w-2xl mx-auto mb-12">
              By appointment only. Discover how pieces from different collections 
              work together to express your unique aesthetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/atelier"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-paper text-ink hover:bg-paper/90 transition-all font-display text-xs uppercase tracking-[0.15em]"
              >
                Book Appointment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/pieces"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-paper/20 text-paper hover:border-paper hover:bg-paper/5 transition-all font-display text-xs uppercase tracking-[0.15em]"
              >
                Browse Collection
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
