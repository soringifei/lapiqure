interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`font-display text-xs tracking-luxury uppercase text-ink-800 ${className}`}>
      {children}
    </h2>
  );
}
