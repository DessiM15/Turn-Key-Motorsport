'use client';

import Link from 'next/link';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';

function statusVariant(status: OrderStatus): 'success' | 'accent' | 'warning' | 'neutral' {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'accent';
    case 'processing': return 'warning';
    case 'pending': return 'neutral';
    case 'cancelled': return 'neutral';
    default: return 'neutral';
  }
}

export default function OrdersTab() {
  const { account } = useAuth();
  const orders = account?.orderHistory ?? [];

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-text-tertiary" />
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
          No Orders Yet
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Your order history will appear here after your first purchase.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
        Order History
      </h3>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-text-tertiary" />
            <div>
              <p className="text-sm font-semibold text-white">#{order.orderNumber}</p>
              <p className="text-xs text-text-tertiary">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
                {' '}&middot;{' '}
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant(order.status)} size="sm">
              {order.status}
            </Badge>
            <p className="text-sm font-semibold text-white">{formatPrice(order.total)}</p>
            <ChevronRight className="h-4 w-4 text-text-tertiary" />
          </div>
        </div>
      ))}
    </div>
  );
}
