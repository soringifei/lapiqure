import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-paper mt-24">
      <div className="border-t border-ink/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <div className="relative h-8 w-[140px] mb-10">
                  <Image 
                    src="/brand/logo.png" 
                    alt="LA PIQÛRE" 
                    fill 
                    sizes="140px" 
                    className="object-contain object-left"
                  />
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="font-display text-xs uppercase tracking-wide text-ink/40 mb-4">
                      Atelier
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-ink/70">
                      15 Rue de la Pierre Levée<br />
                      75011 Paris, France
                    </p>
                  </div>
                  <p className="font-sans text-sm text-ink/70">
                    contact@lapiqure.com
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wide mb-6 text-ink/50">Collections</h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/collections" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          View All
                        </Link>
                      </li>
                      <li>
                        <Link href="/pieces" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Pieces
                        </Link>
                      </li>
                      <li>
                        <Link href="/atelier" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Atelier
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wide mb-6 text-ink/50">Services</h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/customization" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Customization
                        </Link>
                      </li>
                      <li>
                        <Link href="/care" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Care Guide
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Shipping
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wide mb-6 text-ink/50">About</h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/about" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Our Story
                        </Link>
                      </li>
                      <li>
                        <Link href="/lookbook" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Lookbook
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wide mb-6 text-ink/50">Legal</h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/terms" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Terms
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Privacy
                        </Link>
                      </li>
                      <li>
                        <Link href="/returns" className="font-sans text-sm text-ink/70 hover:text-ink transition-colors">
                          Returns
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-ink/10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <p className="font-display text-xs uppercase tracking-wide text-ink/40">
                    © {new Date().getFullYear()}
                  </p>
                  <div className="relative h-4 w-[80px]">
                    <Image 
                      src="/brand/logo.png" 
                      alt="LA PIQÛRE" 
                      fill 
                      sizes="80px" 
                      className="object-contain object-left opacity-40"
                    />
                  </div>
                </div>
                <p className="font-sans text-xs text-ink/50">
                  Registered trademark of LA PIQÛRE LLC
                </p>
              </div>
              <div className="flex items-center gap-8">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-display text-xs uppercase tracking-wide text-ink/50 hover:text-ink transition-colors">
                  Instagram
                </Link>
                <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="font-display text-xs uppercase tracking-wide text-ink/50 hover:text-ink transition-colors">
                  Pinterest
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
