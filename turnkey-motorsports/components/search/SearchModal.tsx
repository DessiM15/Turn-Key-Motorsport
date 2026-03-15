'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ShoppingBag,
  Wrench,
  Zap,
  HelpCircle,
  BookOpen,
  Car,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  search,
  hasResults,
  totalResults,
  CATEGORY_LABELS,
  type SearchCategory,
  type GroupedResults,
} from '@/lib/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<SearchCategory, typeof ShoppingBag> = {
  products: ShoppingBag,
  packages: Zap,
  services: Wrench,
  faq: HelpCircle,
  blog: BookOpen,
  builds: Car,
};

const CATEGORY_ORDER: SearchCategory[] = ['products', 'packages', 'services', 'faq', 'blog', 'builds'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResults | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(null);
      // Small delay to allow animation
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl+K to open, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search as user types (debounced)
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      return;
    }

    const timer = setTimeout(() => {
      setResults(search(query));
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const showResults = results !== null;
  const hasAny = results ? hasResults(results) : false;
  const total = results ? totalResults(results) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-text-tertiary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, services, FAQ, builds..."
            className="flex-1 bg-transparent text-base text-white placeholder:text-text-tertiary focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="shrink-0 rounded-lg p-1 text-text-tertiary transition-colors hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden shrink-0 rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-text-tertiary sm:inline">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!showResults && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-text-tertiary">
                Start typing to search across the entire site
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['cam', 'exhaust', 'LS3', 'tuning', 'Camaro'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && !hasAny && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-text-secondary">
                No results for <span className="font-semibold text-white">&ldquo;{query}&rdquo;</span>
              </p>
              <p className="mt-2 text-xs text-text-tertiary">
                Try a different search or{' '}
                <button
                  onClick={onClose}
                  className="font-semibold text-accent hover:underline"
                >
                  chat with us
                </button>
                {' '}for help.
              </p>
            </div>
          )}

          {showResults && hasAny && (
            <div className="py-2">
              {/* Result count */}
              <p className="px-5 py-2 text-xs text-text-tertiary">
                {total} result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>

              {CATEGORY_ORDER.map((cat) => {
                const group = results[cat];
                if (group.length === 0) return null;

                const Icon = CATEGORY_ICONS[cat];

                return (
                  <div key={cat} className="mt-1">
                    {/* Category Header */}
                    <div className="flex items-center gap-2 px-5 py-2">
                      <Icon className="h-3.5 w-3.5 text-text-tertiary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        {CATEGORY_LABELS[cat]}
                      </span>
                    </div>

                    {/* Results */}
                    {group.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        onClick={handleResultClick}
                        className="group flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-surface"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white group-hover:text-accent">
                            {highlightMatch(result.title, query)}
                          </p>
                          <p className="truncate text-xs text-text-tertiary">
                            {result.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <div className="flex items-center gap-3 text-[10px] text-text-tertiary">
            <span className="hidden sm:inline">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono">↑↓</kbd> navigate
            </span>
            <span className="hidden sm:inline">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono">↵</kbd> select
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-text-tertiary transition-colors hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Highlight matching text ---

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || query.trim().length < 2) return text;

  const terms = query.toLowerCase().trim().split(/\s+/);
  // Find first matching term position for highlight
  const lowerText = text.toLowerCase();
  let earliestIdx = -1;
  let matchLen = 0;

  for (const term of terms) {
    const idx = lowerText.indexOf(term);
    if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
      earliestIdx = idx;
      matchLen = term.length;
    }
  }

  if (earliestIdx === -1) return text;

  return (
    <>
      {text.slice(0, earliestIdx)}
      <span className="text-accent">{text.slice(earliestIdx, earliestIdx + matchLen)}</span>
      {text.slice(earliestIdx + matchLen)}
    </>
  );
}
