'use client';

import Image from 'next/image';
import FadeIn from './fade-in';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Material Selection',
    description: 'We begin by sourcing the finest materials from certified mills in Italy, Portugal, and Japan. Each fabric is hand-selected for its quality, texture, and sustainability credentials.',
    image: '/images/faux_leather_cropped_pants2_opt.jpeg'
  },
  {
    number: '02',
    title: 'Pattern Development',
    description: 'Our atelier team creates unique patterns through traditional draping techniques. Each piece is developed with precision, considering both form and function.',
    image: '/images/turtleneck_sweater_with_intarsia_pattern3_opt.jpg'
  },
  {
    number: '03',
    title: 'Hand Finishing',
    description: 'Skilled artisans in our Paris atelier complete each garment by hand. From button attachment to final pressing, every detail receives individual attention.',
    image: '/images/cutsew_distressed_knit_top2_opt.jpeg'
  },
  {
    number: '04',
    title: 'Quality Control',
    description: 'Before leaving the atelier, each piece undergoes rigorous inspection. We ensure every stitch, seam, and finish meets our exacting standards.',
    image: '/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs4_opt.jpg'
  }
];

export default function CraftProcess() {
  return (
    <section className="py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-20">
          <p className="font-mono text-xs uppercase tracking-wide text-ink-700 mb-4">
            The Atelier
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-luxury text-ink mb-6">
            Our Process
          </h2>
          <p className="font-mono text-sm text-ink-700 max-w-2xl mx-auto leading-relaxed">
            EACH PIECE PASSES THROUGH FOUR STAGES OF METICULOUS CRAFT. 
            FROM MATERIAL SELECTION TO FINAL INSPECTION, WE HONOR TRADITIONAL 
            TECHNIQUES WHILE EMBRACING MODERN SUSTAINABILITY.
          </p>
        </FadeIn>

        <div className="space-y-32">
          {processSteps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 100}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative aspect-[4/3] bg-sand/20 overflow-hidden border border-ink/10">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      quality={85}
                    />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="inline-block border border-ink px-4 py-2">
                    <span className="font-mono text-2xl tracking-wide text-ink">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-mono text-xl uppercase tracking-wide text-ink">
                    {step.title}
                  </h3>
                  
                  <p className="font-mono text-sm leading-relaxed text-ink-700 max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400} className="mt-32 text-center">
          <div className="inline-block border border-ink p-8 bg-background">
            <p className="font-mono text-xs uppercase tracking-wide text-ink mb-4">
              Production Time
            </p>
            <p className="font-mono text-4xl text-ink mb-2">
              14-21 DAYS
            </p>
            <p className="font-mono text-[10px] text-ink-700">
              FROM CUT TO COMPLETION
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
