import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100 py-16 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display text-sm tracking-luxury mb-4">ATELIER</h3>
            <p className="text-xs font-sans leading-relaxed text-cream-200">
              Independent fashion atelier. Paris.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-sans tracking-editorial uppercase mb-4">Navigate</h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/collections" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/pieces" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Story
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-sans tracking-editorial uppercase mb-4">Contact</h4>
            <ul className="space-y-2 text-xs font-sans text-cream-200">
              <li>atelier@example.com</li>
              <li>Paris, France</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-sans tracking-editorial uppercase mb-4">Legal</h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="#" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cream-200 hover:text-cream-50 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-ink-700">
          <p className="text-xs font-sans text-cream-300">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
