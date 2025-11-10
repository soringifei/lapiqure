'use client';

import { Piece } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ProductBadge from './product-badge';

interface RelatedProductsProps {
  products: Piece[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 6);

  return (
    <div className="pt-16">
      <div className="h-px bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5 mb-16" />
      <h2 className="font-display text-2xl tracking-luxury uppercase text-ink mb-8">
        You May Also Like
      </h2>
      
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 pb-4">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedProductCard({ product }: { product: Piece }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/pieces/${product.slug}`}
      className="flex-shrink-0 w-[280px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-background overflow-hidden mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="280px"
          className={`object-cover transition-all duration-700 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectFit: 'cover' }}
          quality={85}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate`}
            fill
            sizes="280px"
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit: 'cover' }}
            quality={85}
          />
        )}
        
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badges.map((badge) => (
              <ProductBadge key={badge} type={badge} className="backdrop-blur-sm" />
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-display text-xs tracking-editorial uppercase text-ink-700">
            {product.designer}
          </p>
          <p className="font-display text-sm text-ink">
            ${product.price.toLocaleString()}
          </p>
        </div>
        <h3 className="font-sans text-sm text-ink leading-tight line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
