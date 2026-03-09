import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import ReviewForm from '@/components/testimonials/ReviewForm';
import { getAllTestimonials } from '@/lib/data/testimonials';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'See what our customers say about Turn-Key Motorsport. Real reviews from real builds.',
};

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();

  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(0,191,255,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Customer Reviews</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Testimonials
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Real reviews from real customers. See why builders trust Turn-Key Motorsport.
            </p>

            {/* Average Rating */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < Math.round(averageRating)
                        ? 'fill-accent text-accent'
                        : 'text-text-tertiary'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {averageRating.toFixed(1)} average from {testimonials.length} reviews
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <Container className="py-16 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < testimonial.rating
                        ? 'fill-accent text-accent'
                        : 'text-text-tertiary'
                    )}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent">
                    {testimonial.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.customerName}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {testimonial.vehicle.year} {testimonial.vehicle.make} {testimonial.vehicle.model}
                    </p>
                  </div>
                </div>
                {testimonial.serviceType && (
                  <p className="mt-2 text-xs text-text-tertiary">
                    Service: {testimonial.serviceType}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Review Submission */}
      <section className="bg-surface-light py-16 lg:py-24">
        <Container>
          <SectionHeading
            title="Leave a Review"
            subtitle="Had work done with us? We would love to hear about your experience."
          />
          <ReviewForm />
        </Container>
      </section>
    </>
  );
}
