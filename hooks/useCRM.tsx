'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { OptimizedCRMService } from '@/lib/firebase-crm-optimized';
import { getFirebaseFirestore } from '@/lib/firebase';

interface CRMContextType {
  service: OptimizedCRMService | null;
  isLoading: boolean;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const service = useMemo(() => {
    const db = getFirebaseFirestore();
    return db ? new OptimizedCRMService(db) : null;
  }, [])

  return (
    <CRMContext.Provider value={{ service, isLoading: !service }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within CRMProvider');
  }
  return context;
}
