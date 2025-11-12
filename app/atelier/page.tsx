'use client';

import Image from 'next/image';
import SectionHeading from '@/components/section-heading';
import FadeIn from '@/components/fade-in';
import AppointmentForm from '@/components/appointment-form';
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
    <div className="min-h-screen"><section className="relative h-[75vh] overflow-hidden">
        <Image
          src="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          alt="LA PIQÛRE Atelier"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <FadeIn>
            <div className="text-center px-8">
              <p className="font-display text-sm tracking-[0.3em] uppercase text-paper/80 mb-6">
                Private Appointments
              </p>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper mb-6">
                Ateliers
              </h1>
              <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
              <p className="font-sans text-base text-paper/70 max-w-xl mx-auto leading-relaxed">
                Experience our collections in person. By appointment only.
              </p>
            </div>
          </FadeIn>
        </div>
       </section><section className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {locations.map((location, index) => (
            <FadeIn key={location.city} delay={index * 100}>
              <div className="group border border-ink/10 hover:border-ink bg-paper hover:shadow-xl transition-all duration-500"><div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="font-display text-xs uppercase tracking-[0.2em] text-ink-700 block mb-3">
                        {location.type}
                      </span>
                      <h2 className="font-display text-3xl tracking-[0.15em] uppercase text-ink">
                        {location.city}
                      </h2>
                    </div>
                    <ArrowRight className="h-4 w-4 text-ink-700 group-hover:text-ink group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <div className="w-24 h-px bg-ink/20 mb-6" />
                </div>
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
                      <p className="font-display text-xs uppercase tracking-[0.15em] text-ink-700">
                        {location.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-ink-700 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <a 
                        href={`tel:${location.phone}`}
                        className="font-sans text-sm text-ink-700 hover:text-ink transition-colors"
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
                        className="font-sans text-sm text-ink-700 hover:text-ink transition-colors"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div><div className="p-8 pt-8">
                  <AppointmentForm location={location.city} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section><section className="bg-ink text-paper py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="font-display text-xs tracking-[0.3em] uppercase text-paper/60 mb-6">Services</p>
                <h2 className="font-display text-4xl md:text-5xl tracking-[0.15em] uppercase text-paper mb-8">
                  Private Consultations
                </h2>
                <div className="w-24 h-px bg-paper/20 mb-8" />
                <p className="font-sans text-base leading-relaxed text-paper/70 mb-12">
                  By appointment only. Experience the full collection in an intimate setting, 
                  discuss bespoke customization, and receive personalized styling guidance.
                </p>
                <div className="space-y-4 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-paper/20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-paper" />
                    </div>
                    <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Private Collection Viewing</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-paper/20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-paper" />
                    </div>
                    <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Bespoke Customization</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-paper/20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-paper" />
                    </div>
                    <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Personalized Styling</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-paper/20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-paper" />
                    </div>
                    <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Archive Access</p>
                  </div>
                </div>
                <a
                  href="mailto:appointments@lapiqure.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-paper text-ink font-display text-xs uppercase tracking-[0.15em] hover:bg-paper/90 transition-all"
                >
                  Request Appointment
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
              className="inline-flex items-center gap-2 px-8 py-3 border border-ink text-ink font-display text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
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
