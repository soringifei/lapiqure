'use client'

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Shipping</h1>
          <p className="text-ink/70">
            Each order is prepared with care. Timelines and transparency are part of the experience.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Processing</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Preparation typically within 1–2 business days.</li>
            <li>During peak moments, dispatch may require additional time.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Delivery & Tracking</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Tracking details are provided as soon as your order departs.</li>
            <li>Premium carriers are selected for reliability and care in transit.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Duties & Taxes</h2>
          <p className="text-ink/80">
            Duties and taxes may apply based on destination and are payable on delivery where required. Your carrier will
            advise if amounts are due.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Delivery Support</h2>
          <p className="text-ink/80">
            If an order is delayed or arrives damaged, contact <a className="underline" href="mailto:alin@lapiqure.com">alin@lapiqure.com</a>{' '}
            with your order number. We will prioritize resolution with our carrier partners.
          </p>
        </section>
      </div>
    </main>
  );
}
