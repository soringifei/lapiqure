'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  conditions: string[];
  sizes: string[];
  selectedCategories: string[];
  selectedConditions: string[];
  selectedSizes: string[];
  availabilityFilter: string;
  onCategoryChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
}

export default function FilterPanel({
  categories,
  conditions,
  sizes,
  selectedCategories,
  selectedConditions,
  selectedSizes,
  availabilityFilter,
  onCategoryChange,
  onConditionChange,
  onSizeChange,
  onAvailabilityChange
}: FilterPanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-3 px-6 py-3 border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all duration-300 text-xs font-mono uppercase tracking-wide text-ink group">
          <SlidersHorizontal className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 duration-500" />
          <span>Refine</span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:max-w-md bg-paper overflow-y-auto">
        <SheetHeader className="border-b border-ink/10 pb-6">
          <SheetTitle className="font-mono text-sm uppercase tracking-[0.2em] text-ink">
            Filter Selection
          </SheetTitle>
          <p className="font-mono text-[10px] uppercase text-ink-700 mt-2">Refine your search</p>
        </SheetHeader>

        <div className="mt-10 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-ink/20 flex-1" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                Category
              </h3>
              <div className="h-px bg-ink/20 flex-1" />
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label 
                  key={cat} 
                  className="flex items-center cursor-pointer group py-2 px-3 -mx-3 hover:bg-sand/10 transition-colors duration-200"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => onCategoryChange(cat)}
                    />
                    <div className="w-4 h-4 border border-ink/30 peer-checked:bg-ink peer-checked:border-ink transition-all duration-200 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-paper opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 font-mono text-xs uppercase tracking-wide text-ink-700 group-hover:text-ink transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-ink/20 flex-1" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                Condition
              </h3>
              <div className="h-px bg-ink/20 flex-1" />
            </div>
            <div className="space-y-3">
              {conditions.map((cond) => (
                <label 
                  key={cond} 
                  className="flex items-center cursor-pointer group py-2 px-3 -mx-3 hover:bg-sand/10 transition-colors duration-200"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedConditions.includes(cond)}
                      onChange={() => onConditionChange(cond)}
                    />
                    <div className="w-4 h-4 border border-ink/30 peer-checked:bg-ink peer-checked:border-ink transition-all duration-200 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-paper opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 font-mono text-xs uppercase tracking-wide text-ink-700 group-hover:text-ink transition-colors">
                    {cond}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-ink/20 flex-1" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                Size
              </h3>
              <div className="h-px bg-ink/20 flex-1" />
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <label 
                  key={size} 
                  className="cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={selectedSizes.includes(size)}
                    onChange={() => onSizeChange(size)}
                  />
                  <div className="px-4 py-2 border border-ink/20 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper hover:border-ink transition-all duration-200">
                    <span className="font-mono text-xs uppercase tracking-wide">
                      {size}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-ink/20 flex-1" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                Availability
              </h3>
              <div className="h-px bg-ink/20 flex-1" />
            </div>
            <div className="space-y-3">
              {['all', 'available', 'coming'].map((avail) => (
                <label 
                  key={avail} 
                  className="flex items-center cursor-pointer group py-2 px-3 -mx-3 hover:bg-sand/10 transition-colors duration-200"
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      className="peer sr-only"
                      checked={availabilityFilter === avail}
                      onChange={() => onAvailabilityChange(avail)}
                    />
                    <div className="w-4 h-4 rounded-full border border-ink/30 peer-checked:border-ink transition-all duration-200 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-ink opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="ml-3 font-mono text-xs uppercase tracking-wide text-ink-700 group-hover:text-ink transition-colors">
                    {avail === 'coming' ? 'Coming Soon' : avail}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
