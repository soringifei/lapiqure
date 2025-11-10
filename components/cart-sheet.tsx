'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ShoppingBag, X, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={`relative text-ink-700 hover:text-ink transition-all duration-300 ${
          isAnimating ? 'scale-125' : 'scale-100'
        }`}>
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className={`absolute -top-1.5 -right-1.5 bg-ink text-paper rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-display transition-all duration-300 ${
              isAnimating ? 'animate-bounce' : ''
            }`}>
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-paper flex flex-col">
        <SheetHeader className="border-b border-ink/10 pb-6">
          <SheetTitle className="font-display text-xl tracking-[0.2em] uppercase text-ink">
            Your Cart
          </SheetTitle>
          <SheetDescription className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mt-2">
            {totalItems === 0 ? 'Empty' : `${totalItems} Piece${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 border-2 border-ink/20 flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-ink/20" strokeWidth={1} />
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-700 mb-2">Cart Empty</p>
              <p className="font-sans text-xs text-ink-700 mb-8 text-center px-8">
                Start building your collection
              </p>
              <Link href="/pieces">
                <button className="px-8 py-3 border border-ink text-ink font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all">
                  Browse Pieces
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6 pr-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="group flex gap-4 pb-6 border-b border-ink/10 last:border-0">
                  <Link href={`/pieces/${item.slug}`} className="relative w-28 h-36 bg-sand/20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      quality={85}
                    />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Link href={`/pieces/${item.slug}`} className="flex-1 min-w-0">
                          <h3 className="font-sans text-sm text-ink line-clamp-2 hover:text-ink-700 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize)}
                          className="text-ink-700 hover:text-ink transition-colors flex-shrink-0 p-1 -mt-1 -mr-1"
                          title="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-700 mb-3">
                        Size {item.selectedSize}
                      </p>
                      <p className="font-display text-base text-ink">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="w-8 h-8 border border-ink/20 hover:border-ink hover:bg-sand/10 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        title="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs text-ink min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="w-8 h-8 border border-ink/20 hover:border-ink hover:bg-sand/10 transition-all flex items-center justify-center"
                        title="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-6 pt-6 border-t border-ink/10">
            {/* Subtotal */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wide uppercase text-ink-700">
                  Subtotal
                </span>
                <span className="font-display text-xl text-ink">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="font-sans text-[10px] text-ink-700 leading-relaxed">
                Shipping, taxes, and discount codes calculated at checkout
              </p>
            </div>
            
            {/* Free shipping indicator */}
            {totalPrice < 500 && (
              <div className="w-full p-3 bg-sand/10 border border-ink/10">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink text-center">
                  Add ${(500 - totalPrice).toLocaleString()} for free shipping
                </p>
                <div className="mt-2 h-1 bg-ink/10 overflow-hidden">
                  <div 
                    className="h-full bg-ink transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Checkout button */}
            <Link href="/checkout" className="w-full">
              <button className="w-full bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink-800 transition-all duration-300">
                Proceed to Checkout
              </button>
            </Link>
            
            {/* Continue shopping */}
            <Link href="/pieces" className="w-full">
              <button className="w-full border border-ink/20 text-ink px-8 py-3 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all">
                Continue Shopping
              </button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
