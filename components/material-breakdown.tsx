interface MaterialBreakdownProps {
  materials: { name: string; percentage: number; origin?: string }[];
}

export default function MaterialBreakdown({ materials }: MaterialBreakdownProps) {
  return (
    <div className="border border-ink p-6 bg-paper">
      <h4 className="font-mono text-xs uppercase tracking-wide text-ink mb-4 border-b border-ink/20 pb-2">
        Material Composition
      </h4>
      
      <div className="space-y-3">
        {materials.map((material, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase text-ink">
                  {material.name}
                </span>
                <span className="font-mono text-xs text-ink-700">
                  {material.percentage}%
                </span>
              </div>
              {material.origin && (
                <p className="font-mono text-[10px] text-ink-700">
                  ORIGIN: {material.origin}
                </p>
              )}
            </div>
            <div className="w-16 h-1 bg-sand mt-2">
              <div 
                className="h-full bg-ink transition-all duration-500"
                style={{ width: `${material.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-ink/20">
        <p className="font-mono text-[10px] text-ink-700 leading-relaxed">
          ALL MATERIALS SOURCED FROM CERTIFIED SUSTAINABLE SUPPLIERS. 
          INDEPENDENTLY AUDITED FOR QUALITY AND ETHICAL PRODUCTION.
        </p>
      </div>
    </div>
  );
}
