/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyA1fr7c7nyL7Oir0zJazRuXBPSVoq02cw4',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'lapiqure-29.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'lapiqure-29',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'lapiqure-29.firebasestorage.app',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '780599018841',
    NEXT_PUBLIC_FIREBASE_APP_ID: '1:780599018841:web:00dc834f5f14590f323848',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'G-JP4BP6D0B4',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_live_51SSgWIDBfAfsRE6MzqWBTEzfNdsFP1dr8IF2kOHSGbX1DkH4GEXcB2QIE0AEMzCsMgUdESzKGZcpiJcWcsSHaEHY00lolxmthW',
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  trailingSlash: true,
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production'
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://js.stripe.com https://apis.google.com;"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://js.stripe.com https://apis.google.com;"

    const csp =
      "default-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://firebase.googleapis.com https://firestore.googleapis.com https://securetoken.googleapis.com https://js.stripe.com https://apis.google.com; " +
      scriptSrc +
      " connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com https://firebaseinstallations.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://region1.google-analytics.com https://www.google-analytics.com https://firebasestorage.googleapis.com https://api.stripe.com https://apis.google.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src https://js.stripe.com https://hooks.stripe.com https://accounts.google.com https://apis.google.com; frame-ancestors 'self';"

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
