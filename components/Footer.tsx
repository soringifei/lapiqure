import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-paper mt-32">
      <div className="border-t border-ink/5">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
              <div className="lg:col-span-4">
                <div className="relative h-6 w-[120px] mb-12">
                  <Image 
                    src="/brand/logo.png" 
                    alt="LA PIQÛRE" 
                    fill 
                    sizes="120px" 
                    className="object-contain object-left"
                  />
                </div>
                <div className="space-y-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/30 mb-4">
                    Atelier
                  </p>
                  <p className="text-[13px] font-light leading-relaxed text-ink/60 max-w-sm">
                    15 Rue de la Pierre Levée<br />
                    75011 Paris, France
                  </p>
                  <p className="text-[13px] font-light text-ink/60">
                    contact@lapiqure.com
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
                  <div>
                    <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] mb-8 text-ink/30">Collections</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/collections" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          View All
                        </Link>
                      </li>
                      <li>
                        <Link href="/pieces" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Pieces
                        </Link>
                      </li>
                      <li>
                        <Link href="/atelier" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Atelier
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] mb-8 text-ink/30">Services</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/customization" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Customization
                        </Link>
                      </li>
                      <li>
                        <Link href="/care" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Care Guide
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Shipping
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] mb-8 text-ink/30">About</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/about" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Our Story
                        </Link>
                      </li>
                      <li>
                        <Link href="/lookbook" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Lookbook
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] mb-8 text-ink/30">Legal</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/terms" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Terms
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Privacy
                        </Link>
                      </li>
                      <li>
                        <Link href="/returns" className="text-[13px] font-light text-ink/70 hover:text-ink transition-colors">
                          Returns
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-ink/5 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-ink/25">
                  © {new Date().getFullYear()} LA PIQÛRE
                </p>
                <p className="text-[11px] font-light text-ink/40">
                  Registered trademark of LA PIQÛRE SAS
                </p>
              </div>
              <div className="flex items-center gap-10">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40 hover:text-ink transition-colors">
                  Instagram
                </Link>
                <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40 hover:text-ink transition-colors">
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
