'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { cn, formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, handleKeyDown]);

  const emptyCart = (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <ShoppingBag className="mb-4 h-16 w-16 text-text-tertiary" />
      <h3 className="font-display text-lg font-bold uppercase text-white">
        Your Cart is Empty
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        Browse our shop to find performance parts for your build.
      </p>
      <Link
        href="/shop"
        onClick={closeCart}
        className="mt-6 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
      >
        Shop Now
      </Link>
    </div>
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-overlay"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-background"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-text-secondary">
                    ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              emptyCart
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex gap-4 rounded-xl border border-border bg-surface p-3"
                      >
                        {/* Placeholder Image */}
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950"
                        >
                          <Eye className="h-6 w-6 text-white/20" />
                        </Link>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/shop/${item.slug}`}
                              onClick={closeCart}
                              className="text-sm font-semibold text-white transition-colors hover:text-accent"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-0.5 text-sm font-semibold text-accent">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-0 rounded-lg border border-border">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                                className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="flex h-8 w-8 items-center justify-center border-x border-border text-xs font-semibold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                                className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Line Total + Remove */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-white">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="text-text-tertiary transition-colors hover:text-error"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clear All */}
                  <button
                    onClick={clearCart}
                    className="mt-4 text-xs text-text-tertiary underline transition-colors hover:text-error"
                  >
                    Clear cart
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-border px-6 py-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Subtotal</span>
                    <span className="font-display text-lg font-bold text-white">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <p className="mb-5 text-xs text-text-tertiary">
                    Shipping and taxes calculated at checkout.
                  </p>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className={cn(
                        'flex items-center justify-center rounded-lg bg-accent py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover'
                      )}
                    >
                      Checkout
                    </Link>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="flex items-center justify-center rounded-lg border border-border py-3 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:border-border-light hover:text-white"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
