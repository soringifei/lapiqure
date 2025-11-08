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
    <section className="py-24">
      {title && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <h2 className="font-display text-xs tracking-luxury uppercase text-ink-800">
            {title}
          </h2>
        </div>
      )}
      
      <div className="flex overflow-x-auto gap-6 px-6 lg:px-8 pb-4 scrollbar-hide">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative flex-shrink-0 w-[400px] h-[500px] bg-cream-100"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
