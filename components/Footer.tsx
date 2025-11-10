import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-24 mt-48">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <div className="relative h-6 w-[120px] mb-6">
              <Image 
                src="/brand/logo.png" 
                alt="LA PIQÛRE" 
                fill 
                sizes="120px" 
                className="object-contain" 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-xs font-sans leading-relaxed text-paper/60">
              Independent fashion atelier. Paris.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase mb-6 text-paper/70">Navigate</h4>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <Link href="/collections" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/pieces" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  Story
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase mb-6 text-paper/70">Contact</h4>
            <ul className="space-y-3 text-xs font-sans text-paper/60">
              <li>contact@lapiqure.com</li>
              <li>Paris, France</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase mb-6 text-paper/70">Legal</h4>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <Link href="#" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-paper/60 hover:text-paper transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-paper/10 to-transparent mb-12" />
          <p className="text-[10px] font-sans text-paper/50 tracking-wide">
            © {new Date().getFullYear()} La Piqûre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
