'use client';

import Image from 'next/image';
import SectionHeading from '@/components/section-heading';
import FadeIn from '@/components/fade-in';
import { MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';

const locations = [
  {
    city: 'Paris',
    address: '12 Rue de la Paix, 75002',
    hours: 'Mon-Sat: 11:00-19:00',
    phone: '+33 1 42 60 38 14',
    email: 'paris@lapiqure.com',
    type: 'Flagship Atelier'
  },
  {
    city: 'New York',
    address: '125 Greene Street, SoHo',
    hours: 'Mon-Sun: 11:00-20:00',
    phone: '+1 212 925 8437',
    email: 'ny@lapiqure.com',
    type: 'Showroom'
  },
  {
    city: 'Tokyo',
    address: '3-12-15 Minami-Aoyama, Minato-ku',
    hours: 'Tue-Sun: 12:00-19:00',
    phone: '+81 3 5468 5424',
    email: 'tokyo@lapiqure.com',
    type: 'Boutique'
  }
];

export default function AtelierPage() {
  return (
    <div className="min-h-screen"><section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          alt="LA PIQÛRE Atelier"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <FadeIn>
            <div className="max-w-2xl px-8">
              <p className="font-display text-sm md:text-base tracking-[0.3em] uppercase text-paper/90 mb-6">
                Visit Us
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-paper mb-8">
                Ateliers
              </h1>
              <p className="font-sans text-base text-paper/80 leading-relaxed max-w-lg mx-auto">
                Experience our collections in person. Private appointments available 
                for bespoke consultations and personalized styling.
              </p>
            </div>
          </FadeIn>
        </div>
      </section><section className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {locations.map((location, index) => (
            <FadeIn key={location.city} delay={index * 100}>
              <div className="group border border-ink/10 hover:border-ink bg-paper hover:shadow-xl transition-all duration-500"><div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wide text-ink-700 block mb-2">
                        {location.type}
                      </span>
                      <h2 className="font-display text-2xl tracking-luxury uppercase text-ink">
                        {location.city}
                      </h2>
                    </div>
                    <ArrowRight className="h-4 w-4 text-ink-700 group-hover:text-ink group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <div className="h-px bg-ink/10 mb-6" />
                </div><div className="px-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-ink-700 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-sans text-sm text-ink leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-ink-700 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wide text-ink-700">
                        {location.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-ink-700 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <a 
                        href={`tel:${location.phone}`}
                        className="font-mono text-xs text-ink-700 hover:text-ink transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-ink-700 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <a 
                        href={`mailto:${location.email}`}
                        className="font-mono text-xs text-ink-700 hover:text-ink transition-colors"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div><div className="p-8 pt-8">
                  <button className="w-full px-6 py-3 border border-ink/20 text-ink font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all group">
                    <span className="flex items-center justify-center gap-2">
                      Book Appointment
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                    </span>
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section><section className="bg-sand/10 py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <SectionHeading className="mb-6">Services</SectionHeading>
                <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink mb-8">
                  Private Consultations
                </h2>
                <p className="font-sans text-base leading-relaxed text-ink-700 mb-8">
                  Schedule a private viewing to explore the full collection, discuss customization 
                  options, and receive personalized styling advice. Our ateliers offer an intimate 
                  environment to experience the craftsmanship and quality of each piece.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-ink" />
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-700">Private Collection Viewing</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-ink" />
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-700">Personalization Consultations</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-ink" />
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-700">Styling Advisory</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-ink" />
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-700">Archive Pieces Access</p>
                  </div>
                </div>
                <a
                  href="mailto:appointments@lapiqure.com"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink-800 transition-all"
                >
                  Request Private Appointment
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </a>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="relative aspect-[4/5] bg-sand/20 overflow-hidden">
                <Image
                  src="/images/oversized_green_faux_leather_pants1_opt.jpg"
                  alt="Private consultation at LA PIQÛRE atelier"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section><section className="py-24">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <FadeIn>
            <SectionHeading className="mb-6">Visit Us</SectionHeading>
            <h3 className="font-display text-2xl md:text-3xl tracking-luxury text-ink mb-6">
              Experience LA PIQÛRE
            </h3>
            <p className="font-sans text-base text-ink-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Each atelier reflects our commitment to craft and attention to detail. 
              Visit us to discover pieces that speak to your individual style.
            </p>
            <a
              href="mailto:contact@lapiqure.com"
              className="inline-flex items-center gap-2 px-8 py-3 border border-ink text-ink font-mono text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
            >
              General Inquiries
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
