'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from './image-lightbox';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div 
        className="relative aspect-[3/4] bg-sand/20 overflow-hidden group cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-all duration-700"
          quality={90}
          priority
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index 
                  ? 'bg-paper w-6' 
                  : 'bg-paper/50 hover:bg-paper/75'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-[3/4] bg-sand/20 overflow-hidden transition-all duration-500 hover:opacity-100 ${
              selectedIndex === index ? 'ring-2 ring-ink opacity-100' : 'opacity-60'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 15vw"
              className="object-cover"
              quality={75}
            />
          </button>
        ))}
      </div>
      
      <ImageLightbox
        images={images}
        initialIndex={selectedIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        productName={productName}
      />
    </div>
  );
}
