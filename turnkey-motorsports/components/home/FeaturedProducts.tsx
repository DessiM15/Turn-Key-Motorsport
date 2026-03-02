'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '@/lib/data/homepage';
import { formatPrice } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import ScrollReveal from './ScrollReveal';

export default function FeaturedProducts() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Trending Now"
            subtitle="Our most popular parts and kits — handpicked by our build team."
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <Link
                href={product.href}
                className="group block overflow-hidden rounded-xl border border-border bg-surface-light transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Image placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-accent/50" />
                    </div>
                  </div>
                  {product.badge && (
                    <div className="absolute left-3 top-3">
                      <Badge
                        variant={product.badge === 'SALE' ? 'accent' : product.badge === 'NEW' ? 'success' : 'warning'}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white line-clamp-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-text-tertiary line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
