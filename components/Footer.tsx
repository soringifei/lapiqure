import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="relative h-5 w-[100px] mb-8">
                <Image 
                  src="/brand/logo.png" 
                  alt="LA PIQÛRE" 
                  fill 
                  sizes="100px" 
                  className="object-contain object-left"
                />
              </div>
              <p className="text-[11px] font-sans leading-loose text-ink/50 max-w-xs">
                Contemporary luxury fashion.
                <br />
                Paris, France.
              </p>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] mb-6 text-ink/40">Shop</h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/collections" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        All Pieces
                      </Link>
                    </li>
                    <li>
                      <Link href="/atelier" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        Atelier
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] mb-6 text-ink/40">About</h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/about" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link href="/lookbook" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        Lookbook
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-[11px] font-sans text-ink/60 hover:text-ink transition-colors">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-[0.25em] mb-6 text-ink/40">Contact</h4>
                  <ul className="space-y-4">
                    <li className="text-[11px] font-sans text-ink/60">
                      contact@lapiqure.com
                    </li>
                    <li className="text-[11px] font-sans text-ink/60">
                      15 Rue de la Pierre Levée
                      <br />
                      75011 Paris
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-ink/5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-ink/30">
              © {new Date().getFullYear()} LA PIQÛRE
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-[9px] font-mono uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-[9px] font-mono uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
