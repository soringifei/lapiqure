'use client';

import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Piece } from '@/lib/types';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleAddToCart = (piece: Piece) => {
    if (!piece.sizes || piece.sizes.length === 0) {
      toast({
        variant: "destructive",
        title: "No sizes available",
        description: "This piece is currently out of stock.",
      });
      return;
    }

    addItem(piece, piece.sizes[0]);
    toast({
      title: "Added to cart",
      description: `${piece.name} has been added to your cart.`,
    });
  };

  const handleRemove = (id: string) => {
    removeItem(id);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-md mx-auto">
            <h1 className="font-display text-4xl tracking-luxury uppercase text-ink mb-6">
              Your Wishlist
            </h1>
            <p className="font-sans text-sm text-ink-700 mb-8 leading-relaxed">
              Save pieces you love for later. Your wishlist is currently empty.
            </p>
            <Link
              href="/pieces"
              className="inline-block px-8 py-3 bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink-800 transition-all"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl tracking-luxury uppercase text-ink mb-4">
            Your Wishlist
          </h1>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-700">
            {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((piece) => (
            <div key={piece.id} className="group relative"><button
                onClick={() => handleRemove(piece.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-paper/90 backdrop-blur-sm border border-ink/20 hover:bg-ink hover:text-paper transition-all"
                title="Remove from wishlist"
              >
                <X className="h-4 w-4" />
              </button><Link href={`/pieces/${piece.slug}`} className="block relative aspect-[3/4] bg-sand/20 overflow-hidden mb-4">
                {imageLoading[piece.id] !== false && (
                  <div className="absolute inset-0 bg-sand/20 animate-pulse" />
                )}
                <Image
                  src={piece.images[0]}
                  alt={piece.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-all duration-700 ${
                    imageLoading[piece.id] === false 
                      ? 'opacity-100 group-hover:scale-105' 
                      : 'opacity-0'
                  }`}
                  quality={85}
                  onLoad={() => setImageLoading(prev => ({ ...prev, [piece.id]: false }))}
                  priority={false}
                />
              </Link><div className="space-y-3">
                <Link href={`/pieces/${piece.slug}`}>
                  <h3 className="font-display text-lg tracking-luxury text-ink group-hover:text-ink-700 transition-colors">
                    {piece.name}
                  </h3>
                  <p className="font-sans text-xs tracking-editorial uppercase text-ink-700 mt-1">
                    {piece.designer}
                  </p>
                </Link>

                <div className="flex items-center justify-between">
                  <p className="font-display text-xl text-ink">
                    ${piece.price.toLocaleString()}
                  </p>
                  {!piece.available && (
                    <span className="font-mono text-[10px] uppercase tracking-wide text-red-600">
                      Sold Out
                    </span>
                  )}
                </div>

                {piece.available ? (
                  <button
                    onClick={() => handleAddToCart(piece)}
                    className="w-full px-6 py-3 border border-ink text-ink font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    href={`/pieces/${piece.slug}`}
                    className="block w-full px-6 py-3 border border-ink/20 text-ink-700 font-mono text-xs uppercase tracking-wide text-center hover:border-ink hover:text-ink transition-all"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
