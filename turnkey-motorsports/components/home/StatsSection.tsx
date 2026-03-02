'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { HOMEPAGE_STATS } from '@/lib/data/homepage';
import Container from '@/components/ui/Container';

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const formattedCount = value >= 10000
    ? count.toLocaleString()
    : count.toString();

  return (
    <span ref={ref}>
      {formattedCount}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Trusted by Enthusiasts
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
            Proven on the Dyno
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {HOMEPAGE_STATS.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
