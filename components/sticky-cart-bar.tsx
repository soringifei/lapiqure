'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/button';

interface StickyCartBarProps {
  productName: string;
  price: number;
  onAddToCart: () => void;
  selectedSize: string | null;
}

export default function StickyCartBar({ productName, price, onAddToCart, selectedSize }: StickyCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-paper border-t border-border z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-sans uppercase tracking-wide text-ink-800">{productName}</span>
          <span className="text-lg font-serif text-ink mt-1">${price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {selectedSize && (
            <span className="text-sm font-sans text-ink-700">Size: <span className="text-ink font-medium">{selectedSize}</span></span>
          )}
          <Button
            onClick={onAddToCart}
            disabled={!selectedSize}
            className="bg-ink text-paper hover:bg-ink-800 font-sans uppercase tracking-wide text-xs px-8 py-6"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
