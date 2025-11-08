import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import StoryBlock from '@/components/StoryBlock';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Hero
        imageSrc="/images/about-hero.jpg"
        imageAlt="Atelier Workshop"
        title="Our Story"
        subtitle="About"
        height="medium"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading className="mb-6">Philosophy</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink-900 mb-8">
            Slow Luxury. Honest Craft.
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed text-ink-700">
            Founded in 2020, our atelier exists outside the traditional fashion calendar. 
            We design with patience, source with care, and produce in small batches. 
            Each collection is a conversation between material and form, rooted in 
            the belief that clothing should be made to last.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/about-workshop.jpg"
          imageAlt="Workshop detail"
          title="Material First"
          content="We begin every collection with material research. Working directly with mills in Portugal, Italy, and Japan, we study the properties of each fiber—how linen softens with wear, how wool holds its shape, how silk catches light. The fabrics inform the design, not the other way around."
          imagePosition="left"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/about-atelier.jpg"
          imageAlt="Atelier interior"
          title="Small Scale by Choice"
          content="Our Paris workshop operates with a team of five. This allows us to maintain complete control over every seam, every finish, every detail. We reject mass production in favor of considered craftsmanship. Each piece is cut, sewn, and finished with care."
          imagePosition="right"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/about-archive.jpg"
          imageAlt="Archive pieces"
          title="Design for Longevity"
          content="We design garments to be worn for decades, not seasons. This means choosing timeless silhouettes, reinforcing stress points, and using only natural materials that age beautifully. When something is built to last, the idea of disposal becomes irrelevant."
          imagePosition="left"
        />
      </section>

      <section className="bg-cream-50 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="font-display text-2xl tracking-luxury text-ink-900 mb-4">
                Est. 2020
              </h3>
              <p className="font-sans text-sm text-ink-700">
                Founded in Paris with a focus on material integrity and slow production
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-luxury text-ink-900 mb-4">
                5-Person Team
              </h3>
              <p className="font-sans text-sm text-ink-700">
                Small atelier structure allowing for complete quality control
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-luxury text-ink-900 mb-4">
                2 Collections/Year
              </h3>
              <p className="font-sans text-sm text-ink-700">
                Limited seasonal releases plus ongoing archive pieces
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeading className="mb-6">Visit Us</SectionHeading>
          <h3 className="font-display text-2xl md:text-3xl tracking-luxury text-ink-900 mb-6">
            Atelier & Showroom
          </h3>
          <p className="font-sans text-base leading-relaxed text-ink-700 mb-8">
            Our workshop is open by appointment for fittings, consultations, and 
            private viewings of current and archive collections.
          </p>
          <div className="space-y-2 font-sans text-sm text-ink-700">
            <p>15 Rue de la Pierre Levée</p>
            <p>75011 Paris, France</p>
            <p className="pt-4">atelier@example.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
