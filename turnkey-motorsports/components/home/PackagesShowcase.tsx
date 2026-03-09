'use client';

import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { PACKAGE_SHOWCASE } from '@/lib/data/homepage';
import { formatPrice, cn } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ScrollReveal from './ScrollReveal';

export default function PackagesShowcase() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Engine Packages"
            subtitle="Turn-Key builds from 500HP to 1000HP+. Parts, labor, and dyno tuning — all included."
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGE_SHOWCASE.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.15}>
              <div
                className={cn(
                  'relative flex flex-col rounded-xl border p-6 transition-all duration-300 lg:p-8',
                  pkg.featured
                    ? 'border-accent bg-gradient-to-b from-accent/10 via-surface to-surface shadow-lg shadow-accent/10 md:-mt-4 md:mb-0'
                    : 'border-border bg-surface hover:border-border-light'
                )}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* HP Target */}
                <div className="mb-4 flex items-baseline gap-2">
                  <span className={cn(
                    'font-display text-5xl font-bold tracking-tight lg:text-6xl',
                    pkg.featured ? 'text-accent' : 'text-white'
                  )}>
                    {pkg.hpTarget}
                  </span>
                  <span className="font-display text-lg font-bold uppercase tracking-wider text-text-secondary">
                    HP
                  </span>
                </div>

                {/* Package Name */}
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  {pkg.name}
                </h3>

                {/* Price */}
                <p className="mt-2 text-2xl font-bold text-white">
                  {formatPrice(pkg.price)}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {pkg.shortDescription}
                </p>

                {/* Specs */}
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={pkg.href} className="mt-8 block">
                  <Button
                    variant={pkg.featured ? 'primary' : 'secondary'}
                    fullWidth
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
            >
              View All Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
