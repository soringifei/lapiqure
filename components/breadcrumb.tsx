import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-sans text-ink-700 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-ink transition-colors uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ink uppercase tracking-wide">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="h-3 w-3" />
          )}
        </div>
      ))}
    </nav>
  );
}
