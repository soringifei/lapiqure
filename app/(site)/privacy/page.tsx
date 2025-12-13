'use client'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="font-display text-3xl tracking-luxury">Privacy</h1>
          <p className="text-ink/70">
            We protect your data with the same care we give our collections. This notice is concise and aligned with
            leading luxury standards (GDPR/CCPA friendly).
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">What We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Contact and identity details (for orders and concierge support).</li>
            <li>Order and payment metadata (via secure payment processors).</li>
            <li>Device/usage and limited analytics to improve experience.</li>
            <li>Marketing preferences when you opt in.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">How We Use It</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Fulfil purchases and provide concierge-level service.</li>
            <li>Prevent fraud and maintain platform security.</li>
            <li>Send updates and invitations when you consent.</li>
            <li>Improve site performance through privacy-conscious analytics.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Sharing</h2>
          <p className="text-ink/80">
            We share data only with service providers (payments, logistics, analytics) under strict agreements. We do not
            sell your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Retention & Security</h2>
          <p className="text-ink/80">
            Data is retained only as needed for service and legal purposes, then deleted or anonymized. We use industry
            standard safeguards to protect your information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Your Choices</h2>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li>Request access, correction, or deletion of your data.</li>
            <li>Opt out of marketing at any time.</li>
            <li>Adjust cookie preferences in your browser settings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-editorial uppercase text-ink">Contact</h2>
          <p className="text-ink/80">
            For privacy requests, email <a className="underline" href="mailto:alin@lapiqure.com">alin@lapiqure.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
