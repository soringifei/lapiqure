'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
  onJoin: (email: string) => void;
}

export default function WaitlistModal({
  open,
  onOpenChange,
  productId,
  productName,
  onJoin
}: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      onJoin(email.trim());
      toast({
        title: "You're on the waitlist",
        description: `We'll notify you at ${email} when ${productName} is back in stock.`,
      });
      onOpenChange(false);
      setEmail('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-paper">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-luxury text-ink">
            Join Waitlist
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div>
            <p className="font-sans text-sm text-ink mb-2">
              {productName}
            </p>
            <p className="font-sans text-xs text-ink-700 leading-relaxed">
              This piece is currently unavailable. Join our priority waitlist to be notified immediately when it's back in stock.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-wide text-ink-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-6 py-4 border border-ink/10 bg-background text-ink font-sans text-sm focus:outline-none focus:border-ink/30 focus:bg-paper transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full px-10 py-4 bg-ink text-paper hover:bg-ink-800 hover:shadow-xl hover:-translate-y-px transition-all duration-500 font-sans uppercase tracking-[0.15em] text-[11px]"
            >
              Join Waitlist
            </button>
          </form>

          <p className="font-sans text-[10px] text-ink-700 leading-relaxed">
            You'll receive priority access when this item is restocked. We respect your privacy and won't share your email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
