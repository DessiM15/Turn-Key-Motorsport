'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';
import type { Build, BuildCategory } from '@/lib/types';
import { getAllBuilds, getAllBuildMakes } from '@/lib/data/builds';
import { BUILD_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

const GRADIENT_MAP: Record<string, string> = {
  street: 'from-red-700/50 via-red-950 to-neutral-900',
  drag: 'from-purple-700/50 via-purple-950 to-neutral-900',
  track: 'from-orange-700/50 via-orange-950 to-neutral-900',
  'daily-driver': 'from-emerald-700/50 via-emerald-950 to-neutral-900',
  'full-build': 'from-violet-700/50 via-violet-950 to-neutral-900',
};

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState<BuildCategory | 'all'>('all');
  const [selectedMake, setSelectedMake] = useState('');

  const allBuilds = useMemo(() => getAllBuilds(), []);
  const makes = useMemo(() => getAllBuildMakes(), []);

  const filteredBuilds = useMemo(() => {
    let results = allBuilds;

    if (selectedCategory !== 'all') {
      results = results.filter((b) => b.category === selectedCategory);
    }

    if (selectedMake) {
      results = results.filter((b) => b.vehicle.make === selectedMake);
    }

    return results;
  }, [allBuilds, selectedCategory, selectedMake]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedMake('');
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors',
              selectedCategory === 'all'
                ? 'bg-accent text-white'
                : 'border border-border text-text-secondary hover:border-border-light hover:text-white'
            )}
          >
            All Builds
          </button>
          {BUILD_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as BuildCategory)}
              className={cn(
                'rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors',
                selectedCategory === cat.value
                  ? 'bg-accent text-white'
                  : 'border border-border text-text-secondary hover:border-border-light hover:text-white'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label="Filter by vehicle make"
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredBuilds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Eye className="mb-4 h-16 w-16 text-text-tertiary" />
          <h3 className="font-display text-xl font-bold uppercase text-white">No Builds Found</h3>
          <p className="mt-2 text-sm text-text-secondary">
            No builds match your current filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-6 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBuilds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Build Card ---

interface BuildCardProps {
  build: Build;
}

function BuildCard({ build }: BuildCardProps) {
  const gradient = GRADIENT_MAP[build.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900';
  const hpGain = build.hpAfter - build.hpBefore;

  return (
    <Link
      href={`/gallery/${build.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Image */}
      <div className={cn('relative aspect-[16/10] bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Eye className="h-10 w-10 text-white/20 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="absolute left-3 top-3">
          <Badge variant="accent">{build.category.replace('-', ' ')}</Badge>
        </div>
        {build.featured && (
          <div className="absolute right-3 top-3">
            <Badge variant="warning">Featured</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-text-tertiary">
          {build.vehicle.year} {build.vehicle.make} {build.vehicle.model}
        </p>
        <h3 className="mt-1 font-display text-base font-bold uppercase tracking-wide text-white transition-colors group-hover:text-accent">
          {build.title}
        </h3>

        {/* HP Gain */}
        <div className="mt-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm text-text-secondary">
            {build.hpBefore > 0 ? (
              <>
                {build.hpBefore} → <span className="font-bold text-white">{build.hpAfter} WHP</span>
                <span className="ml-1 text-accent">(+{hpGain})</span>
              </>
            ) : (
              <span className="font-bold text-white">{build.hpAfter} WHP</span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
