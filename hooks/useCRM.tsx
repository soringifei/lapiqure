'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Firestore } from 'firebase/firestore';
import { OptimizedCRMService } from '@/lib/firebase-crm-optimized';

interface CRMContextType {
  service: OptimizedCRMService | null;
  isLoading: boolean;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children, db }: { children: ReactNode; db: Firestore }) {
  const service = useMemo(() => (db ? new OptimizedCRMService(db) : null), [db])

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
