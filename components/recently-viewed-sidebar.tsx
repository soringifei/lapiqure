'use client';

import { useState } from 'react';
import { useRecentlyViewed } from '@/lib/recently-viewed-context';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, X } from 'lucide-react';

export default function RecentlyViewedSidebar() {
  const { recentlyViewed } = useRecentlyViewed();
  const [isVisible, setIsVisible] = useState(true);

  if (recentlyViewed.length === 0 || !isVisible) return null;

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-paper/95 backdrop-blur-xl border border-ink/10 p-6 w-64 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-ink-700" strokeWidth={1.5} />
            <h3 className="font-mono text-[10px] uppercase tracking-wide text-ink-700">
              Recently Viewed
            </h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-ink-700 hover:text-ink transition-colors p-1 -mr-1"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-4">
          {recentlyViewed.slice(0, 4).map((piece) => (
            <Link
              key={piece.id}
              href={`/pieces/${piece.slug}`}
              className="group block"
            >
              <div className="flex gap-3">
                <div className="relative w-16 h-20 bg-background flex-shrink-0 overflow-hidden">
                  <Image
                    src={piece.images[0]}
                    alt={piece.name}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={75}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[9px] tracking-[0.15em] uppercase text-ink-700 mb-1">
                    {piece.designer}
                  </p>
                  <p className="font-sans text-[11px] text-ink leading-tight mb-2 line-clamp-2">
                    {piece.name}
                  </p>
                  <p className="font-display text-xs text-ink">
                    ${piece.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {recentlyViewed.length > 4 && (
          <Link
            href="/pieces"
            className="block mt-6 pt-4 border-t border-ink/5 text-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-700 hover:text-ink transition-colors">
              View All
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
