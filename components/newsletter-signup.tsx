'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Welcome to LA PIQÛRE. You'll receive our newsletter with early access to new collections.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-b from-sand/5 to-transparent py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury text-ink mb-4">
            Stay Updated
          </h2>
          <p className="font-sans text-sm md:text-base leading-relaxed text-ink-700 mb-8">
            Subscribe to receive early access to new collections, exclusive pieces, and invitations to private events.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 h-12"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-ink text-paper px-8 py-3 text-xs font-sans tracking-editorial uppercase hover:bg-ink-800 hover:shadow-2xl hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="font-sans text-xs text-ink-700 mt-4">
            By subscribing, you agree to receive updates from LA PIQÛRE. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
