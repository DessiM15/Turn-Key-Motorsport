'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types';
import { getAllProducts } from '@/lib/data/products';
import ProductCard from './ProductCard';
import ShopFilters from './ShopFilters';
import ShopToolbar, { type SortOption } from './ShopToolbar';
import Pagination from './Pagination';

const PRODUCTS_PER_PAGE = 12;

export default function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filter state from URL
  const categoryParam = searchParams.get('category');
  const makeParam = searchParams.get('make') ?? '';
  const modelParam = searchParams.get('model') ?? '';
  const sortParam = (searchParams.get('sort') ?? 'featured') as SortOption;
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);
  const saleParam = searchParams.get('sale') === 'true';

  const initialCategories: ProductCategory[] = categoryParam
    ? (categoryParam.split(',') as ProductCategory[])
    : [];

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(initialCategories);
  const [selectedMake, setSelectedMake] = useState(makeParam);
  const [selectedModel, setSelectedModel] = useState(modelParam);
  const [sortBy, setSortBy] = useState<SortOption>(sortParam);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(pageParam);

  const allProducts = useMemo(() => getAllProducts(), []);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let results = allProducts;

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter((p) => selectedCategories.includes(p.category));
    }

    // Sale filter
    if (saleParam) {
      results = results.filter((p) => p.onSale);
    }

    // Vehicle make filter
    if (selectedMake) {
      results = results.filter((p) =>
        p.fitment.some((f) => f.make === selectedMake)
      );
    }

    // Vehicle model filter
    if (selectedModel) {
      results = results.filter((p) =>
        p.fitment.some((f) => f.model === selectedModel)
      );
    }

    return results;
  }, [allProducts, selectedCategories, selectedMake, selectedModel, saleParam]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginatedProducts = sortedProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  const hasActiveFilters = selectedCategories.length > 0 || !!selectedMake || !!selectedModel;

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value) sp.set(key, value);
      }
      const queryString = sp.toString();
      router.push(`/shop${queryString ? `?${queryString}` : ''}`, { scroll: false });
    },
    [router]
  );

  const handleCategoryChange = (categories: ProductCategory[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
    updateUrl({
      category: categories.join(','),
      make: selectedMake,
      model: selectedModel,
      sort: sortBy,
    });
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel('');
    setCurrentPage(1);
    updateUrl({
      category: selectedCategories.join(','),
      make,
      sort: sortBy,
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setCurrentPage(1);
    updateUrl({
      category: selectedCategories.join(','),
      make: selectedMake,
      model,
      sort: sortBy,
    });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedMake('');
    setSelectedModel('');
    setCurrentPage(1);
    router.push('/shop', { scroll: false });
  };

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Package className="mb-4 h-16 w-16 text-text-tertiary" />
      <h3 className="font-display text-xl font-bold uppercase text-white">No Products Found</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        No products match your current filters. Try adjusting your search criteria or clear all filters.
      </p>
      <button
        onClick={handleClearAll}
        className="mt-6 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div>
      {/* Mobile Filters */}
      <div className="mb-6 lg:hidden">
        <ShopFilters
          selectedCategories={selectedCategories}
          selectedMake={selectedMake}
          selectedModel={selectedModel}
          onCategoryChange={handleCategoryChange}
          onMakeChange={handleMakeChange}
          onModelChange={handleModelChange}
          onClearAll={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <ShopFilters
          selectedCategories={selectedCategories}
          selectedMake={selectedMake}
          selectedModel={selectedModel}
          onCategoryChange={handleCategoryChange}
          onMakeChange={handleMakeChange}
          onModelChange={handleModelChange}
          onClearAll={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Products */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6">
            <ShopToolbar
              productCount={sortedProducts.length}
              layout={layout}
              sortBy={sortBy}
              onLayoutChange={setLayout}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Product Grid / List */}
          {paginatedProducts.length === 0 ? (
            emptyState
          ) : layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {paginatedProducts.length > 0 && (
            <div className="mt-10">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
