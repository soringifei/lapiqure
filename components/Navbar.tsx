'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { useWishlist } from '@/lib/wishlist-context';
import CartSheet from './cart-sheet';
import CommandPalette from './command-palette';
import CategoryMegaMenu from './category-mega-menu';
import { Menu, X, Heart, User, MapPin } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { items } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-xl transition-all duration-500 border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-ink hover:text-ink-700 transition-colors z-10"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" aria-label="LA PIQÛRE" className="flex items-center absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0">
            <div className="relative h-5 sm:h-6 w-[100px] sm:w-[120px]">
              <Image src="/brand/logo.png" alt="LA PIQÛRE" fill sizes="120px" className="object-contain" priority />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/collections" 
              className="text-xs font-display font-normal uppercase tracking-wide text-ink-700 hover:text-ink transition-all duration-300"
            >
              Collections
            </Link>
            <CategoryMegaMenu />
            <Link 
              href="/pieces" 
              className="text-xs font-display font-normal uppercase tracking-wide text-ink-700 hover:text-ink transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/atelier" 
              className="text-xs font-display font-normal uppercase tracking-wide text-ink-700 hover:text-ink transition-colors"
            >
              Atelier
            </Link>
            <Link 
              href="/lookbook" 
              className="text-xs font-display font-normal uppercase tracking-wide text-ink-700 hover:text-ink transition-colors"
            >
              Lookbook
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <CommandPalette />
            
            <Link
              href="/wishlist" 
              className="hidden sm:block relative p-2 text-ink-700 hover:text-ink transition-colors group"
              title="Wishlist"
            >
              <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-ink text-paper rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-display">
                  {items.length}
                </span>
              )}
            </Link>

            <Link
              href="/stores" 
              className="hidden md:block p-2 text-ink-700 hover:text-ink transition-colors group"
              title="Find a Store"
            >
              <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </Link>

            <CartSheet />
            
            {user ? (
              <div className="hidden sm:block relative group">
                <button className="p-2 text-ink-700 hover:text-ink transition-colors">
                  <User className="h-4 w-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-paper border border-ink/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/account"
                    className="block px-6 py-3 text-xs font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-6 py-3 text-xs font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="hidden sm:block p-2 text-ink-700 hover:text-ink transition-colors"
                title="Sign In"
              >
                <User className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`lg:hidden border-t border-ink/5 bg-paper transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-6 space-y-1">
          <Link 
            href="/collections" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
          >
            Collections
          </Link>
          <Link 
            href="/pieces" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
          >
            Shop
          </Link>
          <Link 
            href="/atelier" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
          >
            Atelier
          </Link>
          <Link 
            href="/lookbook" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
          >
            Lookbook
          </Link>
          
          <div className="border-t border-ink/5 my-2 pt-2">
            <Link 
              href="/wishlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
            >
              <span>Wishlist</span>
              {items.length > 0 && (
                <span className="bg-ink text-paper rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-display">
                  {items.length}
                </span>
              )}
            </Link>
            <Link 
              href="/stores" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
            >
              Find a Store
            </Link>
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 text-sm font-display uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-sm font-mono uppercase tracking-wide text-ink-700 hover:bg-sand/10 hover:text-ink transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
