'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { samplePieces } from '@/lib/sample-data';
import type { Piece as SamplePiece } from '@/lib/types';
import PiecesClient, { PiecesClientPiece } from './pieces-client';
import EditorialStory from '@/components/editorial-story';
import { useCRM } from '@/hooks/useCRM';
import { Product } from '@/types/crm';

function mapSampleToPiece(piece: SamplePiece): PiecesClientPiece {
  return {
    id: piece.id,
    slug: piece.slug,
    name: piece.name,
    designer: piece.designer,
    condition: piece.condition,
    images: piece.images,
    price: piece.price,
    category: piece.category,
    sizes: piece.sizes,
    available: piece.available,
    collectionName: piece.collectionName,
  };
}

function mapProductToPiece(product: Product): PiecesClientPiece {
  const sizes = product.size
    ? product.size.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const availabilityStatus = product.availabilityStatus || 'available';
  const isAvailable = availabilityStatus === 'available' && product.stock > 0;

  return {
    id: product.id,
    slug: product.id,
    name: product.name,
    designer: 'LA PIQÛRE',
    condition: 'new',
    images: product.images || [],
    price: product.price,
    category: 'outerwear',
    sizes,
    available: isAvailable,
    collectionName: product.collection,
    availabilityStatus: availabilityStatus,
    availabilityMessage: product.availabilityMessage,
  };
}

export default function PiecesPage() {
  const { service } = useCRM();

  const [pieces, setPieces] = useState<PiecesClientPiece[]>(
    samplePieces.map(mapSampleToPiece)
  );

  const [hero, setHero] = useState({
    title: 'Pieces',
    subtitle: 'Current & Archive',
    description: 'Material innovation meets contemporary design',
    image: '/images/oversized_green_faux_leather_pants1_opt.jpg',
  });

  useEffect(() => {
    const load = async () => {
      try {
        if (!service) return;

        const [products, piecesContent] = await Promise.all([
          service.getProducts(),
          service.getContent('pieces').catch(() => null),
        ]);

        if (products && products.length > 0) {
          const crmPieces = products
            .filter((product) =>
              (product.isVisible !== false) &&
              Array.isArray(product.images) &&
              product.images.length > 0 &&
              typeof product.images[0] === 'string' &&
              product.images[0].length > 0,
            )
            .map(mapProductToPiece);

          if (crmPieces.length > 0) {
            setPieces(crmPieces);
          }
        }

        if (piecesContent) {
          setHero({
            title: (typeof piecesContent.heroTitle === 'string' ? piecesContent.heroTitle : '') || 'Pieces',
            subtitle: (typeof piecesContent.heroDescription === 'string' ? piecesContent.heroDescription : '') || 'Current & Archive',
            description:
              Array.isArray(piecesContent.sections) && piecesContent.sections[0]
                ? (typeof piecesContent.sections[0].content === 'string' ? piecesContent.sections[0].content : '') || 'Material innovation meets contemporary design'
                : 'Material innovation meets contemporary design',
            image:
              (typeof piecesContent.heroImage === 'string' ? piecesContent.heroImage : '') || '/images/oversized_green_faux_leather_pants1_opt.jpg',
          });
        }
      } catch (error) {
        console.error('Error loading pieces page data:', error);
      }
    };

    load();
  }, [service]);

  const totalPieces = pieces.length;
  const availableNow = pieces.filter((p) => p.available).length;
  const categoriesCount = new Set(pieces.map((p) => p.category)).size;
  const collectionsCount = new Set(
    pieces.map((p) => p.collectionName).filter((v) => v && v.length > 0)
  ).size;

  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={hero.image}
          alt="LA PIQÛRE Collection"
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
              {hero.subtitle}
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper mb-6">
              {hero.title}
            </h1>
            <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
            <p className="font-sans text-base text-paper/70 max-w-xl mx-auto leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand/10 py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {totalPieces}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Total Pieces
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {availableNow}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Available Now
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {categoriesCount}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Categories
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {collectionsCount}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Collections
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <PiecesClient pieces={pieces} />
      </section>

      <EditorialStory
        title="Crafted in Our Atelier"
        subtitle="Heritage"
        description="Each piece passes through the hands of skilled artisans in our Paris atelier. We believe in the value of human touch—hand-finished seams, individually placed stitches, and careful attention to every detail that machines cannot replicate."
        imageSrc="/images/turtleneck_sweater_with_intarsia_pattern2_opt.jpg"
        imagePosition="right"
      />
    </div>
  );
}
