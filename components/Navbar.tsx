import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/80 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="font-display text-xl tracking-luxury text-ink-900 hover:text-ink-700 transition-colors"
          >
            ATELIER
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/collections" 
              className="text-sm font-sans tracking-editorial uppercase text-ink-800 hover:text-ink-900 transition-colors"
            >
              Collections
            </Link>
            <Link 
              href="/pieces" 
              className="text-sm font-sans tracking-editorial uppercase text-ink-800 hover:text-ink-900 transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-sans tracking-editorial uppercase text-ink-800 hover:text-ink-900 transition-colors"
            >
              Story
            </Link>
            <Link 
              href="/auth" 
              className="text-sm font-sans tracking-editorial uppercase text-ink-800 hover:text-ink-900 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
