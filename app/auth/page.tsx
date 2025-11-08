import SectionHeading from '@/components/SectionHeading';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center mb-12">
          <SectionHeading className="mb-4">Members</SectionHeading>
          <h1 className="font-display text-3xl tracking-luxury text-ink-900 mb-4">
            Atelier Access
          </h1>
          <p className="font-sans text-sm leading-relaxed text-ink-700">
            Sign in to access early releases, private archive sales, and rental options.
          </p>
        </div>

        <div className="bg-cream-50 p-8 space-y-6">
          <div>
            <label className="block font-display text-xs tracking-luxury uppercase text-ink-900 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-warm-white border border-cream-300 text-ink-900 font-sans text-sm focus:outline-none focus:border-ink-900 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block font-display text-xs tracking-luxury uppercase text-ink-900 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-warm-white border border-cream-300 text-ink-900 font-sans text-sm focus:outline-none focus:border-ink-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-ink-900 text-cream-50 px-8 py-3 text-xs font-sans tracking-editorial uppercase hover:bg-ink-800 transition-colors">
            Sign In
          </button>

          <div className="text-center">
            <p className="font-sans text-xs text-ink-600">
              Don't have an account?{' '}
              <a href="#" className="text-ink-900 hover:underline">
                Request Access
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-ink-600 leading-relaxed">
            Membership is invitation-only. Access includes early collection previews, 
            private archive viewings, and exclusive rental options for statement pieces.
          </p>
        </div>
      </div>
    </div>
  );
}
