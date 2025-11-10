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
    <section className="py-32 bg-gradient-to-b from-transparent via-sand/5 to-transparent">
      {title && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <h2 className="font-display text-xs tracking-luxury uppercase text-ink-800">
            {title}
          </h2>
        </div>
      )}
      
      <div className="flex overflow-x-auto gap-8 px-6 lg:px-8 pb-4 scrollbar-hide justify-center">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative flex-shrink-0 w-[450px] h-[600px] bg-sand/20 overflow-hidden hover:shadow-2xl transition-shadow duration-700 group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="450px"
              className="object-cover group-hover:scale-110 transition-all duration-700"
              quality={85}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
