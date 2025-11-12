import Image from 'next/image';

interface EditorialImage {
  src: string;
  alt: string;
}

interface EditorialStripProps {
  images: EditorialImage[];
  title?: string;
}

export default function EditorialStrip({ images, title }: EditorialStripProps) {
  return (
    <section className="py-32 lg:py-40 bg-gradient-to-b from-transparent via-sand/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {title && (
          <div className="mb-12 text-center">
            <h2 className="font-display text-xs tracking-wide uppercase text-ink-800">
              {title}
            </h2>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[3/4] bg-sand/20 overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
