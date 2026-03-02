import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export default function Skeleton({
  className,
  variant = 'rectangular',
}: SkeletonProps) {
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4 w-3/4',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-light',
        variants[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
