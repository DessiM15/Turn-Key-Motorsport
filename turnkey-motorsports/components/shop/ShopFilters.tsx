'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SHOP_CATEGORIES } from '@/lib/constants';
import { getAllMakes, getModelsForMake } from '@/lib/data/products';
import { cn } from '@/lib/utils';
import { useGarage } from '@/lib/garage-context';
import type { ProductCategory } from '@/lib/types';

interface ShopFiltersProps {
  selectedCategories: ProductCategory[];
  selectedMake: string;
  selectedModel: string;
  onCategoryChange: (categories: ProductCategory[]) => void;
  onMakeChange: (make: string) => void;
  onModelChange: (model: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function ShopFilters({
  selectedCategories,
  selectedMake,
  selectedModel,
  onCategoryChange,
  onMakeChange,
  onModelChange,
  onClearAll,
  hasActiveFilters,
}: ShopFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [vehicleOpen, setVehicleOpen] = useState(true);

  const { activeVehicle } = useGarage();

  const makes = getAllMakes();
  const models = selectedMake ? getModelsForMake(selectedMake) : [];

  const handleCategoryToggle = (value: ProductCategory) => {
    if (selectedCategories.includes(value)) {
      onCategoryChange(selectedCategories.filter((c) => c !== value));
    } else {
      onCategoryChange([...selectedCategories, value]);
    }
  };

  const handleMakeChange = (make: string) => {
    onMakeChange(make);
    onModelChange('');
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Garage Vehicle Info */}
      {activeVehicle && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2">
          <p className="text-xs font-medium text-accent">Garage Vehicle</p>
          <p className="mt-0.5 text-xs text-text-secondary">
            {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
          </p>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-3.5 w-3.5" />
          Clear All Filters
        </button>
      )}

      {/* Category Filter */}
      <div>
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex w-full items-center justify-between py-2 font-display text-sm font-semibold uppercase tracking-wider text-white"
        >
          Category
          {categoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {categoryOpen && (
          <div className="mt-2 space-y-1">
            {SHOP_CATEGORIES.map((cat) => (
              <label
                key={cat.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-light"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.value as ProductCategory)}
                  onChange={() => handleCategoryToggle(cat.value as ProductCategory)}
                  className="h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span className="text-sm text-text-secondary">{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Filter */}
      <div>
        <button
          onClick={() => setVehicleOpen(!vehicleOpen)}
          className="flex w-full items-center justify-between py-2 font-display text-sm font-semibold uppercase tracking-wider text-white"
        >
          Vehicle
          {vehicleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {vehicleOpen && (
          <div className="mt-2 space-y-3">
            {/* Make Select */}
            <div>
              <label htmlFor="filter-make" className="mb-1 block text-xs text-text-tertiary">
                Make
              </label>
              <select
                id="filter-make"
                value={selectedMake}
                onChange={(e) => handleMakeChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Select */}
            <div>
              <label htmlFor="filter-model" className="mb-1 block text-xs text-text-tertiary">
                Model
              </label>
              <select
                id="filter-model"
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                disabled={!selectedMake}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white disabled:opacity-50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">All Models</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-border-light lg:hidden"
      >
        <Filter className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold">
            {selectedCategories.length + (selectedMake ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile Filter Panel */}
      {isMobileOpen && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 lg:hidden">
          {filterContent}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden w-64 shrink-0 lg:block',
          'sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto'
        )}
      >
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
            Filters
          </h2>
          {filterContent}
        </div>
      </aside>
    </>
  );
}
