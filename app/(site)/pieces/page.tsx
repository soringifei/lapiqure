import Image from 'next/image';
import { samplePieces } from '@/lib/sample-data';
import PiecesClient from './pieces-client';
import EditorialStory from '@/components/editorial-story';

export default function PiecesPage() {
  return (
    <div className="min-h-screen"><section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/oversized_green_faux_leather_pants1_opt.jpg"
          alt="LA PIQÛRE Collection"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        <div className="absolute inset-0 flex items-end justify-center pb-24">
          <div className="text-center px-8">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-paper/80 mb-6">
              Current & Archive
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] uppercase text-paper mb-6">
              Pieces
            </h1>
            <div className="w-32 h-px bg-paper/30 mx-auto mb-6" />
            <p className="font-sans text-base text-paper/70 max-w-xl mx-auto leading-relaxed">
              Material innovation meets contemporary design
            </p>
          </div>
        </div>
      </section><section className="bg-sand/10 py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {samplePieces.length}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Total Pieces
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {samplePieces.filter(p => p.available).length}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Available Now
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {new Set(samplePieces.map(p => p.category)).size}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
                Categories
              </p>
            </div>
            <div className="border-r border-ink/10 last:border-r-0">
              <p className="font-display text-4xl md:text-5xl text-ink mb-3 tracking-wide">
                {new Set(samplePieces.map(p => p.collectionName)).size}
              </p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-700">
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
