import Image from 'next/image';

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
    <div className={`relative ${heightClasses[height]} w-full overflow-hidden`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      )}
      
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-end justify-start">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
            {subtitle && (
              <p className="font-display text-xs tracking-luxury uppercase text-cream-50 mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-luxury text-white">
                {title}
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
