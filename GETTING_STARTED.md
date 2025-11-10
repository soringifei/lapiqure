# Getting Started

## Project Scaffold Complete ✅

The Atelier Fashion project has been fully scaffolded with the following structure:

### ✅ Completed
- **Route Groups**: Created `app/(site)/` with collections, pieces, about, and auth routes
- **Components**: All components renamed to kebab-case convention
- **UI Components**: Created `components/ui/` with Button, Badge, and Container
- **New Components**: Added CollectionCard component
- **Constants**: Created `lib/constants.ts` with shared values
- **Image Directories**: Set up `public/images/` structure
- **Documentation**: Created WARP.md and PROJECT_STRUCTURE.md

### 📂 Project Structure

```
atelier-fashion/
├── app/
│   ├── (site)/
│   │   ├── collections/     [page.tsx, [slug]/page.tsx]
│   │   ├── pieces/          [page.tsx]
│   │   ├── about/           [page.tsx]
│   │   └── auth/            [page.tsx]
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                  [button.tsx, badge.tsx, container.tsx]
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── section-heading.tsx
│   ├── piece-card.tsx
│   ├── collection-card.tsx
│   ├── editorial-strip.tsx
│   └── story-block.tsx
│
├── lib/
│   ├── types.ts
│   ├── firebase.ts
│   ├── firestore.ts
│   ├── sample-data.ts
│   └── constants.ts         [NEW]
│
└── public/images/
    ├── collections/
    ├── pieces/
    └── editorial/
```

## Next Steps

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Firebase
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Add Images
Place your imagery in the following structure:
```
public/images/
├── hero-home.jpg
├── about-hero.jpg
├── collections/
│   ├── atelier-noir-hero.jpg
│   ├── terre-calme-hero.jpg
│   └── archive-hero.jpg
├── pieces/
│   ├── wool-coat-1.jpg
│   ├── linen-shirt-1.jpg
│   └── ...
└── editorial/
    ├── lookbook-1.jpg
    ├── lookbook-2.jpg
    └── ...
```

### 4. Run Development Server
```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Commands

```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Routes

- `/` - Home page with hero, brand story, featured pieces
- `/collections` - Collections archive grid
- `/collections/[slug]` - Individual collection detail
- `/pieces` - Shop listing with filters
- `/about` - Atelier story and philosophy
- `/auth` - Authentication page

## Key Features

### MVP (Current State)
- ✅ Hero with latest collection
- ✅ Featured pieces/cards component
- ✅ Collections page (grid view)
- ✅ Collection detail page
- ✅ About / brand story page
- ✅ Firebase-connected data source (using mock data)
- ⚠️ Basic auth UI (Firebase integration TODO)

### Using New Components

#### Button Component
```tsx
import Button from '@/components/ui/button'

<Button variant="primary" size="md" href="/pieces">
  Shop Now
</Button>

<Button variant="secondary" onClick={handleClick}>
  Add to Cart
</Button>
```

#### Badge Component
```tsx
import Badge from '@/components/ui/badge'

<Badge variant="subtle">Archive</Badge>
<Badge variant="outline">New</Badge>
```

#### Container Component
```tsx
import Container from '@/components/ui/container'

<Container size="lg">
  {/* Content with max-width and padding */}
</Container>
```

#### CollectionCard Component
```tsx
import CollectionCard from '@/components/collection-card'

<CollectionCard
  title="ATELIER NOIR"
  slug="atelier-noir"
  season="AW 2024"
  description="A study in absence..."
  heroImage="/images/collections/atelier-noir-hero.jpg"
/>
```

## Using Constants

```tsx
import { NAV_ITEMS, COLORS, PIECE_CATEGORIES } from '@/lib/constants'

// Navigation items
NAV_ITEMS.map(item => <Link href={item.href}>{item.label}</Link>)

// Color values
const bgColor = COLORS.cream[50]

// Categories
PIECE_CATEGORIES.map(cat => ...)
```

## Styling Guidelines

### Custom Tailwind Classes
- `font-display` - Copperplate display font for headings
- `font-sans` - System font stack for body text
- `tracking-luxury` - 0.15em letter spacing for uppercase headings
- `tracking-editorial` - 0.05em letter spacing for navigation

### Color Palette
- **Cream tones**: `cream-50`, `cream-100`, `cream-200`, `cream-300`
- **Ink**: `ink-900`, `ink-800`, `ink-700`
- **Olive**: `olive-600`, `olive-500`, `olive-400`
- **Warm**: `warm-white`, `warm-beige`
- **Burgundy**: `burgundy-700`, `burgundy-600`

### Typography Examples
```tsx
<h1 className="font-display text-4xl tracking-luxury uppercase text-ink-900">
  ATELIER
</h1>

<p className="font-sans text-sm text-ink-700 leading-relaxed">
  Body text with system font
</p>
```

## Troubleshooting

### Images not loading
- Ensure images are placed in `public/images/` directory
- Check file names match those in `sample-data.ts`
- Use placeholder images initially (can use solid colors or unsplash.com)

### TypeScript errors
- Run `npm run build` to check for type errors
- Ensure all imports use kebab-case component names

### Firebase not connected
- Verify `.env.local` exists and has correct credentials
- Firebase helpers in `lib/firestore.ts` are currently stubbed
- Mock data from `lib/sample-data.ts` is being used

## Documentation

- **WARP.md** - AI agent context and project guidelines
- **PROJECT_STRUCTURE.md** - Complete file tree overview
- **README.md** - Project overview and design philosophy
