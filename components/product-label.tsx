interface ProductLabelProps {
  name: string;
  batchNumber?: string;
  productionDate?: string;
  material?: string;
  className?: string;
}

export default function ProductLabel({
  name,
  batchNumber,
  productionDate,
  material,
  className = ''
}: ProductLabelProps) {
  return (
    <div className={`bg-paper border border-ink p-4 font-mono text-ink ${className}`}>
      <div className="space-y-1 text-xs uppercase">
        <div className="font-bold tracking-wide">{name}</div>
        
        {material && (
          <div className="text-[10px] opacity-70">
            COMPOSITION: {material}
          </div>
        )}
        
        {batchNumber && (
          <div className="text-[10px] opacity-70">
            BATCH: {batchNumber}
          </div>
        )}
        
        {productionDate && (
          <div className="text-[10px] opacity-70">
            PROD: {productionDate}
          </div>
        )}
        
        <div className="text-[10px] opacity-70 pt-2 border-t border-ink/20">
          HANDCRAFTED IN PARIS
        </div>
      </div>
    </div>
  );
}
