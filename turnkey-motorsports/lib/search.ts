// Client-side search across all mock data sources.
// DEMO: Replace with Algolia or similar when real product catalog exists.

import { getAllProducts } from '@/lib/data/products';
import { getAllServices } from '@/lib/data/services';
import { getAllPackages } from '@/lib/data/packages';
import { getAllFAQs } from '@/lib/data/faq';
import { getAllBlogPosts } from '@/lib/data/blog';
import { getAllBuilds } from '@/lib/data/builds';

// --- Types ---

export type SearchCategory = 'products' | 'services' | 'packages' | 'faq' | 'blog' | 'builds';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: SearchCategory;
}

export interface GroupedResults {
  products: SearchResult[];
  packages: SearchResult[];
  services: SearchResult[];
  faq: SearchResult[];
  blog: SearchResult[];
  builds: SearchResult[];
}

export const CATEGORY_LABELS: Record<SearchCategory, string> = {
  products: 'Products',
  packages: 'Vehicle Packages',
  services: 'Services',
  faq: 'FAQ',
  blog: 'Blog',
  builds: 'Builds',
};

// --- Search Index ---
// Built once on first search call, then cached.

interface IndexEntry {
  id: string;
  searchText: string;
  result: SearchResult;
}

let cachedIndex: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  if (cachedIndex) return cachedIndex;

  const entries: IndexEntry[] = [];

  // Products
  for (const p of getAllProducts()) {
    entries.push({
      id: p.id,
      searchText: [p.name, p.shortDescription, p.description, p.category, p.subcategory].join(' ').toLowerCase(),
      result: {
        id: p.id,
        title: p.name,
        subtitle: p.subcategory,
        href: `/shop/${p.slug}`,
        category: 'products',
      },
    });
  }

  // Engine Packages
  for (const pkg of getAllPackages()) {
    entries.push({
      id: pkg.id,
      searchText: [pkg.name, pkg.shortDescription, pkg.description, `${pkg.hpTarget}hp`, ...pkg.vehiclePlatforms].join(' ').toLowerCase(),
      result: {
        id: pkg.id,
        title: pkg.name,
        subtitle: `${pkg.hpTarget}+ HP`,
        href: `/packages/${pkg.slug}`,
        category: 'packages',
      },
    });
  }

  // Services
  for (const s of getAllServices()) {
    entries.push({
      id: s.id,
      searchText: [s.name, s.shortDescription, s.description].join(' ').toLowerCase(),
      result: {
        id: s.id,
        title: s.name,
        subtitle: s.shortDescription,
        href: `/services#${s.slug}`,
        category: 'services',
      },
    });
  }

  // FAQ
  for (const f of getAllFAQs()) {
    entries.push({
      id: f.id,
      searchText: [f.question, f.answer, f.category].join(' ').toLowerCase(),
      result: {
        id: f.id,
        title: f.question,
        subtitle: f.category.replace(/-/g, ' '),
        href: `/faq#${f.id}`,
        category: 'faq',
      },
    });
  }

  // Blog
  for (const post of getAllBlogPosts()) {
    entries.push({
      id: post.id,
      searchText: [post.title, post.excerpt, post.content, ...post.tags, post.category].join(' ').toLowerCase(),
      result: {
        id: post.id,
        title: post.title,
        subtitle: post.excerpt,
        href: `/blog/${post.slug}`,
        category: 'blog',
      },
    });
  }

  // Builds
  for (const b of getAllBuilds()) {
    entries.push({
      id: b.id,
      searchText: [b.title, b.vehicle.make, b.vehicle.model, `${b.vehicle.year}`, b.category, b.writeup, ...b.modsPerformed].join(' ').toLowerCase(),
      result: {
        id: b.id,
        title: b.title,
        subtitle: `${b.vehicle.year} ${b.vehicle.make} ${b.vehicle.model} — ${b.hpAfter}HP`,
        href: `/gallery/${b.slug}`,
        category: 'builds',
      },
    });
  }

  cachedIndex = entries;
  return entries;
}

// --- Search Function ---

export function search(query: string, maxPerCategory = 5): GroupedResults {
  const results: GroupedResults = {
    products: [],
    packages: [],
    services: [],
    faq: [],
    blog: [],
    builds: [],
  };

  if (!query || query.trim().length < 2) return results;

  const index = buildIndex();
  const terms = query.toLowerCase().trim().split(/\s+/);

  for (const entry of index) {
    // All terms must match (AND logic)
    const matches = terms.every((term) => entry.searchText.includes(term));
    if (matches && results[entry.result.category].length < maxPerCategory) {
      results[entry.result.category].push(entry.result);
    }
  }

  return results;
}

export function hasResults(results: GroupedResults): boolean {
  return Object.values(results).some((group) => group.length > 0);
}

export function totalResults(results: GroupedResults): number {
  return Object.values(results).reduce((sum, group) => sum + group.length, 0);
}
