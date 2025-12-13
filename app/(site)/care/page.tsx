'use client'

export default function CarePage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Care Guide</h1>
          <p className="text-ink/70">
            Crafted to last. These principles keep each piece refined over time.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Storage</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Store in breathable garment bags; avoid plastic covers.</li>
            <li>Keep away from direct sunlight and excessive heat or humidity.</li>
            <li>Avoid overcrowding to preserve structure and drape.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Faux/Leather Care</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Wipe gently with a soft, dry cloth after wear; avoid moisture.</li>
            <li>Condition sparingly if recommended for the material; test on an inconspicuous area.</li>
            <li>Keep away from oils, perfumes, and prolonged sun exposure.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Knits & Delicates</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Hand wash cold with gentle detergent or dry clean; avoid wringing.</li>
            <li>Dry flat on a towel; reshape while damp.</li>
            <li>Store folded to prevent stretching.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Hardware & Embellishment</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Polish gently with a soft, dry cloth; avoid abrasives.</li>
            <li>Handle zippers, studs, and trims with care to prevent snags.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Restoration & Repairs</h2>
          <p className="text-ink/80">
            For conditioning, restitching, or hardware refresh, contact <a className="underline" href="mailto:alin@lapiqure.com">alin@lapiqure.com</a>.
            We’ll arrange trusted care to extend the life of your piece.
          </p>
        </section>
      </div>
    </main>
  );
}
