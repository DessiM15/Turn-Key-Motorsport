'use client';

import { useRef } from 'react';
import { motion, useInView, type Variant } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'fade-in-up';
  delay?: number;
  duration?: number;
  className?: string;
}

const animations: Record<string, { hidden: Variant; visible: Variant }> = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  'fade-in-up': {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { hidden, visible } = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: { duration, delay, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
