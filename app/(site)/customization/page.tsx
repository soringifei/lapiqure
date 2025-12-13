'use client'

export default function CustomizationPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Customization</h1>
          <p className="text-ink/70">
            Bespoke attention for pieces that are distinctly yours.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Scope</h2>
          <p className="text-ink/80">
            Tailored adjustments, made-to-measure refinements, and select personalization for LA PIQÛRE silhouettes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Process</h2>
          <ol className="list-decimal list-inside space-y-2 text-ink/80">
            <li>Consultation to understand fit, intent, and occasion.</li>
            <li>Design confirmation with shared references and approvals.</li>
            <li>Deposit to begin creation.</li>
            <li>Creation and craftsmanship period.</li>
            <li>Fitting or delivery with final detailing.</li>
          </ol>
          <p className="text-ink/80">
            Lead times vary by complexity; expect approximately 4–8 weeks for most bespoke work.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Finality & Alterations</h2>
          <p className="text-ink/80">
            Custom and personalized pieces are generally final sale. Post-delivery alterations may be accommodated
            case-by-case to ensure the intended fit and finish.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Begin</h2>
          <p className="text-ink/80">
            To start a bespoke request, contact <a className="underline" href="mailto:alin@lapiqure.com">alin@lapiqure.com</a>.
            Our team will coordinate consultation and timelines.
          </p>
        </section>
      </div>
    </main>
  );
}
