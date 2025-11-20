'use client';

import Image from 'next/image';
import SectionHeading from '@/components/section-heading';
import FadeIn from '@/components/fade-in';
import { ArrowRight } from 'lucide-react';

const consultationServices = [
  {
    title: 'Private Collection Viewing',
    description: 'Browse our full collection in an intimate, personalized setting.',
    icon: '✨'
  },
  {
    title: 'Bespoke Customization',
    description: 'Create pieces tailored to your specifications and vision.',
    icon: '🎨'
  },
  {
    title: 'Personalized Styling',
    description: 'Receive expert guidance on pieces that match your aesthetic.',
    icon: '👗'
  },
  {
    title: 'Archive Access',
    description: 'Explore past collections and discover rare, limited pieces.',
    icon: '📚'
  }
];

export default function AtelierPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[75vh] overflow-hidden">
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
      </section>

      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
        <div className="text-center mb-20">
          <FadeIn>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-ink-700 mb-4">Our Approach</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-[0.15em] uppercase text-ink mb-6">
              Consultation Experience
            </h2>
            <div className="w-24 h-px bg-ink/20 mx-auto mb-6" />
            <p className="font-sans text-base text-ink-700 max-w-2xl mx-auto leading-relaxed">
              By appointment only. We believe in creating meaningful connections with each client, 
              offering a curated experience tailored to your unique style and vision.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {consultationServices.map((service, index) => (
            <FadeIn key={service.title} delay={index * 100}>
              <div className="group border border-ink/10 hover:border-ink/30 bg-paper hover:bg-paper/50 transition-all duration-500 p-8">
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="font-display text-xl tracking-[0.1em] uppercase text-ink mb-3">
                  {service.title}
                </h3>
                <div className="w-12 h-px bg-ink/20 mb-4" />
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="font-display text-xs tracking-[0.3em] uppercase text-paper/60 mb-6">How It Works</p>
                <h2 className="font-display text-4xl md:text-5xl tracking-[0.15em] uppercase text-paper mb-8">
                  Schedule Your Appointment
                </h2>
                <div className="w-24 h-px bg-paper/20 mb-8" />
                <p className="font-sans text-base leading-relaxed text-paper/70 mb-8">
                  We offer private consultations by appointment. Our team is dedicated to creating a personalized experience tailored to your needs.
                </p>
                <div className="space-y-4 mb-12">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="font-display text-xs uppercase tracking-[0.15em] text-paper/80 w-6 h-6 flex items-center justify-center border border-paper/20">1</div>
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Request a consultation</p>
                      <p className="font-sans text-xs text-paper/60 mt-1">Tell us about your vision and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="font-display text-xs uppercase tracking-[0.15em] text-paper/80 w-6 h-6 flex items-center justify-center border border-paper/20">2</div>
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Confirm your appointment</p>
                      <p className="font-sans text-xs text-paper/60 mt-1">We&rsquo;ll coordinate the perfect time for you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="font-display text-xs uppercase tracking-[0.15em] text-paper/80 w-6 h-6 flex items-center justify-center border border-paper/20">3</div>
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.15em] text-paper/80">Experience personalized service</p>
                      <p className="font-sans text-xs text-paper/60 mt-1">Enjoy a curated selection and expert guidance</p>
                    </div>
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
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <FadeIn>
            <SectionHeading className="mb-6">Direct Contact</SectionHeading>
            <h3 className="font-display text-2xl md:text-3xl tracking-luxury text-ink mb-6">
              Get in Touch
            </h3>
            <p className="font-sans text-base text-ink-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Have questions about our consultation services? We&rsquo;d love to hear from you.
              Reach out to schedule an appointment or inquire about bespoke customization.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:appointments@lapiqure.com"
                className="inline-flex items-center gap-2 px-8 py-3 border border-ink text-ink font-display text-xs uppercase tracking-wide hover:bg-ink hover:text-paper transition-all"
              >
                appointments@lapiqure.com
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
