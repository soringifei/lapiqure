import Hero from '@/components/Hero';
import SectionHeading from '@/components/section-heading';
import StoryBlock from '@/components/story-block';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Hero
        imageSrc="/images/turtleneck_sweater_with_intarsia_pattern5.jpg"
        imageAlt="LA PIQÛRE Studio"
        title="Our Story"
        subtitle="About"
        height="medium"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading className="mb-6">Philosophy</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink mb-8">
            Bold Materials. Contemporary Edge.
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed text-ink-700">
            Founded in 2020, LA PIQÛRE exists outside the traditional fashion calendar. 
            We design with intention, source premium materials, and produce in limited runs. 
            Each collection challenges convention through striking textures and architectural silhouettes.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/faux_leather_cropped_pants4.jpeg"
          imageAlt="Premium materials"
          title="Material First"
          content="We begin every collection with material research. Premium faux leathers, distressed knits, embossed textures—each fabric is chosen for its character and durability. We work with specialized suppliers who share our commitment to quality and innovation."
          imagePosition="left"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs4.jpg"
          imageAlt="LA PIQÛRE craftsmanship"
          title="Small Scale by Choice"
          content="Our studio operates with a focused team dedicated to quality. This allows us to maintain complete control over every detail—from initial design to final finishing. We reject mass production in favor of considered craftsmanship and limited releases."
          imagePosition="right"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <StoryBlock
          imageSrc="/images/oversized_green_faux_leather_pants2.jpg"
          imageAlt="Archive pieces"
          title="Design for Longevity"
          content="We design garments to transcend trends. Bold silhouettes, premium construction, and materials that age with character. Each piece is engineered to become more personal over time—softening, molding, developing patina. Built to be worn, not replaced."
          imagePosition="left"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading className="mb-6 text-center">Our Commitment</SectionHeading>
          <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink mb-12 text-center">
            Responsible by Design
          </h2>
          
          <div className="space-y-8 font-sans text-base leading-relaxed text-ink-700">
            <p>
              LA PIQÛRE approaches fashion with intention. We reject the cycle of overproduction 
              and disposability that defines the industry. Instead, we focus on creating pieces 
              that justify their existence through quality, design integrity, and lasting value.
            </p>
            
            <p>
              Our commitment begins with material selection. We prioritize premium faux leathers 
              and synthetic alternatives that offer durability without compromise. By choosing 
              innovative materials over traditional leather, we reduce environmental impact while 
              maintaining the textures and finishes our designs demand.
            </p>
            
            <p>
              Limited production is central to our model. Each collection is released in small runs, 
              ensuring we never overproduce. This approach reduces waste, allows for meticulous quality 
              control, and creates pieces that retain their value. We believe scarcity has purpose when 
              it serves design and sustainability equally.
            </p>
            
            <p>
              We design for extended wear. Every garment is engineered with reinforced construction, 
              premium hardware, and materials chosen for their ability to develop character over time. 
              Our pieces are built to soften, mold, and evolve—becoming more personal with age rather 
              than deteriorating into obsolescence.
            </p>
            
            <p>
              Transparency matters. We work directly with specialized suppliers and maintain complete 
              oversight of our production process. Our studio-scale operations allow us to know exactly 
              where our materials originate and how each piece is constructed. No middlemen, no mystery.
            </p>
            
            <p className="font-display text-lg tracking-luxury text-ink pt-6">
              Fashion doesn&apos;t need to be disposable. We prove that with every collection.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand/10 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="font-display text-2xl tracking-luxury text-ink mb-4">
                Est. 2020
              </h3>
              <p className="font-sans text-sm text-ink-700">
                Founded with a focus on bold materials and contemporary design
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-luxury text-ink-900 mb-4">
                Small Team
              </h3>
              <p className="font-sans text-sm text-ink-700">
                Focused studio structure allowing for complete quality control
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
            Studio & Showroom
          </h3>
          <p className="font-sans text-base leading-relaxed text-ink-700 mb-8">
            Our studio is open by appointment for fittings, consultations, and 
            private viewings of current and archive collections.
          </p>
          <div className="space-y-2 font-sans text-sm text-ink-700">
            <p>15 Rue de la Pierre Levée</p>
            <p>75011 Paris, France</p>
            <p className="pt-4">contact@lapiqure.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
