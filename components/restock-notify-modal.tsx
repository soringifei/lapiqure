'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell } from 'lucide-react';

interface RestockNotifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productId: string;
}

export default function RestockNotifyModal({
  open,
  onOpenChange,
  productName,
  productId
}: RestockNotifyModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/restock-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          productId,
          productName,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onOpenChange(false);
          setSubmitted(false);
          setEmail('');
        }, 2000);
      }
    } catch {
      
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSubmitted(false);
    setEmail('');
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg bg-paper border border-ink">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-ink/20 rounded-full mb-6">
              <Bell className="w-8 h-8 text-ink" strokeWidth={1.5} />
            </div>
            <h3 className="font-mono text-lg uppercase tracking-wide text-ink mb-3">
              You&apos;re on the list
            </h3>
            <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-sm mx-auto">
              We&apos;ll notify you when {productName} is back in stock.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-paper border border-ink">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg uppercase tracking-wide text-ink">
            Notify When Available
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div>
            <p className="font-sans text-sm text-ink/70 leading-relaxed mb-1">
              {productName}
            </p>
            <p className="font-mono text-xs uppercase text-ink/50">
              Currently out of stock
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 border border-ink/20 bg-paper font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-ink/20 text-ink font-mono text-xs uppercase tracking-wide hover:border-ink transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="flex-1 px-6 py-3 bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Subscribing...' : 'Notify Me'}
              </button>
            </div>
          </form>

          <p className="font-mono text-[9px] text-ink/40 text-center leading-relaxed">
            We&apos;ll send you a single email when this item is back in stock. 
            <br />
            No spam, unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
