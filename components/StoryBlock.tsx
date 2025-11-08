import Image from 'next/image';

interface StoryBlockProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  content: string;
  imagePosition?: 'left' | 'right';
}

export default function StoryBlock({ 
  imageSrc, 
  imageAlt, 
  title, 
  content, 
  imagePosition = 'left' 
}: StoryBlockProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
      imagePosition === 'right' ? 'lg:grid-flow-dense' : ''
    }`}>
      <div className={`relative aspect-[4/5] bg-cream-100 ${
        imagePosition === 'right' ? 'lg:col-start-2' : ''
      }`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="space-y-6">
        <h3 className="font-display text-2xl md:text-3xl tracking-luxury text-ink-900">
          {title}
        </h3>
        <div className="font-sans text-sm md:text-base leading-relaxed text-ink-700 space-y-4">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
