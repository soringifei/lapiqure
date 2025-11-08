import Image from 'next/image';
import Link from 'next/link';

interface PieceCardProps {
  name: string;
  slug: string;
  designer: string;
  condition: string;
  imageSrc: string;
  price: number;
  collectionName?: string;
}

export default function PieceCard({ 
  name, 
  slug, 
  designer, 
  condition, 
  imageSrc, 
  price,
  collectionName 
}: PieceCardProps) {
  return (
    <Link href={`/pieces/${slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden mb-4">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {condition !== 'new' && (
          <div className="absolute top-4 left-4">
            <span className="bg-warm-white/90 backdrop-blur-sm px-3 py-1 text-xs tracking-editorial uppercase font-sans">
              {condition}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-sans text-sm text-ink-900 group-hover:text-ink-700 transition-colors">
          {name}
        </h3>
        {collectionName && (
          <p className="font-sans text-xs text-ink-600">
            {collectionName}
          </p>
        )}
        <p className="font-sans text-xs text-ink-800">
          €{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
