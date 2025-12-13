'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('newsletter-modal-seen');
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      localStorage.setItem('newsletter-modal-seen', 'true');
      
      toast({
        title: data.alreadySubscribed ? "Already subscribed" : "Thank you for subscribing",
        description: data.message || "You'll receive our latest collections and stories.",
      });
      
      setOpen(false);
      setEmail('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Failed to subscribe. Please try again later.",
      });
    }
  };

  const handleClose = () => {
    localStorage.setItem('newsletter-modal-seen', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-paper border-none p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div 
            className="hidden md:block bg-cover bg-center"
            style={{ backgroundImage: "url('/images/faux_leather_mixed_with_embossed_zebra_leather_jacket1.jpg')" }}
          />
          
          <div className="p-12 flex flex-col justify-center">
            <h2 className="font-display text-2xl tracking-luxury uppercase text-ink mb-4">
              Join Our Circle
            </h2>
            
            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-8">
              Subscribe to receive first access to new collections, exclusive stories, and invitations to private viewings.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-6 py-4 border border-ink/10 bg-background text-ink font-sans text-sm focus:outline-none focus:border-ink/30 focus:bg-paper transition-all duration-300"
              />
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-orange hover:bg-accent-orange/90 text-paper font-sans uppercase tracking-wide text-xs transition-all"
              >
                Subscribe
              </button>
            </form>
            
            <p className="font-sans text-xs text-ink-700 mt-6 leading-relaxed">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from LA PIQÛRE.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
