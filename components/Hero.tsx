import Image from 'next/image';
import { getBlurDataURL } from '@/lib/blur-placeholders';

interface HeroProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  height?: 'full' | 'large' | 'medium';
}

export default function Hero({
  imageSrc, 
  imageAlt, 
  title, 
  subtitle,
  height = 'large' 
}: HeroProps) {
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[85vh]',
    medium: 'h-[60vh]',
  };

  return (
    <div className={`relative ${heightClasses[height]} w-full overflow-hidden animate-in fade-in duration-1000`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={75}
        placeholder="blur"
        blurDataURL={getBlurDataURL(imageSrc.split('/').pop() || '') || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='}
        fetchPriority="high"
      />
      
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      )}
      
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            {subtitle && (
              <p className="font-display text-sm md:text-base tracking-[0.3em] uppercase text-paper mb-4 opacity-90">
                {subtitle}
              </p>
            )}
            {title && (
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase text-paper drop-shadow-2xl">
                {title}
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
