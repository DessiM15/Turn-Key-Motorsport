'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  steps: readonly string[];
}

export default function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-200',
                    isCompleted && 'border-accent bg-accent text-white',
                    isCurrent && 'border-accent bg-accent/15 text-accent',
                    !isCompleted && !isCurrent && 'border-border text-text-tertiary'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium tracking-wide',
                    isCurrent ? 'text-accent' : isCompleted ? 'text-text-secondary' : 'text-text-tertiary'
                  )}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    index < currentStep ? 'bg-accent' : 'bg-border'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm font-medium text-accent">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium text-text-secondary">
          {steps[currentStep]}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border sm:hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
