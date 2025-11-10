export const BRAND_NAME = 'LA PIQÛRE';

export const NAV_ITEMS = [
  { href: '/collections', label: 'Collections' },
  { href: '/pieces', label: 'Shop' },
  { href: '/about', label: 'Story' },
  { href: '/auth', label: 'Login' },
] as const;

export const FOOTER_NAV = {
  navigate: [
    { href: '/collections', label: 'Collections' },
    { href: '/pieces', label: 'Shop' },
    { href: '/about', label: 'Story' },
  ],
  legal: [
    { href: '#', label: 'Terms & Conditions' },
    { href: '#', label: 'Privacy Policy' },
  ],
} as const;

export const CONTACT_INFO = {
  email: 'contact@lapiqure.com',
  address: {
    street: '15 Rue de la Pierre Levée',
    city: '75011 Paris',
    country: 'France',
  },
} as const;

export const COLORS = {
  background: '#F6F2EB',
  paper: '#FFFFFF',
  ink: {
    DEFAULT: '#1F1A17',
    900: '#1F1A17',
    800: '#3A3330',
    700: '#4F4843',
  },
  accent: {
    olive: '#6B7445',
    burgundy: '#7A231D',
  },
  sand: '#D9C6A3',
  border: 'rgba(0, 0, 0, 0.06)',
} as const;

export const PIECE_CATEGORIES = [
  'outerwear',
  'tops',
  'bottoms',
  'dresses',
  'accessories',
  'footwear',
] as const;

export const PIECE_CONDITIONS = ['new', 'excellent', 'good', 'archive'] as const;

export const PIECE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'ONE SIZE'] as const;
