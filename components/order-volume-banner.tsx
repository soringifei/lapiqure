'use client';

import { useEffect, useState } from 'react';
import { useCRM } from '@/hooks/useCRM';
import { X, AlertCircle } from 'lucide-react';

export default function OrderVolumeBanner() {
  const { service } = useCRM();
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrderVolume = async () => {
      if (!service) return;
      try {
        const metrics = await service.getDashboardMetrics();
        setPendingOrders(metrics.pendingOrders);
        
        if (metrics.pendingOrders >= 10 && !dismissed) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.error('Error checking order volume:', error);
      }
    };

    checkOrderVolume();
    const interval = setInterval(checkOrderVolume, 60000);
    return () => clearInterval(interval);
  }, [service, dismissed]);

  if (!isVisible || dismissed) return null;

  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-700 flex-shrink-0" />
          <p className="font-sans text-sm text-ink-700">
            <strong>High order volume:</strong> Due to a large number of pending orders, shipping may take longer than usual. We appreciate your patience.
          </p>
        </div>
        <button
          onClick={() => {
            setDismissed(true);
            setIsVisible(false);
          }}
          className="flex-shrink-0 p-1 hover:bg-yellow-500/20 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4 text-ink-700" />
        </button>
      </div>
    </div>
  );
}


