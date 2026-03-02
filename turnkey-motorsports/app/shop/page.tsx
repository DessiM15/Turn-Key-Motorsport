import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ShopContent from '@/components/shop/ShopContent';
import Skeleton from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Shop Performance Parts',
  description:
    'Browse our full catalog of performance parts, engine components, and apparel for all makes and models.',
};

const CATEGORY_TILES = [
  { id: 'engine-parts', name: 'Engine Parts', gradient: 'from-red-950/80 to-neutral-950', href: '/shop?category=engine-parts' },
  { id: 'intake', name: 'Intake & Exhaust', gradient: 'from-orange-950/80 to-neutral-950', href: '/shop?category=intake,exhaust' },
  { id: 'fuel-system', name: 'Fuel Systems', gradient: 'from-amber-950/80 to-neutral-950', href: '/shop?category=fuel-system' },
  { id: 'forced-induction', name: 'Forced Induction', gradient: 'from-rose-950/80 to-neutral-950', href: '/shop?category=forced-induction' },
  { id: 'drivetrain', name: 'Drivetrain', gradient: 'from-zinc-800/80 to-neutral-950', href: '/shop?category=drivetrain' },
  { id: 'apparel', name: 'Apparel & Merch', gradient: 'from-neutral-800/80 to-neutral-950', href: '/shop?category=apparel' },
];

export default function ShopPage() {
  return (
    <Container className="py-16 lg:py-24">
      {/* Hero / Category Tiles */}
      <SectionHeading
        title="Shop Parts"
        subtitle="Performance parts and accessories for all makes and models."
      />

      <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORY_TILES.map((tile) => (
          <Link
            key={tile.id}
            href={tile.href}
            className={`group flex aspect-[4/3] items-end rounded-xl bg-gradient-to-br p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10 lg:aspect-[3/4] ${tile.gradient}`}
          >
            <span className="font-display text-sm font-bold uppercase tracking-wider text-white transition-colors group-hover:text-accent sm:text-base">
              {tile.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Shop Content (filters, toolbar, products, pagination) */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </Container>
  );
}
