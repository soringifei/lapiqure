'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Firestore } from 'firebase/firestore';
import { CRMService } from '@/lib/firebase-crm';

interface CRMContextType {
  service: CRMService | null;
  isLoading: boolean;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children, db }: { children: ReactNode; db: Firestore }) {
  const service = db ? new CRMService(db) : null;

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
