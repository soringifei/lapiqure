'use client';

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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <div className="text-center px-8">
            <div className="relative h-8 sm:h-10 w-[180px] sm:w-[220px] mx-auto mb-8">
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
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper drop-shadow-2xl mb-6">
              AW 2024
            </h1>
            <div className="w-32 h-px bg-paper/30 mx-auto" />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700 mb-8">Our Philosophy</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] uppercase text-ink mb-8 leading-tight">
            Material. Craft. Time.
          </h2>
          <div className="w-32 h-px bg-ink/20 mx-auto mb-12" />
          <p className="font-sans text-base leading-relaxed text-ink-700 mb-8">
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

      <section className="bg-sand/10 py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between mb-20">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700">Featured Pieces</p>
            <a 
              href="/pieces" 
              className="font-display text-xs uppercase tracking-[0.15em] text-ink-800 hover:text-ink transition-colors"
            >
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredPieces.map((piece) => (
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

      <EditorialStrip images={editorialImages} title="AW 2024 Campaign" />
      
      <CraftProcess />

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700 mb-8">Exclusive Access</p>
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] uppercase text-ink mb-8">
            Members-Only Collection
          </h3>
          <div className="w-32 h-px bg-ink/20 mx-auto mb-10" />
          <p className="font-sans text-base leading-relaxed text-ink-700 mb-10">
            {user 
              ? 'Welcome back. Browse exclusive pieces available only to members.'
              : 'Early access to new releases, private archive viewings, and exclusive pieces.'}
          </p>
          
          {!user && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 border border-ink/20 flex items-center justify-center mx-auto mb-4">
                  <div className="font-display text-lg text-ink">01</div>
                </div>
                <h4 className="font-display text-xs uppercase tracking-[0.2em] text-ink mb-3">Early Access</h4>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  First view of new collections and archive pieces
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 border border-ink/20 flex items-center justify-center mx-auto mb-4">
                  <div className="font-display text-lg text-ink">02</div>
                </div>
                <h4 className="font-display text-xs uppercase tracking-[0.2em] text-ink mb-3">Customization</h4>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  Bespoke embroidery and monogramming services
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 border border-ink/20 flex items-center justify-center mx-auto mb-4">
                  <div className="font-display text-lg text-ink">03</div>
                </div>
                <h4 className="font-display text-xs uppercase tracking-[0.2em] text-ink mb-3">Exclusive Pieces</h4>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  Access to limited edition and one-of-a-kind garments
                </p>
              </div>
            </div>
          )}
          
          {user ? (
            <Link
              href="/pieces"
              className="inline-block bg-ink text-paper px-10 py-4 font-display text-xs uppercase tracking-[0.15em] hover:bg-ink-800 transition-all"
            >
              View Collection
            </Link>
          ) : (
            <Link
              href="/auth" 
              className="inline-block bg-ink text-paper px-10 py-4 font-display text-xs uppercase tracking-[0.15em] hover:bg-ink-800 transition-all"
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
