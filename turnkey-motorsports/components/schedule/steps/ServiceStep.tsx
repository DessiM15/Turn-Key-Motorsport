'use client';

import { SERVICE_NAMES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ServiceStepProps {
  servicesRequested: string[];
  projectDescription: string;
  onToggleService: (service: string) => void;
  onDescriptionChange: (value: string) => void;
  errors: Record<string, string>;
}

export default function ServiceStep({
  servicesRequested,
  projectDescription,
  onToggleService,
  onDescriptionChange,
  errors,
}: ServiceStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-wide text-white">
          What Do You Need?
        </h3>
        <p className="mb-4 text-sm text-text-secondary">
          Select all services that apply to your build.
        </p>
        {errors.servicesRequested && (
          <p className="mb-3 text-sm text-error" role="alert">{errors.servicesRequested}</p>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {SERVICE_NAMES.map((service) => {
            const isChecked = servicesRequested.includes(service);
            return (
              <label
                key={service}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors duration-200',
                  isChecked
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-border hover:border-border-light hover:bg-surface-light text-text-secondary'
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleService(service)}
                  className="h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span className="text-sm">{service}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-2 block text-sm font-medium text-text-secondary"
        >
          Tell Us About Your Project
        </label>
        <textarea
          id="project-description"
          rows={4}
          value={projectDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe your goals, current modifications, power target, budget range, timeline, etc."
          className={cn(
            'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary transition-colors duration-200 focus:outline-none focus:ring-1',
            errors.projectDescription
              ? 'border-error focus:border-error focus:ring-error'
              : 'border-border focus:border-accent focus:ring-accent'
          )}
          aria-describedby={errors.projectDescription ? 'project-desc-error' : undefined}
        />
        {errors.projectDescription && (
          <p id="project-desc-error" className="mt-1 text-sm text-error" role="alert">
            {errors.projectDescription}
          </p>
        )}
      </div>
    </div>
  );
}
