# Project Structure

This document outlines the complete file tree for the Atelier Fashion project.

```
atelier-fashion/
├── app/
│   ├── (site)/                      # Route group for main site pages
│   │   ├── collections/
│   │   │   ├── page.tsx             # /collections - Collections archive grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # /collections/{slug} - Collection detail
│   │   ├── pieces/
│   │   │   └── page.tsx             # /pieces - Shop/pieces listing
│   │   ├── about/
│   │   │   └── page.tsx             # /about - Atelier story page
│   │   └── auth/
│   │       └── page.tsx             # /auth - Authentication page
│   ├── layout.tsx                   # Root layout with navbar + footer
│   ├── page.tsx                     # / - Home page
│   └── globals.css                  # Global styles + Tailwind directives
│
├── components/
│   ├── ui/                          # Reusable UI primitives
│   │   ├── button.tsx               # Button component with variants
│   │   ├── badge.tsx                # Badge/tag component
│   │   └── container.tsx            # Max-width container wrapper
│   ├── navbar.tsx                   # Fixed floating navigation
│   ├── footer.tsx                   # Hermès-inspired footer
│   ├── hero.tsx                     # Full-width hero sections
│   ├── section-heading.tsx          # Luxury section labels
│   ├── piece-card.tsx               # Product card component
│   ├── collection-card.tsx          # Collection card for grid
│   ├── editorial-strip.tsx          # Horizontal scrolling image gallery
│   └── story-block.tsx              # Image + text editorial layout
│
├── lib/
│   ├── types.ts                     # TypeScript interfaces (Collection, Piece, etc.)
│   ├── firebase.ts                  # Firebase initialization & getters
│   ├── firestore.ts                 # Firestore helper functions (currently stubbed)
│   ├── sample-data.ts               # Mock data for collections & pieces
│   └── constants.ts                 # Shared constants (colors, nav, categories)
│
├── public/
│   └── images/                      # Static image assets
│       ├── collections/             # Collection hero images
│       ├── pieces/                  # Product images
│       ├── editorial/               # Lookbook/campaign images
│       ├── hero-home.jpg            # Home page hero
│       └── about-hero.jpg           # About page hero
│
├── .env.example                     # Firebase config template
├── .gitignore                       # Git ignore rules
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies & scripts
├── postcss.config.js                # PostCSS configuration
├── README.md                        # Project documentation
├── tailwind.config.ts               # Tailwind with custom luxury theme
├── tsconfig.json                    # TypeScript configuration
└── WARP.md                          # Warp AI context documentation
```

## Key Architectural Notes

### Route Groups
- `app/(site)/` - Groups main site pages without affecting URL structure
- Routes maintain clean URLs (e.g., `/collections`, not `/(site)/collections`)

### Component Naming
- All components use kebab-case filenames (e.g., `section-heading.tsx`)
- Default exports with PascalCase component names

### Styling Approach
- Custom Tailwind theme in `tailwind.config.ts`
- Luxury color palette: cream, ink, olive, warm, burgundy
- Custom typography with Copperplate display font
- Letter-spacing utilities: `tracking-luxury`, `tracking-editorial`

### Data Flow
- Currently using mock data from `lib/sample-data.ts`
- Firebase helpers stubbed in `lib/firestore.ts` (returns empty arrays)
- Ready to connect to Firestore when configured

### Image Strategy
- Static images in `public/images/`
- Will migrate to Firebase Storage for dynamic uploads
- Next.js Image component for optimization
