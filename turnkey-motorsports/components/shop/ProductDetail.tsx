'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Eye,
} from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useGarage } from '@/lib/garage-context';
import Badge from '@/components/ui/Badge';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const GRADIENT_MAP: Record<string, string> = {
  'engine-parts': 'from-red-700/50 via-red-950 to-neutral-900',
  'intake': 'from-orange-700/50 via-orange-950 to-neutral-900',
  'exhaust': 'from-rose-700/50 via-rose-950 to-neutral-900',
  'fuel-system': 'from-emerald-700/50 via-emerald-950 to-neutral-900',
  'forced-induction': 'from-violet-700/50 via-violet-950 to-neutral-900',
  'cooling': 'from-sky-700/50 via-sky-950 to-neutral-900',
  'drivetrain': 'from-zinc-600/50 via-zinc-900 to-neutral-900',
  'suspension': 'from-amber-700/50 via-amber-950 to-neutral-900',
  'apparel': 'from-neutral-600/50 via-neutral-800 to-neutral-900',
  'accessories': 'from-cyan-700/50 via-cyan-950 to-neutral-900',
};

type Tab = 'description' | 'specs' | 'fitment' | 'reviews';

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addItem, isInCart, openCart } = useCart();
  const { checkFitment, activeVehicle } = useGarage();
  const fitment = activeVehicle ? checkFitment(product) : null;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const gradient = GRADIENT_MAP[product.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900';
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  const tabs: { value: Tab; label: string }[] = [
    { value: 'description', label: 'Description' },
    { value: 'specs', label: 'Specs' },
    { value: 'fitment', label: 'Fitment' },
    { value: 'reviews', label: `Reviews (${product.reviews.length})` },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/" className="transition-colors hover:text-white">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="transition-colors hover:text-white">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/shop?category=${product.category}`}
          className="transition-colors hover:text-white"
        >
          {product.subcategory}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-text-secondary">{product.name}</span>
      </nav>

      {/* Fitment Banner */}
      {fitment === 'fits' && activeVehicle && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3">
          <Shield className="h-5 w-5 shrink-0 text-success" />
          <p className="text-sm text-success">
            This part fits your {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
          </p>
        </div>
      )}
      {fitment === 'does-not-fit' && activeVehicle && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3">
          <Shield className="h-5 w-5 shrink-0 text-warning" />
          <p className="text-sm text-warning">
            This part may not fit your {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}. Check the fitment tab below.
          </p>
        </div>
      )}
      {fitment === 'universal' && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-3">
          <Shield className="h-5 w-5 shrink-0 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            Universal fit — compatible with all vehicles
          </p>
        </div>
      )}

      {/* Product Top Section */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div
            className={cn(
              'relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br',
              gradient
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="h-16 w-16 text-white/20" />
            </div>
            {product.onSale && (
              <div className="absolute left-4 top-4">
                <Badge variant="accent">Sale</Badge>
              </div>
            )}
            {product.isNew && (
              <div className="absolute left-4 top-4">
                <Badge variant="success">New</Badge>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="mt-4 flex gap-3">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-lg bg-gradient-to-br transition-all sm:h-20 sm:w-20',
                  gradient,
                  idx === selectedImage
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                    : 'opacity-60 hover:opacity-100'
                )}
                aria-label={`View image ${idx + 1}`}
              >
                <div className="flex h-full items-center justify-center">
                  <Eye className="h-4 w-4 text-white/30" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {product.subcategory}
          </p>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          {product.reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.round(averageRating)
                        ? 'fill-accent text-accent'
                        : 'text-text-tertiary'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {averageRating.toFixed(1)} ({product.reviews.length} review
                {product.reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="font-display text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-text-tertiary line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <Badge variant="accent">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </Badge>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {product.shortDescription}
          </p>

          {/* Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-0 rounded-lg border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-12 w-12 items-center justify-center border-x border-border text-sm font-semibold text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-12 w-12 items-center justify-center text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200',
                inCart
                  ? 'bg-success/15 text-success'
                  : 'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]'
              )}
              aria-label={inCart ? 'View cart' : `Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-5 w-5" />
              {inCart ? 'Added — View Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div className="flex flex-col items-center text-center">
              <Truck className="mb-2 h-5 w-5 text-accent" />
              <span className="text-xs text-text-secondary">Free Shipping over $299</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="mb-2 h-5 w-5 text-accent" />
              <span className="text-xs text-text-secondary">Warranty Included</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="mb-2 h-5 w-5 text-accent" />
              <span className="text-xs text-text-secondary">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'shrink-0 border-b-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors',
                activeTab === tab.value
                  ? 'border-accent text-white'
                  : 'border-transparent text-text-secondary hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-sm leading-relaxed text-text-secondary">
                {product.description}
              </p>
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={cn(
                        idx % 2 === 0 ? 'bg-surface' : 'bg-surface-light'
                      )}
                    >
                      <td className="px-4 py-3 font-semibold text-white">{key}</td>
                      <td className="px-4 py-3 text-text-secondary">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Fitment Tab */}
          {activeTab === 'fitment' && (
            <>
              {product.fitment.length === 0 ? (
                <p className="text-sm text-text-secondary">
                  This product is universal — no specific vehicle fitment required.
                </p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface">
                        <th className="px-4 py-3 text-left font-semibold text-white">Make</th>
                        <th className="px-4 py-3 text-left font-semibold text-white">Model</th>
                        <th className="px-4 py-3 text-left font-semibold text-white">Years</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.fitment.map((f, idx) => {
                        const isMatch = activeVehicle
                          && f.make === activeVehicle.make
                          && activeVehicle.model.startsWith(f.model)
                          && activeVehicle.year >= f.yearStart
                          && activeVehicle.year <= f.yearEnd;

                        return (
                          <tr
                            key={`${f.make}-${f.model}-${idx}`}
                            className={cn(
                              idx % 2 === 0 ? 'bg-surface-light' : 'bg-surface',
                              isMatch && 'border-l-2 border-l-success',
                            )}
                          >
                            <td className={cn('px-4 py-3', isMatch ? 'text-success' : 'text-text-secondary')}>{f.make}</td>
                            <td className={cn('px-4 py-3', isMatch ? 'text-success' : 'text-text-secondary')}>{f.model}</td>
                            <td className={cn('px-4 py-3', isMatch ? 'text-success' : 'text-text-secondary')}>
                              {f.yearStart}–{f.yearEnd}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-text-secondary">No reviews yet. Be the first to review this product.</p>
              ) : (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {review.customerName}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'h-3 w-3',
                                    i < review.rating
                                      ? 'fill-accent text-accent'
                                      : 'text-text-tertiary'
                                  )}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="success" size="sm">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-text-tertiary">{review.date}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {review.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-border pt-16">
          <h2 className="mb-8 font-display text-2xl font-bold uppercase tracking-wide text-white">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.slice(0, 4).map((rp) => (
              <ProductCard key={rp.id} product={rp} layout="grid" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
