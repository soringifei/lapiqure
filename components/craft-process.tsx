'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeIn from './fade-in';
import { useCRM } from '@/hooks/useCRM';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface ProcessHighlight {
  label: string;
  value: string;
  sublabel: string;
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
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
  },
];

const DEFAULT_HIGHLIGHT: ProcessHighlight = {
  label: 'Production Time',
  value: '14-21 Days',
  sublabel: 'From Cut to Completion',
};

export default function CraftProcess() {
  const { service } = useCRM();
  const [steps, setSteps] = useState<ProcessStep[]>(DEFAULT_PROCESS_STEPS);
  const [highlight, setHighlight] = useState<ProcessHighlight>(DEFAULT_HIGHLIGHT);

  useEffect(() => {
    const load = async () => {
      if (!service) return;
      try {
        const content = (await service.getContent('home')) as {
          processSteps?: Partial<ProcessStep>[];
          processHighlight?: Partial<ProcessHighlight>;
        };

        if (content.processSteps && content.processSteps.length > 0) {
          const mapped = content.processSteps.map((step, index) => ({
            number: step.number || DEFAULT_PROCESS_STEPS[index]?.number || `0${index + 1}`,
            title: step.title || DEFAULT_PROCESS_STEPS[index]?.title || '',
            description: step.description || DEFAULT_PROCESS_STEPS[index]?.description || '',
            image: step.image || DEFAULT_PROCESS_STEPS[index]?.image || DEFAULT_PROCESS_STEPS[0].image,
          }));
          setSteps(mapped);
        }

        if (content.processHighlight) {
          setHighlight({
            label: content.processHighlight.label || DEFAULT_HIGHLIGHT.label,
            value: content.processHighlight.value || DEFAULT_HIGHLIGHT.value,
            sublabel: content.processHighlight.sublabel || DEFAULT_HIGHLIGHT.sublabel,
          });
        }
      } catch (error) {
        console.error('Error loading home process content:', error);
      }
    };

    load();
  }, [service]);

  return (
    <section className="py-24 lg:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="text-center mb-16">
          <p className="font-display text-xs uppercase tracking-wide text-ink-700 mb-4">
            The Atelier
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-luxury text-ink mb-6">
            Our Process
          </h2>
          <p className="font-sans text-base text-ink-700 max-w-2xl mx-auto leading-relaxed">
            Each piece passes through four stages of meticulous craft. 
            From material selection to final inspection, we honor traditional 
            techniques while embracing modern sustainability.
          </p>
        </FadeIn>

        <div className="space-y-24">
          {steps.map((step, index) => (
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
                  
                  <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                    {step.title}
                  </h3>
                  
                  <p className="font-sans text-base leading-relaxed text-ink-700 max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400} className="mt-24 text-center">
          <div className="inline-block border border-ink p-8 bg-paper">
            <p className="font-display text-xs uppercase tracking-wide text-ink mb-4">
              {highlight.label}
            </p>
            <p className="font-display text-4xl text-ink mb-2">
              {highlight.value}
            </p>
            <p className="font-sans text-xs text-ink-700 uppercase tracking-wide">
              {highlight.sublabel}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
