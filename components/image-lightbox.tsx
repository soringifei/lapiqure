'use client';

import Image from 'next/image';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export default function ImageLightbox({ 
  images, 
  initialIndex, 
  open, 
  onOpenChange,
  productName 
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const toggleZoom = () => {
    setZoom((prev) => prev === 1 ? 2.5 : 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] h-screen w-screen p-0 bg-ink/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={toggleZoom}
            className="absolute top-8 left-8 z-50 p-3 bg-paper/10 hover:bg-paper/20 text-paper transition-all"
          >
            {zoom === 1 ? <ZoomIn className="h-6 w-6" /> : <ZoomOut className="h-6 w-6" />}
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-8 z-50 p-3 bg-paper/10 hover:bg-paper/20 text-paper transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-8 z-50 p-3 bg-paper/10 hover:bg-paper/20 text-paper transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex items-center justify-center p-16">
            <div className="relative w-full h-full" onClick={toggleZoom} style={{ cursor: 'zoom-in' }}>
              <Image
                src={images[currentIndex]}
                alt={`${productName} - Image ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-500"
                style={{ transform: `scale(${zoom})` }}
                quality={100}
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(1);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-paper w-6' 
                    : 'bg-paper/40 hover:bg-paper/60'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
