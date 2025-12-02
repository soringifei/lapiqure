'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductGallery from '@/components/product-gallery';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import SizeGuideDialog from '@/components/size-guide-dialog';
import Breadcrumb from '@/components/breadcrumb';
import StickyCartBar from '@/components/sticky-cart-bar';
import RelatedProducts from '@/components/related-products';
import { useCRM } from '@/hooks/useCRM';
import { Product } from '@/types/crm';
import { Skeleton } from '@/components/ui/skeleton';
import { orderBy, limit } from 'firebase/firestore';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { service } = useCRM();
  const [piece, setPiece] = useState<Product | null>(null);
  const [relatedPieces, setRelatedPieces] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPiece = async () => {
      if (!service) return;
      try {
        setLoading(true);
        const product = await service.getProduct(params.slug);
        if (product) {
          setPiece(product);
          const related = await service.getProducts([orderBy('createdAt', 'desc'), limit(5)]);
          setRelatedPieces(related.filter(p => p.id !== product.id).slice(0, 4));
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchPiece();
  }, [service, params.slug]);

  const handleAddToCart = () => {
    if (!piece) return;
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Select a size",
        description: "Please select a size before adding to cart.",
      });
      return;
    }
    // @ts-expect-error: addItem expects a different product type.
    addItem(piece, selectedSize);
    toast({
      title: "Added to cart",
      description: `${piece.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!piece) return;
    // @ts-expect-error: toggleItem expects a different product type.
    toggleItem(piece);
    if (isInWishlist(piece.id)) {
      toast({
        title: "Removed from wishlist",
        description: `${piece.name} has been removed from your wishlist.`,
      });
    } else {
      toast({
        title: "Added to wishlist",
        description: `${piece.name} has been saved to your wishlist.`,
      });
    }
  };

  if (loading || !piece) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
          <Skeleton className="h-6 w-64 mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
              </div>
            </div>
            <div className="space-y-12">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-4 gap-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/pieces' },
          { label: piece.name }
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
          <ProductGallery images={piece.images} productName={piece.name} />

          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default">New</Badge>
                {piece.stock > 0 ? (
                  <Badge variant="outline">Available</Badge>
                ) : (
                  <Badge variant="outline">Sold Out</Badge>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury text-ink mb-3">
                {piece.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="font-display text-2xl text-ink">${piece.price}</p>
              </div>

              <div className="flex items-center">
                <div className="relative h-4 w-[90px]">
                  <Image src="/brand/logo.png" alt="LA PIQÛRE" fill sizes="90px" className="object-contain" />
                </div>
              </div>
            </div>

            {piece.size && (
            <div className="pt-12">
              <div className="h-px bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5 mb-12" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink">
                  Select Size
                </h3>
                <SizeGuideDialog />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {piece.size.split(',').map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm font-sans transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-ink bg-ink text-paper'
                        : 'border-border text-ink-700 hover:border-ink hover:text-ink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            )}

            <div className="space-y-4">
              {piece.stock > 0 ? (
                <Button onClick={handleAddToCart} variant="primary" className="w-full">
                  Add to Cart
                </Button>
              ) : (
                <button
                  disabled
                  className="w-full px-10 py-4 border border-ink/10 text-ink/50 transition-all duration-500 font-sans uppercase tracking-[0.15em] text-[11px]"
                >
                  Sold out
                </button>
              )}
              <Button 
                onClick={handleWishlistToggle}
                variant="secondary" 
                className="w-full flex items-center justify-center gap-2"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isInWishlist(piece.id) ? 'fill-current' : ''
                  }`}
                />
                {isInWishlist(piece.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            <div className="pt-12 space-y-10">
              <div className="h-px bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5 mb-12" />
              <div>
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                  Description
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  {piece.description}
                </p>
              </div>

              <div>
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                  Collection
                </h3>
                <a
                  href={`/collections`}
                  className="font-sans text-sm text-ink hover:text-ink-700 transition-colors"
                >
                  {piece.collection}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <RelatedProducts products={relatedPieces} currentProductId={piece.id} />
      </div>
      
      <StickyCartBar
        productName={piece.name}
        price={piece.price}
        onAddToCart={handleAddToCart}
        selectedSize={selectedSize}
      />
      
    </div>
  );
}
