export interface Collection {
  id: string;
  title: string;
  slug: string;
  season: string;
  description: string;
  story: string;
  heroImage: string;
  images: string[];
  published: boolean;
  createdAt: Date | string;
}

export interface Piece {
  id: string;
  name: string;
  slug: string;
  designer: string;
  collectionId: string;
  collectionName?: string;
  price: number;
  rentalPrice?: number;
  condition: 'new' | 'excellent' | 'good' | 'archive';
  images: string[];
  sizes: string[];
  story: string;
  category: 'outerwear' | 'tops' | 'bottoms' | 'dresses' | 'accessories' | 'footwear';
  available: boolean;
  material?: string;
  care?: string;
}

export interface FilterState {
  category: string[];
  size: string[];
  condition: string[];
  availability: 'all' | 'available' | 'unavailable';
}
