'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const categories = [
  { name: 'Outerwear', slug: 'outerwear', image: '/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_opt.jpg' },
  { name: 'Tops', slug: 'tops', image: '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs1_opt.jpg' },
  { name: 'Bottoms', slug: 'bottoms', image: '/images/faux_leather_cropped_pants1_opt.jpeg' },
  { name: 'Knitwear', slug: 'tops', image: '/images/turtleneck_sweater_with_intarsia_pattern1_opt.jpg' },
];

export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-ink-700 hover:text-ink transition-colors">
        <span className="text-xs font-display font-normal tracking-wide uppercase">Categories</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="bg-paper border border-border shadow-2xl p-8">
          <div className="grid grid-cols-4 gap-6 min-w-[800px]">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/pieces?category=${category.slug}`}
                className="group"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative aspect-[3/4] bg-sand/20 overflow-hidden mb-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                </div>
                <p className="font-display text-xs tracking-editorial uppercase text-ink-700 group-hover:text-ink transition-colors text-center">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link
              href="/pieces"
              className="inline-block text-xs font-sans tracking-editorial uppercase text-ink-700 hover:text-ink transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View All Pieces
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
