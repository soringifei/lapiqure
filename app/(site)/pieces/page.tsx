import Image from 'next/image';
import { samplePieces } from '@/lib/sample-data';
import PiecesClient from './pieces-client';
import EditorialStory from '@/components/editorial-story';

export default function PiecesPage() {
  return (
    <div className="min-h-screen"><section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/oversized_green_faux_leather_pants1_opt.jpg"
          alt="LA PIQÛRE Collection"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-8">
            <p className="font-display text-sm md:text-base tracking-[0.3em] uppercase text-paper/90 mb-6">
              Current Collection
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-paper mb-8">
              Shop
            </h1>
            <p className="font-sans text-base text-paper/80 leading-relaxed max-w-lg mx-auto">
              Current and archive pieces. Each garment features detailed photography, 
              material composition, and design story.
            </p>
          </div>
        </div>
      </section><section className="bg-sand/10 py-12">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-3xl md:text-4xl text-ink mb-2">
                {samplePieces.length}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-700">
                Total Pieces
              </p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-ink mb-2">
                {samplePieces.filter(p => p.available).length}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-700">
                Available Now
              </p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-ink mb-2">
                {new Set(samplePieces.map(p => p.category)).size}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-700">
                Categories
              </p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-ink mb-2">
                {new Set(samplePieces.map(p => p.collectionName)).size}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ink-700">
                Collections
              </p>
            </div>
          </div>
        </div>
      </section><section className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <PiecesClient pieces={samplePieces} />
      </section><EditorialStory
        title="Crafted in Our Atelier"
        subtitle="Heritage"
        description="Each piece passes through the hands of skilled artisans in our Paris atelier. We believe in the value of human touch—hand-finished seams, individually placed stitches, and careful attention to every detail that machines cannot replicate."
        imageSrc="/images/turtleneck_sweater_with_intarsia_pattern2_opt.jpg"
        imagePosition="right"
      />
    </div>
  );
}
