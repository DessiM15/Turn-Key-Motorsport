'use client';

import Link from 'next/link';
import { Heart, Eye, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { getAllProducts } from '@/lib/data/products';
import { formatPrice, cn } from '@/lib/utils';

export default function WishlistTab() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addItem, isInCart, openCart } = useCart();
  const allProducts = getAllProducts();
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <Heart className="mx-auto mb-4 h-10 w-10 text-text-tertiary" />
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
          Your Wishlist is Empty
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Browse the shop and click the heart icon to save products for later.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
          Wishlist
        </h3>
        <span className="text-xs text-text-tertiary">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {wishlistProducts.map((product) => {
          const inCart = isInCart(product.id);

          return (
            <div key={product.id} className="rounded-xl border border-border bg-surface overflow-hidden">
              {/* Image */}
              <Link href={`/shop/${product.slug}`} className="block">
                <div className="relative aspect-[3/2] bg-gradient-to-br from-neutral-700/50 to-neutral-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white/20" />
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link href={`/shop/${product.slug}`}>
                  <h4 className="text-sm font-semibold text-white hover:text-accent transition-colors">
                    {product.name}
                  </h4>
                </Link>
                <p className="mt-1 text-xs text-text-tertiary">{product.subcategory}</p>
                <p className="mt-2 font-display text-lg font-bold text-white">
                  {formatPrice(product.price)}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      if (inCart) {
                        openCart();
                      } else {
                        addItem(product);
                        openCart();
                      }
                    }}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold uppercase tracking-wide transition-all',
                      inCart
                        ? 'bg-success/15 text-success'
                        : 'bg-accent text-white hover:bg-accent-hover',
                    )}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center justify-center rounded-lg bg-surface-light px-3 py-2 text-text-tertiary transition-colors hover:text-error"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
