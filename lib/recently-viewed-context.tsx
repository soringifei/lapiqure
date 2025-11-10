'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Piece } from './types';

interface RecentlyViewedContextType {
  recentlyViewed: Piece[];
  addToRecentlyViewed: (piece: Piece) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Piece[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recently-viewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = (piece: Piece) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== piece.id);
      const updated = [piece, ...filtered].slice(0, 6);
      localStorage.setItem('recently-viewed', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
