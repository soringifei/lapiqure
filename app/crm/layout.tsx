'use client'

import { useEffect, useState } from 'react'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getFirebaseApp } from '@/lib/firebase'
import { CRMProvider } from '@/hooks/useCRM'

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Firestore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const app = getFirebaseApp()
      const firestore = getFirestore(app)
      setDb(firestore)
    } catch (error) {
      console.error('Firebase initialization error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-muted-foreground">Initializing...</p>
      </div>
    )
  }

  if (!db) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <p className="text-destructive font-medium mb-2">Firebase Configuration Error</p>
          <p className="text-muted-foreground text-sm">Please check your .env.local file</p>
        </div>
      </div>
    )
  }

  return <CRMProvider db={db}>{children}</CRMProvider>
}
