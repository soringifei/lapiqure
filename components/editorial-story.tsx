'use client';

import Image from 'next/image';
import FadeIn from './fade-in';

interface EditorialStoryProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imagePosition?: 'left' | 'right';
}

export default function EditorialStory({
  title,
  subtitle,
  description,
  imageSrc,
  imagePosition = 'left'
}: EditorialStoryProps) {
  return (
    <section className="py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
          imagePosition === 'right' ? 'lg:grid-flow-dense' : ''
        }`}>
          <FadeIn className={imagePosition === 'right' ? 'lg:col-start-2' : ''}>
            <div className="relative aspect-[4/5] bg-sand/20 overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
            </div>
          </FadeIn>

          <FadeIn delay={200} className={imagePosition === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <div className="space-y-6">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700">
                {subtitle}
              </p>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-luxury text-ink">
                {title}
              </h2>
              
              <p className="font-sans text-base leading-relaxed text-ink-700 max-w-xl">
                {description}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
