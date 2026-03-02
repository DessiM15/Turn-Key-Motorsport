import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { getAllBuilds, getBuildBySlug } from '@/lib/data/builds';
import { SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Check,
  Eye,
  DollarSign,
} from 'lucide-react';

interface BuildPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const builds = getAllBuilds();
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BuildPageProps): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return { title: 'Build Not Found' };

  return {
    title: `${build.title} | ${SITE_NAME}`,
    description: `${build.vehicle.year} ${build.vehicle.make} ${build.vehicle.model} — ${build.hpBefore > 0 ? `${build.hpBefore} → ` : ''}${build.hpAfter} WHP. ${build.modsPerformed.length} modifications.`,
  };
}

const GRADIENT_MAP: Record<string, string> = {
  street: 'from-red-700/50 via-red-950 to-neutral-900',
  drag: 'from-purple-700/50 via-purple-950 to-neutral-900',
  track: 'from-orange-700/50 via-orange-950 to-neutral-900',
  'daily-driver': 'from-emerald-700/50 via-emerald-950 to-neutral-900',
  'full-build': 'from-violet-700/50 via-violet-950 to-neutral-900',
};

export default async function BuildDetailPage({ params }: BuildPageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);

  if (!build) {
    notFound();
  }

  const gradient = GRADIENT_MAP[build.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900';
  const hpGain = build.hpAfter - build.hpBefore;
  const torqueGain = build.torqueAfter - build.torqueBefore;

  return (
    <>
      {/* Hero */}
      <section className={cn('relative overflow-hidden bg-gradient-to-br py-16 lg:py-24', gradient)}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <Container className="relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/gallery" className="transition-colors hover:text-white">Gallery</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-secondary">{build.title}</span>
          </nav>

          <Badge variant="accent">{build.category.replace('-', ' ')}</Badge>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            {build.title}
          </h1>
          <p className="mt-2 text-lg text-text-secondary">
            {build.vehicle.year} {build.vehicle.make} {build.vehicle.model}
          </p>

          {/* HP / Torque Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="rounded-xl border border-border bg-surface/80 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase text-text-tertiary">HP Before</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {build.hpBefore > 0 ? build.hpBefore : 'N/A'}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase text-accent">HP After</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{build.hpAfter}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/80 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase text-text-tertiary">Torque Before</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {build.torqueBefore > 0 ? build.torqueBefore : 'N/A'}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase text-accent">Torque After</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{build.torqueAfter}</p>
            </div>
          </div>

          {/* Gains Summary */}
          {build.hpBefore > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-accent">
                <TrendingUp className="h-4 w-4" />
                +{hpGain} WHP Gained
              </div>
              <div className="flex items-center gap-2 text-sm text-accent">
                <TrendingUp className="h-4 w-4" />
                +{torqueGain} lb-ft Gained
              </div>
              {build.costRange && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <DollarSign className="h-4 w-4" />
                  Build Cost: {build.costRange}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-12 grid gap-4 sm:grid-cols-2">
              {build.images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br',
                    gradient
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="h-10 w-10 text-white/15" />
                  </div>
                </div>
              ))}
            </div>

            {/* Writeup */}
            <section className="mb-12">
              <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Build Story
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary">
                {build.writeup}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-28 space-y-6">
              {/* Mods Performed */}
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                  Modifications Performed
                </h3>
                <ul className="space-y-2">
                  {build.modsPerformed.map((mod) => (
                    <li key={mod} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  Want a Build Like This?
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Book a free consultation and let us plan your build.
                </p>
                <Link
                  href="/services#booking"
                  className="mt-4 inline-flex rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Back Link */}
        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </div>
      </Container>
    </>
  );
}
