# Atelier Fashion

An elevated fashion e-commerce site for an independent designer, built with Next.js 14, TypeScript, and Firebase.

## Design Philosophy

This site embodies the aesthetic principles of slow luxury fashion, drawing inspiration from:

- **Le Labo** – minimal, atelier, material-first, negative space, muted palette
- **Golden Goose** – imperfect luxury, strong photography, texture, personality
- **Louis Vuitton** – hero sections, clean grid, brand + shop balance
- **Gucci** – editorial, bold imagery, art-direction, lookbook energy
- **Hermès** – calm, crafted, exclusive, slow luxury

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** with custom luxury color palette
- **Firebase v10** (Auth, Firestore, Storage)
- **Next Image** for all images

## Color Palette

- Cream tones: `#faf9f7`, `#f5f3ef`, `#ebe7df`
- Ink: `#1a1a1a`, `#2d2d2d`
- Olive accents: `#6b7456`, `#7d8668`
- Warm whites: `#fefdfb`, `#f0ebe3`
- Burgundy: `#5a3a3a`

## Typography

- **Display font**: Copperplate (with fallback stack)
- **Body font**: system-ui, Inter
- Extensive use of letter-spacing and uppercase for luxury labels

## Project Structure

```
atelier-fashion/
├── app/
│   ├── layout.tsx          # Root layout with navbar + footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── collections/
│   │   ├── page.tsx        # Collections archive
│   │   └── [slug]/
│   │       └── page.tsx    # Collection detail
│   ├── pieces/
│   │   └── page.tsx        # Shop/pieces listing
│   ├── about/
│   │   └── page.tsx        # About/atelier story
│   └── auth/
│       └── page.tsx        # Auth page (placeholder)
├── components/
│   ├── Navbar.tsx          # Floating minimal navigation
│   ├── Footer.tsx          # Hermès-style footer
│   ├── Hero.tsx            # Full-width hero component
│   ├── SectionHeading.tsx  # Luxury section labels
│   ├── PieceCard.tsx       # Product card component
│   ├── EditorialStrip.tsx  # Horizontal image scroll
│   └── StoryBlock.tsx      # Image + text layout
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── firebase.ts         # Firebase initialization
│   ├── firestore.ts        # Firestore helpers (stubbed)
│   └── sample-data.ts      # Mock collections & pieces
├── public/
│   └── images/             # Image assets (TODO: add actual images)
├── tailwind.config.ts      # Tailwind with custom theme
└── package.json
```

## Getting Started

### 1. Install Dependencies

```bash
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

Place your luxury imagery in the following structure:

```
public/images/
├── hero-home.jpg
├── collections/
│   ├── atelier-noir-hero.jpg
│   ├── atelier-noir-1.jpg
│   ├── terre-calme-hero.jpg
│   └── archive-hero.jpg
├── pieces/
│   ├── wool-coat-1.jpg
│   ├── linen-shirt-1.jpg
│   └── ...
├── editorial/
│   ├── lookbook-1.jpg
│   ├── lookbook-2.jpg
│   └── ...
└── about-hero.jpg
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

- **/** – Home with hero, brand story, featured pieces, editorial strip
- **/collections** – Grid of all collections
- **/collections/[slug]** – Individual collection detail
- **/pieces** – Shop listing with filters
- **/about** – Atelier story and philosophy
- **/auth** – Login/signup (placeholder for Firebase Auth)

## TODO

- [ ] Upload licensed Copperplate webfont
- [ ] Replace placeholder images with actual photography
- [ ] Connect Firestore helpers in `lib/firestore.ts`
- [ ] Implement Firebase Auth in `/auth` page
- [ ] Add Stripe integration for checkout
- [ ] Build product detail pages (`/pieces/[slug]`)
- [ ] Implement filtering logic on `/pieces` page
- [ ] Add rental flow for members
- [ ] Create admin dashboard for managing collections/pieces

## License

Private project for independent fashion designer.
