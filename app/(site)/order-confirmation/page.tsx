'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Package, Mail, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() => 
    `LP${Date.now().toString().slice(-8)}`
  );
  const [email] = useState('customer@example.com');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper"><div className="bg-sand/5 border-b border-ink/10">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center"><div className="inline-flex items-center justify-center w-20 h-20 border-2 border-ink mb-8 relative">
            <Check className="h-10 w-10 text-ink" strokeWidth={1.5} />
          </div><h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] uppercase text-ink mb-4">
            Order Confirmed
          </h1><p className="font-sans text-base text-ink-700 leading-relaxed max-w-xl mx-auto mb-8">
            Thank you for your purchase. Your order has been received and is being prepared with care.
          </p><div className="inline-block">
            <div className="font-mono text-[9px] uppercase tracking-wide text-ink-700 mb-2">
              Order Number
            </div>
            <div className="font-display text-2xl tracking-[0.2em] text-ink">
              {orderNumber}
            </div>
          </div>
        </div>
      </div><div className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"><div className="p-8 border border-ink/10 bg-paper">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 border border-ink/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-ink" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-lg tracking-[0.1em] uppercase text-ink mb-2">
                  Order Updates
                </h2>
                <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
                  We&apos;ve sent a confirmation email to:
                </p>
                <p className="font-mono text-xs text-ink">
                  {email}
                </p>
              </div>
            </div>
            <p className="font-sans text-xs text-ink-700 leading-relaxed mt-4 pl-16">
              You&apos;ll receive shipping updates and tracking information at this address.
            </p>
          </div><div className="p-8 border border-ink/10 bg-paper">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 border border-ink/20 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-ink" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-lg tracking-[0.1em] uppercase text-ink mb-2">
                  Estimated Delivery
                </h2>
                <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
                  Your order will be carefully packaged and shipped within:
                </p>
                <p className="font-display text-xl text-ink">
                  3-5 Business Days
                </p>
              </div>
            </div>
            <p className="font-sans text-xs text-ink-700 leading-relaxed mt-4 pl-16">
              Standard shipping times apply. Expedited options available.
            </p>
          </div>
        </div><div className="mb-16">
          <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink mb-8 text-center">
            What Happens Next
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 border border-ink flex items-center justify-center flex-shrink-0 font-mono text-sm">
                1
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink mb-2">
                  Order Processing
                </h3>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Our atelier team carefully inspects and prepares each piece for shipment, ensuring every detail meets our standards.
                </p>
              </div>
            </div>

            <div className="h-px bg-ink/10 ml-5" />

            <div className="flex gap-6">
              <div className="w-10 h-10 border border-ink flex items-center justify-center flex-shrink-0 font-mono text-sm">
                2
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink mb-2">
                  Secure Packaging
                </h3>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Your pieces are wrapped in archival tissue and packaged in our signature boxes, designed to protect during transit.
                </p>
              </div>
            </div>

            <div className="h-px bg-ink/10 ml-5" />

            <div className="flex gap-6">
              <div className="w-10 h-10 border border-ink flex items-center justify-center flex-shrink-0 font-mono text-sm">
                3
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink mb-2">
                  Tracking Information
                </h3>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Once shipped, you&apos;ll receive tracking details to follow your package every step of the way to your door.
                </p>
              </div>
            </div>

            <div className="h-px bg-ink/10 ml-5" />

            <div className="flex gap-6">
              <div className="w-10 h-10 border border-ink flex items-center justify-center flex-shrink-0 font-mono text-sm">
                4
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink mb-2">
                  Delivery & Care
                </h3>
                <p className="font-sans text-sm text-ink-700 leading-relaxed">
                  Your order arrives with care instructions and authentication details. Each piece is backed by our satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </div><div className="h-px bg-ink/10 mb-12" /><div className="bg-sand/5 border border-ink/10 p-8 mb-12">
          <h3 className="font-display text-lg tracking-[0.1em] uppercase text-ink mb-4">
            Need Assistance?
          </h3>
          <p className="font-sans text-sm text-ink-700 leading-relaxed mb-6">
            Our concierge team is available to answer questions about your order, provide styling advice, or assist with any special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:contact@lapiquire.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink/20 text-ink font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/10 transition-all"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              Contact Us
            </a>
            <Link href="/faq">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink/20 text-ink font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/10 transition-all">
                View FAQ
              </button>
            </Link>
          </div>
        </div><div className="flex flex-col sm:flex-row gap-4">
          <Link href="/pieces" className="flex-1">
            <button className="w-full group bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wide hover:bg-ink/90 transition-all flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full border border-ink/20 text-ink px-8 py-4 font-mono text-xs uppercase tracking-wide hover:border-ink hover:bg-sand/5 transition-all">
              Return Home
            </button>
          </Link>
        </div>
      </div><div className="border-t border-ink/10 bg-sand/5">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="font-sans text-xs text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Thank you for choosing LA PIQÛRE. Each piece in our collection has been thoughtfully curated to stand the test of time. We appreciate your trust in our atelier and look forward to serving you again.
          </p>
        </div>
      </div>
    </div>
  );
}
