interface ProductBadgeProps {
  type: 'new' | 'exclusive' | 'low-stock' | 'extended-shipping' | 'unavailable' | 'pre-order' | 'made-to-order';
  className?: string;
}

export default function ProductBadge({ type, className = '' }: ProductBadgeProps) {
  const badges = {
    'new': {
      text: 'NEW',
      styles: 'bg-ink text-paper'
    },
    'exclusive': {
      text: 'EXCLUSIVE',
      styles: 'bg-amber-600 text-paper'
    },
    'low-stock': {
      text: 'LOW STOCK',
      styles: 'bg-orange-500 text-paper'
    },
    'extended-shipping': {
      text: 'EXTENDED SHIPPING',
      styles: 'bg-yellow-500 text-paper'
    },
    'unavailable': {
      text: 'UNAVAILABLE',
      styles: 'bg-ink/60 text-paper'
    },
    'pre-order': {
      text: 'PRE-ORDER',
      styles: 'bg-accent-olive text-paper'
    },
    'made-to-order': {
      text: 'MADE TO ORDER',
      styles: 'bg-ink/80 text-paper'
    }
  };

  const badge = badges[type];

  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] font-sans font-medium uppercase tracking-widest ${badge.styles} ${className}`}
    >
      {badge.text}
    </span>
  );
}
