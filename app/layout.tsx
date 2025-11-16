import type { Metadata } from 'next';
import { Courier_Prime, Forum } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { WaitlistProvider } from '@/lib/waitlist-context';
import { RecentlyViewedProvider } from '@/lib/recently-viewed-context';
import RecentlyViewedSidebar from '@/components/recently-viewed-sidebar';
import { Toaster } from '@/components/ui/toaster';
import BackToTop from '@/components/back-to-top';
import { NewsletterShell } from '@/components/NewsletterShell';

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
  fallback: ['Courier New', 'monospace']
});

const forum = Forum({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  fallback: ['Copperplate', 'serif']
});

export const metadata: Metadata = {
  title: 'LA PIQÛRE — Independent Fashion',
  description: 'Contemporary luxury fashion house. Bold designs, premium materials, curated collections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${courierPrime.variable} ${forum.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          as="image"
          href="/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1_optimized.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <WaitlistProvider>
                <RecentlyViewedProvider>
              <Navbar />
              <main className="flex-1 pt-24">
                {children}
              </main>
              <Footer />
              <Toaster />
              <BackToTop />
              <RecentlyViewedSidebar />
              <NewsletterShell />
                </RecentlyViewedProvider>
              </WaitlistProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
