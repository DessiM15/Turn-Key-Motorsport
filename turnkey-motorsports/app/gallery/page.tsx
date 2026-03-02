import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import GalleryContent from '@/components/gallery/GalleryContent';

export const metadata: Metadata = {
  title: 'Builds Gallery',
  description:
    'See our completed builds — before and after HP numbers, mods performed, and full writeups.',
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(230,57,70,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Our Work</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Builds Gallery
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Real builds. Real numbers. Browse our completed projects with before &amp; after dyno data, mods performed, and full writeups.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <GalleryContent />
      </Container>
    </>
  );
}
