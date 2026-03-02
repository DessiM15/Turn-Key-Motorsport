'use client';

import { LayoutGrid, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'name-asc';

interface ShopToolbarProps {
  productCount: number;
  layout: 'grid' | 'list';
  sortBy: SortOption;
  onLayoutChange: (layout: 'grid' | 'list') => void;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'name-asc', label: 'Name A–Z' },
];

export default function ShopToolbar({
  productCount,
  layout,
  sortBy,
  onLayoutChange,
  onSortChange,
}: ShopToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Result Count */}
      <p className="text-sm text-text-secondary">
        Showing <span className="font-semibold text-white">{productCount}</span>{' '}
        {productCount === 1 ? 'product' : 'products'}
      </p>

      <div className="flex items-center gap-3">
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Layout Toggle */}
        <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
          <button
            onClick={() => onLayoutChange('grid')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              layout === 'grid'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-white'
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onLayoutChange('list')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              layout === 'list'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-white'
            )}
            aria-label="List view"
          >
            <LayoutList className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
