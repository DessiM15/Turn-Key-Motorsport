'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useGarage } from '@/lib/garage-context';
import Badge from '@/components/ui/Badge';
import WishlistButton from '@/components/shop/WishlistButton';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
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

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const { checkFitment, activeVehicle } = useGarage();
  const fitment = activeVehicle ? checkFitment(product) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart(product.id)) {
      openCart();
      return;
    }
    addItem(product);
    openCart();
  };

  const gradient = GRADIENT_MAP[product.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900';

  const productBadge = product.onSale
    ? <Badge variant="accent">Sale</Badge>
    : product.isNew
      ? <Badge variant="success">New</Badge>
      : product.featured
        ? <Badge variant="warning">Popular</Badge>
        : null;

  const fitmentBadge = fitment === 'fits'
    ? <Badge variant="success" size="sm">Fits Your Vehicle</Badge>
    : fitment === 'universal'
      ? <Badge variant="neutral" size="sm">Universal Fit</Badge>
      : null;

  const inCart = isInCart(product.id);

  if (layout === 'list') {
    return (
      <Link
        href={`/shop/${product.slug}`}
        className="group flex gap-4 rounded-xl border border-border bg-surface transition-all duration-200 hover:border-border-light hover:shadow-lg hover:shadow-accent/5 sm:gap-6"
      >
        {/* Image */}
        <div className={cn('relative h-40 w-40 shrink-0 overflow-hidden rounded-l-xl bg-gradient-to-br sm:h-48 sm:w-48', gradient)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="h-8 w-8 text-white/20 transition-transform duration-200 group-hover:scale-110" />
          </div>
          {productBadge && (
            <div className="absolute left-2 top-2">{productBadge}</div>
          )}
          <div className="absolute right-2 top-2">
            <WishlistButton productId={product.id} size="sm" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between py-4 pr-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              {product.subcategory}
            </p>
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white transition-colors group-hover:text-accent sm:text-lg">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
              {product.shortDescription}
            </p>
            {fitmentBadge && <div className="mt-1.5">{fitmentBadge}</div>}
            {fitment === 'does-not-fit' && (
              <p className="mt-1 text-xs text-warning">May not fit your vehicle</p>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-text-tertiary line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200',
                inCart
                  ? 'bg-success/15 text-success'
                  : 'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]'
              )}
              aria-label={inCart ? 'View cart' : `Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
              {inCart ? 'In Cart' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout (default)
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Image */}
      <div className={cn('relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Eye className="h-10 w-10 text-white/20 transition-transform duration-300 group-hover:scale-110" />
        </div>
        {productBadge && (
          <div className="absolute left-3 top-3">{productBadge}</div>
        )}
        <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <WishlistButton productId={product.id} size="sm" />
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">
          {product.subcategory}
        </p>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors group-hover:text-accent sm:text-base">
          {product.name}
        </h3>
        {fitmentBadge && <div className="mt-1.5">{fitmentBadge}</div>}
        {fitment === 'does-not-fit' && (
          <p className="mt-1 text-xs text-warning">May not fit your vehicle</p>
        )}

        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-text-tertiary line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={cn(
              'mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200',
              inCart
                ? 'bg-success/15 text-success'
                : 'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]'
            )}
            aria-label={inCart ? 'View cart' : `Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
