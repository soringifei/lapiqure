import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image
          src="/images/turtleneck_sweater_with_intarsia_pattern5.jpg"
          alt="LA PIQÛRE Studio"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end justify-center pb-16 lg:pb-24">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.3em] uppercase text-paper mb-4">
              Our Story
            </h1>
            <div className="w-24 h-px bg-paper/50 mx-auto" />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20">
            <div className="relative h-8 w-[160px] mx-auto mb-12">
              <Image 
                src="/brand/logo.png" 
                alt="LA PIQÛRE" 
                fill 
                className="object-contain"
              />
            </div>
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.2em] uppercase text-ink mb-12">
              The Sting That Awakens
            </h2>
            <div className="w-32 h-px bg-ink/20 mx-auto mb-12" />
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8 font-sans text-base md:text-lg leading-relaxed text-ink text-center">
            <p>
              Born from the belief that fashion holds the power to transform the way we see ourselves, 
              LA PIQÛRE merges bold design with refined craftsmanship. Each piece is thoughtfully 
              created using premium materials that embody both strength and sophistication.
            </p>
            
            <p>
              The name symbolizes the sting that awakens—a reminder of resilience, growth, 
              and the power of self-expression. Founded from a personal journey, our mission 
              is to design pieces that ignite inner strength.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand/5 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
            <div className="text-center">
              <div className="w-16 h-16 border border-ink/20 mx-auto mb-8 flex items-center justify-center">
                <span className="font-display text-2xl text-ink">01</span>
              </div>
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-ink mb-6">
                Material First
              </h3>
              <p className="font-sans text-sm leading-relaxed text-ink-700">
                Premium faux leathers, distressed knits, embossed textures—each fabric chosen for character and durability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 border border-ink/20 mx-auto mb-8 flex items-center justify-center">
                <span className="font-display text-2xl text-ink">02</span>
              </div>
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-ink mb-6">
                Atelier Craft
              </h3>
              <p className="font-sans text-sm leading-relaxed text-ink-700">
                Small-scale production with complete control over every detail. Considered craftsmanship, limited releases.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 border border-ink/20 mx-auto mb-8 flex items-center justify-center">
                <span className="font-display text-2xl text-ink">03</span>
              </div>
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-ink mb-6">
                Timeless Design
              </h3>
              <p className="font-sans text-sm leading-relaxed text-ink-700">
                Pieces engineered to transcend trends. Premium construction that develops character over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src="/images/faux_leather_cropped_pants4.jpeg"
              alt="Craftsmanship"
              fill
              className="object-cover"
              quality={90}
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/cropped_sleeveless_top_with_zipper_&_flat_silver_studs4.jpg"
              alt="Materials"
              fill
              className="object-cover"
              quality={90}
            />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.2em] uppercase text-ink mb-12">
            Savoir-Faire
          </h2>
          <div className="w-32 h-px bg-ink/20 mx-auto mb-16" />
          
          <div className="max-w-2xl mx-auto space-y-8 font-sans text-base leading-relaxed text-ink-700">
            <p>
              Each collection is released in small runs, ensuring meticulous quality control. 
              We work directly with specialized suppliers, maintaining complete oversight 
              of our production process.
            </p>
            
            <p>
              Premium materials chosen for durability and character. Reinforced construction 
              designed to develop patina over time. Built to be worn, not replaced.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl text-ink mb-3">2025</p>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-ink-700">Founded</p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl text-ink mb-3">New York</p>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-ink-700">Atelier</p>
            </div>
            <div>
              <p className="font-display text-4xl text-ink mb-3">2/Year</p>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-ink-700">Collections</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-ink text-paper">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl tracking-[0.2em] uppercase mb-12">
            Private Atelier
          </h2>
          <div className="w-32 h-px bg-paper/30 mx-auto mb-12" />
          <p className="font-sans text-sm md:text-base leading-relaxed text-paper/80 mb-12 max-w-xl mx-auto">
            By appointment only for private viewings, fittings, and consultations.
          </p>
          <div className="space-y-2 font-sans text-sm text-paper/70">
            <p className="tracking-wide">New York, USA</p>
            <p className="pt-6 tracking-wide">alin@lapiqure.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
