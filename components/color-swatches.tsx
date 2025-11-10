interface ColorSwatchesProps {
  colors: { name: string; hex: string }[];
  className?: string;
}

export default function ColorSwatches({ colors, className = '' }: ColorSwatchesProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {colors.map((color) => (
        <div
          key={color.name}
          className="w-5 h-5 rounded-full border border-border cursor-pointer hover:scale-110 transition-transform"
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      ))}
    </div>
  );
}
