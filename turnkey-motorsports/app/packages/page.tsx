import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { getAllPackages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';
import {
  Check,
  ArrowRight,
  Wrench,
  Shield,
  Gauge,
  Award,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engine Packages',
  description:
    'Turnkey engine build packages from 500HP to 1000HP+. Complete builds with parts, labor, and dyno tuning included.',
};

const TRUST_ITEMS = [
  {
    icon: Wrench,
    title: 'Complete Builds',
    description: 'Parts, labor, and dyno tuning — all included in one price. No hidden costs.',
  },
  {
    icon: Shield,
    title: 'Warranty Backed',
    description: 'Every package comes with a powertrain warranty. We stand behind our work.',
  },
  {
    icon: Gauge,
    title: 'Dyno Verified',
    description: 'Every build is dyno-tested and tuned. You get printed sheets with real numbers.',
  },
  {
    icon: Award,
    title: '500+ Builds',
    description: 'Over 500 completed engine builds. We have done this before — a lot.',
  },
];

export default function PackagesPage() {
  const packages = getAllPackages();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(230,57,70,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Turnkey Engine Packages</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Pick Your Power Level
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Complete engine builds with parts, professional assembly, and custom dyno tuning — all in one package. Choose your HP target and we handle the rest.
            </p>
          </div>
        </Container>
      </section>

      {/* Package Cards */}
      <Container className="py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => {
            const isCustom = pkg.slug === 'custom';
            const isFeatured = pkg.featured;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg lg:p-8 ${
                  isFeatured
                    ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10 hover:shadow-accent/20'
                    : 'border-border bg-surface hover:border-border-light hover:shadow-accent/5'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" size="md">Most Popular</Badge>
                  </div>
                )}

                {/* HP Target */}
                {!isCustom ? (
                  <div className="mb-4">
                    <span className="font-display text-5xl font-bold text-white lg:text-6xl">
                      {pkg.hpTarget}
                    </span>
                    <span className="ml-1 font-display text-xl font-bold uppercase text-accent">HP</span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="font-display text-3xl font-bold text-white lg:text-4xl">
                      Custom
                    </span>
                  </div>
                )}

                <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  {pkg.name}
                </h2>

                {/* Price */}
                <div className="mt-3">
                  {isCustom ? (
                    <span className="font-display text-xl font-bold text-accent">Contact for Quote</span>
                  ) : (
                    <span className="font-display text-2xl font-bold text-white">
                      Starting at {formatPrice(pkg.price)}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {pkg.shortDescription}
                </p>

                {/* Highlights */}
                <ul className="mt-6 flex-1 space-y-2">
                  {pkg.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isCustom ? (
                  <Link
                    href="/services#booking"
                    className="mt-6 flex items-center justify-center gap-2 rounded-lg border-2 border-accent py-3 text-sm font-semibold uppercase tracking-wide text-accent transition-all hover:bg-accent hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Book Free Consultation
                  </Link>
                ) : (
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className={`mt-6 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold uppercase tracking-wide transition-all ${
                      isFeatured
                        ? 'bg-accent text-white hover:bg-accent-hover'
                        : 'border-2 border-accent text-accent hover:bg-accent hover:text-white'
                    }`}
                  >
                    View Package
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Why Choose Section */}
        <div className="mt-24">
          <SectionHeading
            title="Why Choose Our Packages"
            subtitle="Everything included. No surprises."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-surface p-6 text-center transition-all hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
              >
                <item.icon className="mx-auto mb-4 h-8 w-8 text-accent" />
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 rounded-2xl border border-border bg-gradient-to-r from-accent/10 to-transparent p-8 text-center lg:p-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            Not Sure Which Package?
          </h2>
          <p className="mt-3 text-text-secondary">
            Book a free consultation and we will help you find the right build for your goals and budget.
          </p>
          <Link
            href="/services#booking"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </>
  );
}
