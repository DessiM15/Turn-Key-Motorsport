import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface transition-all duration-200',
        hover && 'hover:border-border-light hover:shadow-lg hover:shadow-accent/5',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
