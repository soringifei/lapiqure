'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
    <section className="bg-ink text-paper py-32 lg:py-40 mt-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper/50 mb-6">
              Newsletter
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.05em] uppercase text-paper mb-6 leading-tight">
              Stay Informed
            </h2>
            <p className="font-sans text-sm leading-loose text-paper/70 max-w-xl mx-auto">
              Receive advance notice of new collections, private viewings, and exclusive pieces. Unsubscribe at any time.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-0 border border-paper/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                disabled={loading}
                className="flex-1 bg-transparent border-none px-6 py-4 text-sm text-paper placeholder:text-paper/40 focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-paper text-ink font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-paper/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-t sm:border-t-0 sm:border-l border-paper/20"
              >
                {loading ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
