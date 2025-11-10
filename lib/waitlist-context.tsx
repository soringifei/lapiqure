'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface WaitlistItem {
  productId: string;
  productName: string;
  email: string;
  timestamp: number;
}

interface WaitlistContextType {
  isOnWaitlist: (productId: string) => boolean;
  addToWaitlist: (productId: string, productName: string, email: string) => void;
  getWaitlistItems: () => WaitlistItem[];
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [waitlistItems, setWaitlistItems] = useState<WaitlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('waitlist');
    if (stored) {
      setWaitlistItems(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (items: WaitlistItem[]) => {
    localStorage.setItem('waitlist', JSON.stringify(items));
    setWaitlistItems(items);
  };

  const isOnWaitlist = (productId: string) => {
    return waitlistItems.some(item => item.productId === productId);
  };

  const addToWaitlist = (productId: string, productName: string, email: string) => {
    const newItem: WaitlistItem = {
      productId,
      productName,
      email,
      timestamp: Date.now()
    };
    saveToStorage([...waitlistItems, newItem]);
  };

  const getWaitlistItems = () => waitlistItems;

  return (
    <WaitlistContext.Provider value={{ isOnWaitlist, addToWaitlist, getWaitlistItems }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}
