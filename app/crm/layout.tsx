'use client'

import { CRMProvider } from '@/hooks/useCRM'

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return <CRMProvider>{children}</CRMProvider>
}
