'use client'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Terms & Conditions</h1>
          <p className="text-ink/70">
            These terms keep the experience refined and clear. By using this site you agree to the following.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Use of the Site</h2>
          <p className="text-ink/80">
            The site is for personal, non-commercial use to discover and purchase LA PIQÛRE pieces. Provide accurate
            account information and keep credentials secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Intellectual Property</h2>
          <p className="text-ink/80">
            All designs, imagery, text, and trademarks are the property of LA PIQÛRE and may not be copied, reproduced,
            or used without written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Orders, Pricing & Availability</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Product availability and pricing may change without notice.</li>
            <li>We may decline or cancel orders in cases of error, suspected fraud, or supply constraints.</li>
            <li>Charges occur at checkout; refunds follow our Returns policy.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Acceptable Use</h2>
          <p className="text-ink/80">
            You agree not to disrupt the site, attempt unauthorized access, or misuse content or services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Liability</h2>
          <p className="text-ink/80">
            To the fullest extent permitted by law, the site is provided “as is.” Our liability is limited to amounts you
            paid for relevant purchases; we are not liable for indirect or consequential damages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Governing Law</h2>
          <p className="text-ink/80">
            These terms are governed by the laws of New York, USA. Any disputes will be subject to the exclusive
            jurisdiction of the courts located there.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Changes</h2>
          <p className="text-ink/80">
            We may update these terms; continued use of the site signifies acceptance of any changes.
          </p>
        </section>
      </div>
    </main>
  );
}
