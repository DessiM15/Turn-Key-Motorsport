import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { getAllPackages, getPackageBySlug, getOtherPackages } from '@/lib/data/packages';
import { SITE_NAME } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import {
  ChevronRight,
  Check,
  ArrowRight,
  Eye,
  Phone,
} from 'lucide-react';

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packages = getAllPackages();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: 'Package Not Found' };

  return {
    title: `${pkg.name} ${pkg.hpTarget > 0 ? `(${pkg.hpTarget}HP)` : ''} Package | ${SITE_NAME}`,
    description: pkg.shortDescription,
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const otherPackages = getOtherPackages(slug);
  const isCustom = pkg.slug === 'custom';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(230,57,70,0.1),transparent_50%)]" />
        <Container className="relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/packages" className="transition-colors hover:text-white">Packages</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-secondary">{pkg.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-surface to-surface-light">
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="h-20 w-20 text-white/10" />
              </div>
              {pkg.featured && (
                <div className="absolute left-4 top-4">
                  <Badge variant="accent" size="md">Most Popular</Badge>
                </div>
              )}
            </div>

            {/* Package Info */}
            <div>
              {!isCustom && (
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-bold text-white">{pkg.hpTarget}</span>
                  <span className="font-display text-2xl font-bold uppercase text-accent">HP</span>
                </div>
              )}
              <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                {pkg.name}
              </h1>

              {/* Price */}
              <div className="mt-4">
                {isCustom ? (
                  <span className="font-display text-2xl font-bold text-accent">Contact for Quote</span>
                ) : (
                  <span className="font-display text-3xl font-bold text-white">
                    Starting at {formatPrice(pkg.price)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {pkg.description}
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services#booking"
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
                >
                  <Phone className="h-4 w-4" />
                  {isCustom ? 'Book Free Consultation' : 'Build My Package'}
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-border py-3 px-8 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-all hover:border-accent hover:text-accent"
                >
                  Call Us: (555) 123-4567
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Parts Included */}
            <section className="mb-12">
              <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-wide text-white">
                What&apos;s Included
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {pkg.partsIncluded.map((part) => (
                  <div
                    key={part}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-text-secondary">{part}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Specs Table */}
            <section className="mb-12">
              <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(pkg.specs).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={cn(idx % 2 === 0 ? 'bg-surface' : 'bg-surface-light')}
                      >
                        <td className="px-4 py-3 font-semibold text-white sm:w-1/3">{key}</td>
                        <td className="px-4 py-3 text-text-secondary">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Vehicle Platforms */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Compatible Platforms
              </h2>
              <ul className="space-y-2">
                {pkg.vehiclePlatforms.map((platform) => (
                  <li key={platform} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {platform}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-28 space-y-6">
              {/* Quick Summary */}
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                  Package Summary
                </h3>
                <dl className="space-y-3 text-sm">
                  {!isCustom && (
                    <>
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">Power Target</dt>
                        <dd className="font-semibold text-white">{pkg.hpTarget} HP / {pkg.torqueTarget} lb-ft</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">Starting Price</dt>
                        <dd className="font-semibold text-accent">{formatPrice(pkg.price)}</dd>
                      </div>
                    </>
                  )}
                  {pkg.specs['Installation Time'] && (
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Timeline</dt>
                      <dd className="font-semibold text-white">{pkg.specs['Installation Time']}</dd>
                    </div>
                  )}
                  {pkg.specs['Warranty'] && (
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Warranty</dt>
                      <dd className="font-semibold text-white">{pkg.specs['Warranty']}</dd>
                    </div>
                  )}
                </dl>
                <Link
                  href="/services#booking"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Other Packages */}
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                  Other Packages
                </h3>
                <div className="space-y-3">
                  {otherPackages.map((other) => (
                    <Link
                      key={other.id}
                      href={`/packages/${other.slug}`}
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition-all hover:border-border-light hover:bg-surface-light"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{other.name}</p>
                        <p className="text-xs text-text-tertiary">
                          {other.hpTarget > 0 ? `${other.hpTarget} HP` : 'Custom'}
                          {other.price > 0 ? ` — ${formatPrice(other.price)}` : ''}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-tertiary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
