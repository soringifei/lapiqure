'use client'

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Returns & Exchanges</h1>
          <p className="text-ink/70">
            We stand behind every piece. If it isn’t perfect, we’ll make it right with a calm, concierge-led process.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Eligibility</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Returns accepted within 14 days of delivery.</li>
            <li>Pieces must be unworn, with all tags and original packaging.</li>
            <li>Exclusions: final sale, personalized/bespoke pieces, items showing wear or alteration.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">How to Request</h2>
          <p className="text-ink/80">
            Email <a className="underline" href="mailto:alin@lapiqure.com">alin@lapiqure.com</a> with your order
            number to request a prepaid return label (where applicable). Our team will guide next steps.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Refunds & Exchanges</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Refunds are issued to the original payment method after inspection (typically 5–10 business days).</li>
            <li>Exchanges depend on availability; otherwise we proceed with a refund.</li>
            <li>Original shipping fees are non-refundable unless the item was faulty.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Quality & Fair Use</h2>
          <p className="text-ink/80">
            We reserve the right to decline returns that show wear, damage, or alteration. For defective items, contact us
            immediately so we can prioritize resolution.
          </p>
        </section>
      </div>
    </main>
  );
}
