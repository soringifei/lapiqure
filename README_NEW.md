# LA PIQÛRE 🦂

A luxury fashion e-commerce platform built with Next.js 14, TypeScript, and Firebase.

![LA PIQÛRE](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-10-orange)

## 🎯 Overview

LA PIQÛRE is a contemporary luxury fashion brand featuring bold materials, striking silhouettes, and premium craftsmanship. The platform offers a complete e-commerce experience with:

- 🛍️ Full shopping cart and wishlist functionality
- 🔍 Advanced product search and filtering
- 🔐 Firebase authentication (Email + Google OAuth)
- 💳 Ready for Stripe payment integration
- 📱 Fully responsive design
- ⚡ Premium UX with smooth animations

## ✨ Features

### Core E-Commerce
- **Shopping Cart**: Slide-over cart with quantity controls and persistent storage
- **Wishlist**: Save favorite items with localStorage persistence
- **Product Pages**: Detailed galleries, size selection, and editorial storytelling
- **Quick View**: Preview products without leaving the shop page
- **Smart Filters**: Filter by category, size, condition, and availability
- **Command Palette**: Fast search with ⌘K keyboard shortcut
- **Size Guide**: Comprehensive size chart and measurement guide

### Premium UX
- **shadcn/ui Components**: Accessible, beautiful UI components
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Skeleton components for better perceived performance
- **Social Proof**: "Low Stock" badges and urgency messaging
- **Newsletter**: Email capture with toast confirmation
- **Smooth Animations**: 500-700ms transitions for luxury feel

### Authentication
- Email/Password sign up and login
- Google OAuth integration
- Protected routes and member-only content
- Persistent auth state

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atelier-fashion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
atelier-fashion/
├── app/                    # Next.js 14 App Router
│   ├── (site)/            # Site routes group
│   │   ├── about/         # About page
│   │   ├── auth/          # Authentication
│   │   ├── collections/   # Collections listing
│   │   └── pieces/        # Products + detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cart-sheet.tsx    # Shopping cart
│   ├── command-palette.tsx # ⌘K search
│   └── ...               # Other components
├── lib/                   # Utilities and config
│   ├── auth-context.tsx  # Auth provider
│   ├── cart-context.tsx  # Cart state
│   ├── wishlist-context.tsx # Wishlist state
│   ├── firebase.ts       # Firebase config
│   └── sample-data.ts    # Mock product data
└── public/
    └── images/           # Product images
```

## 🎨 Design System

### Color Palette
- **Background**: `#F6F2EB` - Warm off-white
- **Ink**: `#1F1A17` - Deep brown text
- **Sand**: `#D9C6A3` - Soft sand accents
- **Olive**: `#6B7445` - Muted olive
- **Burgundy**: `#7A231D` - Deep burgundy

### Typography
- **Display**: Copperplate (with fallbacks)
- **Body**: System font stack
- **Luxury spacing**: 0.15em letter-spacing on headings

### Animations
- Transitions: 500-700ms for premium feel
- Hover effects: Card lift, shadow, and image zoom
- Smooth scroll behavior throughout

## 🔧 Configuration

### Firebase Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password + Google)
3. Copy config values to `.env.local`
4. Add authorized domains for production

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.

### shadcn/ui
Components are configured with the LA PIQÛRE color scheme in `components.json`:
```bash
npx shadcn@latest add [component-name]
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore (ready to connect)
- **State**: React Context API
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding Components

```bash
# Add shadcn/ui component
npx shadcn@latest add button

# Available components: dialog, input, label, sheet, toast, etc.
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## 📝 Product Data

Currently using mock data in `lib/sample-data.ts`:
- 3 Collections (Atelier Noir, Terre Calme, Archive Édition)
- 7 Products with real images
- Ready to connect to Firestore for dynamic data

### Data Models

**Collection**:
```typescript
{
  id: string;
  title: string;
  slug: string;
  season: string;
  description: string;
  story: string;
  heroImage: string;
  images: string[];
  published: boolean;
  createdAt: string;
}
```

**Piece (Product)**:
```typescript
{
  id: string;
  name: string;
  slug: string;
  designer: string;
  price: number;
  rentalPrice?: number;
  condition: 'new' | 'excellent' | 'good' | 'archive';
  images: string[];
  sizes: string[];
  story: string;
  category: string;
  available: boolean;
  material?: string;
  care?: string;
}
```

## 🎯 Roadmap

### Completed ✅
- [x] E-commerce core (cart, wishlist, filters)
- [x] Firebase authentication
- [x] Product detail pages
- [x] Command palette search
- [x] Premium UX components
- [x] Size guide
- [x] Newsletter signup

### Planned 🎯
- [ ] Stripe payment integration
- [ ] Order history and tracking
- [ ] Admin dashboard
- [ ] Firestore connection
- [ ] Image zoom on product pages
- [ ] Recently viewed items
- [ ] SEO optimization
- [ ] Performance optimization

## 📄 License

Private project for LA PIQÛRE brand.

## 🤝 Contact

- Email: contact@lapiqure.com
- Firebase Project: [lapiquire](https://console.firebase.google.com/project/lapiquire)

---

**Built with** ❤️ **for luxury fashion**
