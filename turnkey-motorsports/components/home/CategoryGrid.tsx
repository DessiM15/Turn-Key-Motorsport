'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HOMEPAGE_CATEGORIES } from '@/lib/data/homepage';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import ScrollReveal from './ScrollReveal';

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Shop by Category"
            subtitle="Everything you need to build serious power."
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.1}>
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-xl border border-border transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div
                  className={`bg-gradient-to-br ${category.gradient} flex h-48 flex-col justify-end p-6 transition-transform duration-500 group-hover:scale-105`}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {category.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Shop Now <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
