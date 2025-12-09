import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RecentlyViewedSidebar from '@/components/recently-viewed-sidebar'
import { Toaster } from '@/components/ui/toaster'
import BackToTop from '@/components/back-to-top'
import { NewsletterShell } from '@/components/NewsletterShell'
import OrderVolumeBanner from '@/components/order-volume-banner'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <OrderVolumeBanner />
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
      <Toaster />
      <BackToTop />
      <RecentlyViewedSidebar />
      <NewsletterShell />
    </>
  )
}
