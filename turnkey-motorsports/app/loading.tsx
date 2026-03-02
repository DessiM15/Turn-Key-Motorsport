import Container from '@/components/ui/Container';

export default function Loading() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Title skeleton */}
        <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-surface-light" />
        <div className="mx-auto h-5 w-96 animate-pulse rounded bg-surface-light" />

        {/* Content skeletons */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="aspect-[16/9] animate-pulse bg-surface-light" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-light" />
                <div className="h-3 w-full animate-pulse rounded bg-surface-light" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-surface-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
