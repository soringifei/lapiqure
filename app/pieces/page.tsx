import SectionHeading from '@/components/SectionHeading';
import PieceCard from '@/components/PieceCard';
import { samplePieces } from '@/lib/sample-data';

export default function PiecesPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-16">
          <SectionHeading className="mb-4">Shop</SectionHeading>
          <h1 className="font-display text-4xl md:text-5xl tracking-luxury text-ink-900 mb-6">
            All Pieces
          </h1>
          <p className="font-sans text-base leading-relaxed text-ink-700 max-w-2xl">
            Curated selection of current and archive pieces. Each garment is photographed 
            in detail and described with material composition, care instructions, and story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <div className="space-y-8 sticky top-24">
              <div>
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink-900 mb-4">
                  Category
                </h3>
                <div className="space-y-2 text-sm font-sans">
                  {['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Accessories'].map((cat) => (
                    <div key={cat}>
                      <label className="flex items-center cursor-pointer text-ink-700 hover:text-ink-900 transition-colors">
                        <input 
                          type="checkbox" 
                          className="mr-2 accent-ink-900" 
                          defaultChecked={cat === 'All'}
                        />
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-cream-200 pt-8">
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink-900 mb-4">
                  Condition
                </h3>
                <div className="space-y-2 text-sm font-sans">
                  {['All', 'New', 'Excellent', 'Good', 'Archive'].map((cond) => (
                    <div key={cond}>
                      <label className="flex items-center cursor-pointer text-ink-700 hover:text-ink-900 transition-colors">
                        <input 
                          type="checkbox" 
                          className="mr-2 accent-ink-900" 
                          defaultChecked={cond === 'All'}
                        />
                        {cond}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-cream-200 pt-8">
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink-900 mb-4">
                  Size
                </h3>
                <div className="space-y-2 text-sm font-sans">
                  {['All', 'XS', 'S', 'M', 'L', 'XL', 'ONE SIZE'].map((size) => (
                    <div key={size}>
                      <label className="flex items-center cursor-pointer text-ink-700 hover:text-ink-900 transition-colors">
                        <input 
                          type="checkbox" 
                          className="mr-2 accent-ink-900" 
                          defaultChecked={size === 'All'}
                        />
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-cream-200 pt-8">
                <h3 className="font-display text-xs tracking-luxury uppercase text-ink-900 mb-4">
                  Availability
                </h3>
                <div className="space-y-2 text-sm font-sans">
                  {['All', 'Available', 'Coming Soon'].map((avail) => (
                    <div key={avail}>
                      <label className="flex items-center cursor-pointer text-ink-700 hover:text-ink-900 transition-colors">
                        <input 
                          type="radio" 
                          name="availability" 
                          className="mr-2 accent-ink-900" 
                          defaultChecked={avail === 'All'}
                        />
                        {avail}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-sans text-ink-700">
                {samplePieces.length} pieces
              </p>
              <select className="text-sm font-sans text-ink-700 bg-transparent border border-cream-300 px-4 py-2">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {samplePieces.map((piece) => (
                <PieceCard
                  key={piece.id}
                  name={piece.name}
                  slug={piece.slug}
                  designer={piece.designer}
                  condition={piece.condition}
                  imageSrc={piece.images[0]}
                  price={piece.price}
                  collectionName={piece.collectionName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
