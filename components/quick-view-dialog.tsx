'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Piece } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { Heart, X } from 'lucide-react';
import Badge from './ui/badge';
import Link from 'next/link';

interface QuickViewDialogProps {
  piece: Piece | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuickViewDialog({ piece, open, onOpenChange }: QuickViewDialogProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toast } = useToast();

  if (!piece) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Select a size",
        description: "Please select a size before adding to cart.",
      });
      return;
    }
    addItem(piece, selectedSize);
    toast({
      title: "Added to cart",
      description: `${piece.name} (${selectedSize}) has been added to your cart.`,
    });
    onOpenChange(false);
  };

  const handleWishlistToggle = () => {
    toggleItem(piece);
    toast({
      title: isInWishlist(piece.id) ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist(piece.id)
        ? `${piece.name} has been removed from your wishlist.`
        : `${piece.name} has been saved to your wishlist.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-paper p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Quick View: {piece.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-0">
          {/* Image Gallery */}
          <div className="bg-sand/5 p-8 md:p-12">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-sand/20 overflow-hidden group">
                <Image
                  src={piece.images[currentImageIndex]}
                  alt={`${piece.name} - ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={95}
                  priority
                />
              </div>
              
              {piece.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {piece.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[3/4] bg-sand/20 overflow-hidden transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'ring-1 ring-ink opacity-100' 
                          : 'ring-1 ring-ink/10 opacity-50 hover:opacity-100 hover:ring-ink/30'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${piece.name} thumbnail ${index + 1}`}
                        fill
                        sizes="150px"
                        className="object-cover"
                        quality={80}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12 flex flex-col">
            {/* Header */}
            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink-700 px-3 py-1.5 border border-ink/10">
                    {piece.condition}
                  </span>
                  {piece.available && (
                    <span className="font-mono text-[9px] uppercase tracking-wide text-ink-700 px-3 py-1.5 border border-ink/10">
                      In Stock
                    </span>
                  )}
                </div>

                <h2 className="font-display text-3xl md:text-4xl tracking-[0.05em] uppercase text-ink leading-tight">
                  {piece.name}
                </h2>

                <p className="font-mono text-[10px] tracking-wide uppercase text-ink-700">
                  {piece.designer}
                </p>
              </div>

              <div className="h-px bg-ink/10" />

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <p className="font-display text-3xl text-ink">${piece.price.toLocaleString()}</p>
                  {piece.rentalPrice && (
                    <span className="font-mono text-[10px] text-ink-700 uppercase tracking-wide">
                      Rental Available
                    </span>
                  )}
                </div>
                {piece.rentalPrice && (
                  <p className="font-sans text-sm text-ink-700">
                    ${piece.rentalPrice}/month
                  </p>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-mono text-[9px] tracking-wide uppercase text-ink mb-4">
                Select Size
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {piece.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border font-mono text-xs uppercase tracking-wide transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/20 text-ink-700 hover:border-ink hover:bg-sand/10 hover:text-ink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!piece.available}
                className="w-full bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {piece.available ? 'Add to Cart' : 'Sold Out'}
              </button>

              <button
                onClick={handleWishlistToggle}
                className="w-full border border-ink/20 text-ink px-8 py-4 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    isInWishlist(piece.id) ? 'fill-current' : ''
                  }`}
                  strokeWidth={1.5}
                />
                {isInWishlist(piece.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Story */}
            {piece.story && (
              <div className="pt-6 border-t border-ink/10 mb-6">
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  {piece.story}
                </p>
              </div>
            )}

            {/* Full Details Link */}
            <div className="mt-auto pt-6 border-t border-ink/10">
              <Link 
                href={`/pieces/${piece.slug}`} 
                onClick={() => onOpenChange(false)}
                className="group flex items-center justify-between text-ink hover:text-ink-700 transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide">
                  View Full Details
                </span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
