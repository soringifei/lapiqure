'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCRM } from '@/hooks/useCRM';

export default function AvailabilityBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { service } = useCRM();

  useEffect(() => {
    const checkAvailability = async () => {
      if (!service) return;

      const dismissed = localStorage.getItem('availability-banner-dismissed');
      if (dismissed) return;

      try {
        const products = await service.getProducts();
        const extendedShippingProducts = products.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (p: any) => p.status === 'extended-shipping' && !p.isHidden
        );

        if (extendedShippingProducts.length > 0) {
          const customMessage = extendedShippingProducts.find(
            (p) => p.availabilityMessage
          )?.availabilityMessage;

          setMessage(
            customMessage ||
              'Due to high order volume, shipping may take 2-3 weeks longer than usual.'
          );
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error checking product availability:', error);
      }
    };

    checkAvailability();
  }, [service]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('availability-banner-dismissed', 'true');
  };

  if (!isVisible || !message) return null;

  return (
    <div className="bg-accent-orange/10 border-b border-accent-orange/20 px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="font-sans text-sm text-ink-700 flex-1 text-center">
          {message}
        </p>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-accent-orange/20 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4 text-ink-700" />
        </button>
      </div>
    </div>
  );
}


