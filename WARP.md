# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Product Vision

**LA PIQÛRE** - An online home for an independent fashion brand that:
- **Bold contemporary aesthetic** (premium materials, striking silhouettes)
- **Editorial presentation** inspired by luxury fashion houses
- **Product-level detail** with material storytelling
- **Future-ready for e-commerce** (selling and renting pieces)

### Design Inspirations
- **Gucci/LV**: Editorial, bold imagery, art-direction, lookbook energy
- **Hermès**: Calm, crafted, exclusive, slow luxury
- **Le Labo**: Minimal, atelier, material-first, negative space
- **Golden Goose**: "This piece has a life" storytelling, imperfect luxury

## Feature Roadmap

### MVP Features (Current)
- ✓ Hero with latest collection (real images from Alin Pinto portfolio)
- ✓ Featured pieces/cards component
- ✓ Collections page (3 collections: Atelier Noir, Terre Calme, Archive Édition)
- ✓ Collection detail page with hero and story
- ✓ About / brand story page
- ✓ All 7 products with real images and LA PIQÛRE branding
- ✓ Premium UX with dramatic hover effects, 500-700ms transitions
- ✓ LA PIQÛRE brand identity with custom logo (scorpion-tail Û)
- ✓ Contact email: contact@lapiqure.com
- ✓ Editorial strip with centered campaign images
- ✓ Firebase-connected data source (currently using mock data in `lib/sample-data.ts`)
- ⚠ Basic auth (email/password or Google) - **TODO**: Connect Firebase Auth

### Future Features (Commerce & Rental)

**Product Detail Page** (`/pieces/[slug]`):
- High-quality image gallery
- Material, condition, story, designer info
- "This piece has a life" editorial copy (Golden Goose style)
- Availability status (rent/buy options)
- Size selection
- Add to cart / Add to wishlist buttons

**E-commerce Features**:
- Shopping cart with Stripe/Lemon Squeezy integration
- Wishlist functionality (saved to user profile)
- Members-only capsule collection (gated by Firebase Auth)
- Rental flow with subscription model
- Order history and tracking

**Content & Discovery**:
- Editorial/lookbook section with season stories
- SEO optimization for collections and pieces pages
- Search functionality
- Filtering by category, size, condition, price

**Admin Panel**:
- Authenticated admin dashboard
- CRUD operations for collections and pieces
- Image upload to Firebase Storage
- Inventory management

## Commands

### Development
```powershell
npm run dev
```
Starts Next.js development server on http://localhost:3000

### Build & Production
```powershell
npm run build
npm run start
```
Build for production and start production server

### Linting
```powershell
npm run lint
```
Runs ESLint with Next.js configuration

## Architecture

### Tech Stack
- **Next.js 14** with App Router (server components by default)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with custom luxury design tokens
- **Firebase v10** (Auth, Firestore, Storage)
- **React 18** with Server Components
- **Deployment**: Vercel
- **Payments** (planned): Stripe or Lemon Squeezy
- **CMS** (optional): Sanity/Contentful OR custom admin page with Firebase Auth

### State Management
- Primarily server components for data fetching and rendering
- Client components (`'use client'`) only where needed for interactivity
- Use `useState`/`useEffect` sparingly - prefer server-side data fetching
- No global state management library needed currently

### Design Philosophy
This is a luxury fashion e-commerce site for **LA PIQÛRE**, an independent fashion brand. The aesthetic emphasizes:
- Bold contemporary design with premium materials
- Generous negative space and dramatic typography
- Editorial fashion photography from Alin Pinto portfolio
- Custom color palette (warm off-white background, deep ink text, sand accents)
- Premium UX with slow transitions (500-700ms), dramatic hover effects
- Large typography (18px body, up to 96px headlines)
- Custom typography using Copperplate display font with luxury letter-spacing

### Color Palette
The site uses a custom Tailwind theme defined in `tailwind.config.ts`:
- **Background**: `background` (#F6F2EB) - warm off-white
- **Paper**: `paper` (#FFFFFF) - white sections
- **Ink**: `ink-900` (#1F1A17), `ink-800` (#3A3330), `ink-700` (#4F4843) - deep brown text
- **Accent Olive**: `accent-olive` (#6B7445)
- **Accent Burgundy**: `accent-burgundy` (#7A231D)
- **Sand**: `sand` (#D9C6A3) - soft sand/beige for badges and accents
- **Border**: `border` (rgba(0, 0, 0, 0.06)) - subtle borders

Always use these custom colors instead of default Tailwind colors.

### Typography
- **Display font**: `font-display` (Copperplate family) - use for headings and brand elements
- **Body font**: `font-sans` (system-ui stack) - use for body text
- **Letter spacing**: `tracking-luxury` (0.15em) for uppercase headings, `tracking-editorial` (0.05em) for navigation

### Project Structure

#### App Directory (Next.js App Router)
```
app/
├── layout.tsx           # Root layout with Navbar + Footer
├── page.tsx            # Home page
├── globals.css         # Global styles, Tailwind directives
├── collections/
│   ├── page.tsx        # Collections archive grid
│   └── [slug]/page.tsx # Individual collection detail
├── pieces/
│   └── page.tsx        # Shop/pieces listing (TODO: filters)
├── about/
│   └── page.tsx        # Atelier story page
└── auth/
    └── page.tsx        # Auth page (Firebase Auth TODO)
```

#### Components
Reusable UI components follow the luxury design system (all kebab-case filenames):
- `navbar.tsx` - Fixed navigation with LA PIQÛRE logo and backdrop blur
- `footer.tsx` - Luxury footer with contact@lapiqure.com
- `hero.tsx` - Full-width hero sections with dramatic overlays
- `section-heading.tsx` - Luxury section labels with custom typography
- `piece-card.tsx` - Product card with hover lift effect
- `collection-card.tsx` - Collection card component
- `editorial-strip.tsx` - Centered horizontal scrolling image gallery with zoom on hover
- `story-block.tsx` - Image + text layout for editorial content
- `ui/` - Reusable primitives (button.tsx, badge.tsx, container.tsx)

#### Lib Directory
```
lib/
├── types.ts        # TypeScript interfaces (Collection, Piece, FilterState)
├── firebase.ts     # Firebase initialization and getters
├── firestore.ts    # Firestore helpers (currently stubbed, returns empty arrays)
├── sample-data.ts  # Mock data - 3 collections, 7 products with real images
├── constants.ts    # Brand constants (BRAND_NAME, NAV_ITEMS, CONTACT_INFO, COLORS)
```

### Data Models

#### Collection Interface
```typescript
{
  id: string;
  title: string;
  slug: string;
  season: string;
  description: string;
  story: string;          // Long-form editorial story
  heroImage: string;
  images: string[];
  published: boolean;
  createdAt: Date | string;
}
```

#### Piece Interface
```typescript
{
  id: string;
  name: string;
  slug: string;
  designer: string;
  collectionId: string;
  price: number;
  rentalPrice?: number;   // Optional rental pricing
  condition: 'new' | 'excellent' | 'good' | 'archive';
  images: string[];
  sizes: string[];
  story: string;          // "This piece has a life" editorial storytelling
  category: 'outerwear' | 'tops' | 'bottoms' | 'dresses' | 'accessories' | 'footwear';
  available: boolean;
  material?: string;      // Detailed material description (Hermès/Le Labo style)
  care?: string;          // Care instructions
}
```

**Storytelling Note**: The `story` field should contain rich, editorial copy that gives each piece personality and history - "This piece has a life" (Golden Goose approach). Include origin, craftsmanship details, and material provenance.

### Firebase Integration

#### Current State
Firebase is initialized in `lib/firebase.ts` but Firestore helpers in `lib/firestore.ts` are stubbed (return empty arrays). The app currently uses mock data from `lib/sample-data.ts`.

#### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

#### Firebase Functions
- `initFirebase()` - Initialize Firebase app
- `getFirebaseAuth()` - Get Auth instance
- `getFirebaseDb()` - Get Firestore instance
- `getFirebaseStorage()` - Get Storage instance

### Image Strategy
- Currently using regular `<img>` tags (Next.js Image validation was causing issues)
- All images served from `/public/images/` directory
- 48 real fashion photography images from Alin Pinto portfolio
- Image structure:
  ```
  public/images/
  ├── faux_leather_mixed_with_embossed_zebra_leather_jacket (6 images)
  ├── turtleneck_sweater_with_intarsia_pattern (6 images)
  ├── over_sized_faux_leather_pants (14 images)
  ├── cropped_sleeveless_top_with_zipper_&_flat_silver_studs (5 images)
  ├── faux_leather_cropped_pants (7 images)
  ├── cutsew_distressed_knit_top (5 images)
  ├── oversized_green_faux_leather_pants (4 images)
  └── logo.svg (LA PIQÛRE with custom Û)
  ```
- For production, migrate images to Firebase Storage for dynamic uploads

### Routing
- `/` - Home page with hero, featured pieces, editorial
- `/collections` - All collections grid
- `/collections/[slug]` - Individual collection detail
- `/pieces` - Shop listing (filters TODO)
- `/about` - Atelier story
- `/auth` - Login/signup (Firebase Auth TODO)

### Path Aliases
TypeScript configured with `@/*` alias pointing to project root:
```typescript
import Navbar from '@/components/Navbar';
import { Collection } from '@/lib/types';
```

### Styling Guidelines
- Use custom Tailwind tokens (cream, ink, olive, warm, burgundy)
- Extensive use of negative space (generous padding/margins)
- Typography hierarchy with `font-display` and luxury letter-spacing
- Uppercase labels for section headings and navigation
- Backdrop blur effects for overlays (`backdrop-blur-md`)
- Minimal borders using `cream-200`

## Future Considerations

### Payment Integration (Stripe or Lemon Squeezy)
When implementing payments, extend the `Piece` model to support:
- `stripeProductId` or `stripeSkuId` fields
- `stripePriceId` for one-time purchases
- `stripeRentalPriceId` for rental subscriptions
- Inventory tracking (`quantityAvailable: number`)
- Purchase/rental status flags

Consider creating separate Stripe products for:
- Purchase flow (one-time payment)
- Rental flow (subscription with return policy)

### Content Management System
Two options for managing collections and pieces:

**Option 1: Custom Admin Panel**
- Build `/admin` route gated by Firebase Auth
- Check user role/permissions in Firestore
- Create forms for adding/editing collections and pieces
- Upload images directly to Firebase Storage
- Simpler, no external dependencies

**Option 2: Headless CMS (Sanity/Contentful)**
- Better content modeling and media management
- Client can manage content without code changes
- Requires data migration from Firestore
- Additional service dependency and cost
- Consider Sanity for better image handling and custom schemas

### Completed Features ✅

**Core E-Commerce**:
1. ✓ Shopping cart with slide-over Sheet component
2. ✓ Wishlist functionality with persistent storage
3. ✓ Product detail pages with image gallery
4. ✓ Quick view modal for products
5. ✓ Working filters (category, size, condition, availability) + sorting
6. ✓ Size selection with validation
7. ✓ Toast notifications for all actions
8. ✓ Firebase Auth (email/password + Google OAuth)
9. ✓ Command palette search (⌘K)
10. ✓ Size guide modal with measurements

**Premium UX**:
11. ✓ shadcn/ui integrated with LA PIQÛRE color scheme
12. ✓ Loading skeletons
13. ✓ Social proof badges ("Low Stock")
14. ✓ Newsletter signup
15. ✓ Premium animations (500-700ms transitions)
16. ✓ Heart icon wishlist toggles on cards
17. ✓ Quick View on hover
18. ✓ Persistent cart/wishlist (localStorage)
19. ✓ Real images (48 photos from Alin Pinto)
20. ✓ LA PIQÛRE brand identity complete

**Still TODO** (Future enhancements):
- Upload licensed Copperplate webfont (currently using fallback)
- Connect Firestore for production data (replace mock data)
- Image zoom on product pages
- Recently viewed items tracking
- SEO optimization (structured data, Open Graph)
- Stripe/payment integration
- Admin dashboard
- Order history & tracking
