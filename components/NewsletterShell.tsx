'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const NewsletterModal = dynamic(() => import('@/components/newsletter-modal'), {
  ssr: false,
  loading: () => null,
})

export function NewsletterShell() {
  const pathname = usePathname()

  if (pathname.startsWith('/crm')) {
    return null
  }

  return <NewsletterModal />
}
