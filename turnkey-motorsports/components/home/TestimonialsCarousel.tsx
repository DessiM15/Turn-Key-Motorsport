'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { HOMEPAGE_TESTIMONIALS } from '@/lib/data/homepage';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import ScrollReveal from './ScrollReveal';
import { cn } from '@/lib/utils';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = HOMEPAGE_TESTIMONIALS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const currentTestimonial = HOMEPAGE_TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Real reviews from real builds."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Testimonial */}
            <div className="rounded-xl border border-border bg-surface p-8 text-center md:p-12">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < currentTestimonial.rating
                        ? 'fill-accent text-accent'
                        : 'text-border'
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-lg leading-relaxed text-white md:text-xl">
                &ldquo;{currentTestimonial.text}&rdquo;
              </blockquote>

              {/* Customer Info */}
              <div className="mt-6">
                <p className="font-semibold text-white">
                  {currentTestimonial.customerName}
                </p>
                <p className="text-sm text-text-secondary">
                  {currentTestimonial.vehicleYear} {currentTestimonial.vehicleMake}{' '}
                  {currentTestimonial.vehicleModel}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full border border-border bg-surface p-2 text-text-secondary transition-all hover:border-accent hover:text-white md:-translate-x-12"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full border border-border bg-surface p-2 text-text-secondary transition-all hover:border-accent hover:text-white md:translate-x-12"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {HOMEPAGE_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === currentIndex
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-border hover:bg-text-tertiary'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
