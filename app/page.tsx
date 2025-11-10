'use client';

import Hero from '@/components/hero';
import SectionHeading from '@/components/section-heading';
import PieceCard from '@/components/piece-card';
import EditorialStrip from '@/components/editorial-strip';
import CraftProcess from '@/components/craft-process';
import { samplePieces } from '@/lib/sample-data';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/newsletter-signup';

export default function Home() {
  const { user } = useAuth();
  const featuredPieces = samplePieces.slice(0, 4);

  const editorialImages = [
    { src: '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs3_opt.jpg', alt: 'Campaign Image 1' },
    { src: '/images/faux_leather_cropped_pants3_opt.jpeg', alt: 'Campaign Image 2' },
    { src: '/images/oversized_green_faux_leather_pants3_opt.jpg', alt: 'Campaign Image 3' },
    { src: '/images/cutsew_distressed_knit_top3_opt.jpeg', alt: 'Campaign Image 4' },
  ];

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          alt="LA PIQÛRE Fashion"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="relative h-8 sm:h-10 w-[180px] sm:w-[220px] mx-auto mb-6">
              <Image 
                src="/brand/logo.png" 
                alt="LA PIQÛRE" 
                fill 
                sizes="220px" 
                className="object-contain" 
                style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                priority 
              />
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase text-paper drop-shadow-2xl">
              AW 2024
            </h1>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-48 lg:py-64">
        <div className="max-w-2xl">
          <SectionHeading className="mb-12">Our Philosophy</SectionHeading>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] text-ink mb-16 leading-tight">
            Material. Craft. Time.
          </h2>
          <p className="font-sans text-sm leading-loose text-ink-700 mb-8">
            We design with restraint. Each collection begins with material research—working 
            directly with mills and artisans to understand the properties of fiber, weave, 
            and finish. The result is garments that improve with age, tell stories through 
            wear, and reject the cycle of disposability.
          </p>
          <p className="font-sans text-sm leading-loose text-ink-700">
            Our atelier operates on a small scale by choice. Limited production allows us 
            to control quality, minimize waste, and maintain relationships with every maker 
            in our supply chain. This is slow luxury—thoughtful, enduring, intentional.
          </p>
        </div>
      </section>

      <section className="bg-sand/10 py-48 lg:py-64">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <SectionHeading>Featured Pieces</SectionHeading>
            <a 
              href="/pieces" 
              className="text-xs font-sans tracking-editorial uppercase text-ink-800 hover:text-ink transition-colors"
            >
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
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
      
      <CraftProcess />

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-48">
        <div className="text-center max-w-xl mx-auto">
          <SectionHeading className="mb-6">Exclusive Access</SectionHeading>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury text-ink mb-6">
            Members-Only Collection
          </h3>
          <p className="font-sans text-sm leading-relaxed text-ink-700 mb-8">
            {user 
              ? 'Welcome back. Browse exclusive pieces available only to members.'
              : 'Early access to new releases, private archive viewings, and exclusive pieces.'}
          </p>
          {user ? (
            <Link
              href="/pieces"
              className="inline-block bg-ink text-paper px-10 py-4 text-sm font-sans tracking-editorial uppercase hover:bg-ink-800 hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              View Collection
            </Link>
          ) : (
            <Link
              href="/auth" 
              className="inline-block bg-ink text-paper px-10 py-4 text-sm font-sans tracking-editorial uppercase hover:bg-ink-800 hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              Request Access
            </Link>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
