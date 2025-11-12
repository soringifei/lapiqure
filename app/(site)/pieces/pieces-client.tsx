'use client';

import { useState } from 'react';
import PieceCard from '@/components/piece-card';
import { Piece } from '@/lib/types';
import FilterPanel from '@/components/filter-panel';

interface PiecesClientProps {
  pieces: Piece[];
}

export default function PiecesClient({ pieces }: PiecesClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['all']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['all']);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['all', 'outerwear', 'tops', 'bottoms', 'dresses', 'accessories'];
  const conditions = ['all', 'new', 'excellent', 'good', 'archive'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'ONE SIZE'];

  const toggleFilter = (value: string, current: string[], setter: (val: string[]) => void) => {
    if (value === 'all') {
      setter(['all']);
    } else {
      const newFilters = current.includes(value)
        ? current.filter(f => f !== value)
        : [...current.filter(f => f !== 'all'), value];
      setter(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  const filteredPieces = pieces.filter(piece => {
    const categoryMatch = selectedCategories.includes('all') || selectedCategories.includes(piece.category);
    const conditionMatch = selectedConditions.includes('all') || selectedConditions.includes(piece.condition);
    const sizeMatch = selectedSizes.includes('all') || piece.sizes.some(size => selectedSizes.includes(size));
    const availabilityMatch = availabilityFilter === 'all' || 
      (availabilityFilter === 'available' && piece.available) ||
      (availabilityFilter === 'coming' && !piece.available);

    return categoryMatch && conditionMatch && sizeMatch && availabilityMatch;
  });

  const sortedPieces = [...filteredPieces].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <FilterPanel
          categories={categories}
          conditions={conditions}
          sizes={sizes}
          selectedCategories={selectedCategories}
          selectedConditions={selectedConditions}
          selectedSizes={selectedSizes}
          availabilityFilter={availabilityFilter}
          onCategoryChange={(val) => toggleFilter(val, selectedCategories, setSelectedCategories)}
          onConditionChange={(val) => toggleFilter(val, selectedConditions, setSelectedConditions)}
          onSizeChange={(val) => toggleFilter(val, selectedSizes, setSelectedSizes)}
          onAvailabilityChange={setAvailabilityFilter}
        />
        
        <div className="flex items-center gap-6">
          <p className="font-display text-xs uppercase tracking-wide text-ink-700">
            {sortedPieces.length} piece{sortedPieces.length !== 1 ? 's' : ''}
          </p>
          <div className="relative">
            <select 
              className="appearance-none font-display text-xs uppercase tracking-wide text-ink bg-paper border border-ink/20 hover:border-ink hover:bg-sand/5 px-6 py-3 pr-12 cursor-pointer transition-all duration-300 focus:outline-none focus:border-ink focus:bg-sand/10"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-ink transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {sortedPieces.map((piece) => (
          <PieceCard
              key={piece.id}
              name={piece.name}
              slug={piece.slug}
              designer={piece.designer}
              condition={piece.condition}
              imageSrc={piece.images[0]}
              price={piece.price}
            />
          ))}
      </div>

      {sortedPieces.length === 0 && (
        <div className="text-center py-16">
          <p className="font-sans text-sm text-ink-700">
            No pieces match your filters. Try adjusting your selection.
          </p>
        </div>
      )}
    </div>
  );
}
