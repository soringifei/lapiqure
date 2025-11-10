'use client';

import { notFound } from 'next/navigation';
import { samplePieces } from '@/lib/sample-data';
import ProductGallery from '@/components/product-gallery';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { useWaitlist } from '@/lib/waitlist-context';
import { useRecentlyViewed } from '@/lib/recently-viewed-context';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import SizeGuideDialog from '@/components/size-guide-dialog';
import Breadcrumb from '@/components/breadcrumb';
import StickyCartBar from '@/components/sticky-cart-bar';
import RelatedProducts from '@/components/related-products';
import ProductLabel from '@/components/product-label';
import MaterialBreakdown from '@/components/material-breakdown';
import dynamic from 'next/dynamic';

const PersonalizationModal = dynamic(() => import('@/components/personalization-modal'), {
  ssr: false
});

const WaitlistModal = dynamic(() => import('@/components/waitlist-modal'), {
  ssr: false
});

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const piece = samplePieces.find(p => p.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [customText, setCustomText] = useState<string>('');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { addToWaitlist, isOnWaitlist } = useWaitlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  if (!piece) {
    notFound();
  }

  useEffect(() => {
    addToRecentlyViewed(piece);
  }, [piece.id]);

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
  };

  const handleWishlistToggle = () => {
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
                <Badge variant="default">{piece.condition}</Badge>
                {piece.available ? (
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
                {piece.rentalPrice && (
                  <p className="font-sans text-sm text-ink-700">
                    or ${piece.rentalPrice}/month rental
                  </p>
                )}
              </div>

              <p className="font-sans text-xs tracking-editorial uppercase text-ink-700">
                {piece.designer}
              </p>
            </div>

            <div className="pt-12">
              <div className="h-px bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5 mb-12" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink">
                  Select Size
                </h3>
                <SizeGuideDialog />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {piece.sizes.map((size) => (
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

            <div className="space-y-4">
              <button
                onClick={() => setPersonalizationOpen(true)}
                className="w-full px-6 py-3 border border-ink text-ink font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
              >
                + Add Personalization ($50)
              </button>
              
              {customText && (
                <div className="p-4 border border-ink/20 bg-sand/10">
                  <p className="font-mono text-[10px] uppercase text-ink-700 mb-1">Personalization:</p>
                  <p className="font-mono text-sm uppercase text-ink tracking-widest">{customText}</p>
                </div>
              )}
              
              {piece.available ? (
                <Button onClick={handleAddToCart} variant="primary" className="w-full">
                  Add to Cart
                </Button>
              ) : isOnWaitlist(piece.id) ? (
                <Button variant="secondary" className="w-full" disabled>
                  On Waitlist
                </Button>
              ) : (
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="w-full px-10 py-4 border border-ink/10 text-ink hover:border-ink/30 hover:bg-ink/5 transition-all duration-500 font-sans uppercase tracking-[0.15em] text-[11px]"
                >
                  Join Waitlist
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
                  Story
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink-700">
                  {piece.story}
                </p>
              </div>

              {piece.materialComposition && (
                <div>
                  <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                    Materials
                  </h3>
                  <MaterialBreakdown materials={piece.materialComposition} />
                </div>
              )}
              
              {piece.material && !piece.materialComposition && (
                <div>
                  <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                    Material
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-ink-700">
                    {piece.material}
                  </p>
                </div>
              )}

              {piece.care && (
                <div>
                  <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                    Care Instructions
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-ink-700">
                    {piece.care}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                  Collection
                </h3>
                <a
                  href={`/collections`}
                  className="font-sans text-sm text-ink hover:text-ink-700 transition-colors"
                >
                  {piece.collectionName}
                </a>
              </div>

              <div>
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                  Category
                </h3>
                <p className="font-sans text-sm text-ink-700 capitalize">
                  {piece.category}
                </p>
              </div>
              
              {(piece.batchNumber || piece.productionDate) && (
                <div>
                  <h3 className="font-display text-xs tracking-luxury uppercase text-ink mb-3">
                    Production Details
                  </h3>
                  <ProductLabel
                    name={piece.name}
                    batchNumber={piece.batchNumber}
                    productionDate={piece.productionDate}
                    material={piece.material}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <RelatedProducts products={samplePieces} currentProductId={piece.id} />
      </div>
      
      <StickyCartBar
        productName={piece.name}
        price={piece.price}
        onAddToCart={handleAddToCart}
        selectedSize={selectedSize}
      />
      
      <PersonalizationModal
        open={personalizationOpen}
        onOpenChange={setPersonalizationOpen}
        onSave={setCustomText}
        productName={piece.name}
      />
      
      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        productId={piece.id}
        productName={piece.name}
        onJoin={(email) => addToWaitlist(piece.id, piece.name, email)}
      />
    </div>
  );
}
