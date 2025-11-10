'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { Heart, Eye } from 'lucide-react';
import { samplePieces } from '@/lib/sample-data';
import { useState } from 'react';
import QuickViewDialog from './quick-view-dialog';
import ProductBadge from './product-badge';
import ColorSwatches from './color-swatches';

interface PieceCardProps {
  name: string;
  slug: string;
  designer: string;
  condition: string;
  imageSrc: string;
  price: number;
}

export default function PieceCard({ 
  name, 
  slug, 
  designer, 
  condition, 
  imageSrc, 
  price
}: PieceCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const { toast } = useToast();
  const piece = samplePieces.find(p => p.slug === slug);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (piece) {
      toggleItem(piece);
      toast({
        title: isInWishlist(piece.id) ? "Removed from wishlist" : "Added to wishlist",
        description: isInWishlist(piece.id) 
          ? `${name} has been removed from your wishlist.`
          : `${name} has been saved to your wishlist.`,
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuickViewOpen(true);
  };

  return (
    <>
      <Link 
        href={`/pieces/${slug}`} 
        className="group block transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <div className="relative aspect-[3/4] bg-background overflow-hidden mb-8">{!imageLoaded && (
          <div className="absolute inset-0 bg-sand/20 animate-pulse" />
        )}<Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{ objectFit: 'cover' }}
          quality={80}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />{piece && piece.images[1] && (
          <Image
            src={piece.images[1]}
            alt={`${name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ objectFit: 'cover' }}
            quality={75}
            loading="lazy"
          />
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {condition !== 'new' && (
            <span className="bg-paper/90 backdrop-blur-sm px-3 py-1 text-xs tracking-editorial uppercase font-sans">
              {condition}
            </span>
          )}
          {piece && piece.badges && piece.badges.map((badge) => (
            <ProductBadge key={badge} type={badge} className="backdrop-blur-sm" />
          ))}
        </div>
        {piece && (
          <>
            <button
              onClick={handleWishlistClick}
              className="absolute top-4 right-4 p-2 bg-paper/90 backdrop-blur-sm hover:bg-paper transition-all duration-300 z-10"
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 ${
                  isInWishlist(piece.id)
                    ? 'fill-ink text-ink'
                    : 'text-ink-700 hover:text-ink'
                }`}
              />
            </button>
            <button
              onClick={handleQuickView}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-paper/90 backdrop-blur-sm hover:bg-paper transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
            >
              <Eye className="h-4 w-4 text-ink" />
              <span className="text-xs font-sans tracking-editorial uppercase text-ink">Quick View</span>
            </button>
          </>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {designer && designer.toUpperCase().includes('LA PIQ') ? (
              <div className="relative h-3 w-[70px]">
                <Image src="/brand/logo.png" alt="LA PIQÛRE" fill sizes="70px" className="object-contain" />
              </div>
            ) : (
              <p className="font-display text-[10px] tracking-[0.2em] uppercase text-ink-700">{designer}</p>
            )}
          </div>
          <p className="font-display text-base text-ink">
            ${price.toLocaleString()}
          </p>
        </div>
        <h3 className="font-sans text-[13px] text-ink leading-relaxed tracking-wide">
          {name}
        </h3>
        {piece && piece.colors && (
          <ColorSwatches colors={piece.colors} className="mt-2" />
        )}
      </div>
      </Link>
      
      {piece && (
        <QuickViewDialog
          piece={piece}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      )}
    </>
  );
}
