'use client';

import { cn } from '@/lib/utils';

interface ContactStepProps {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'call' | 'email' | 'text';
  onFieldChange: (field: 'name' | 'email' | 'phone' | 'preferredContact', value: string) => void;
  errors: Record<string, string>;
}

export default function ContactStep({
  name,
  email,
  phone,
  preferredContact,
  onFieldChange,
  errors,
}: ContactStepProps) {
  const inputClass = (field: string) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary transition-colors duration-200 focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

  return (
    <div>
      <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-wide text-white">
        Your Information
      </h3>
      <p className="mb-6 text-sm text-text-secondary">
        How should we reach you?
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="sched-name" className="mb-2 block text-sm font-medium text-text-secondary">
            Full Name *
          </label>
          <input
            id="sched-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            className={inputClass('name')}
            aria-describedby={errors.name ? 'sched-name-error' : undefined}
          />
          {errors.name && (
            <p id="sched-name-error" className="mt-1 text-sm text-error" role="alert">{errors.name}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sched-email" className="mb-2 block text-sm font-medium text-text-secondary">
              Email *
            </label>
            <input
              id="sched-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className={inputClass('email')}
              aria-describedby={errors.email ? 'sched-email-error' : undefined}
            />
            {errors.email && (
              <p id="sched-email-error" className="mt-1 text-sm text-error" role="alert">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="sched-phone" className="mb-2 block text-sm font-medium text-text-secondary">
              Phone *
            </label>
            <input
              id="sched-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              className={inputClass('phone')}
              aria-describedby={errors.phone ? 'sched-phone-error' : undefined}
            />
            {errors.phone && (
              <p id="sched-phone-error" className="mt-1 text-sm text-error" role="alert">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-secondary">Preferred Contact Method</p>
          <div className="flex flex-wrap gap-4">
            {(['email', 'call', 'text'] as const).map((method) => (
              <label key={method} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={preferredContact === method}
                  onChange={() => onFieldChange('preferredContact', method)}
                  className="h-4 w-4 border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span className="text-sm capitalize text-text-secondary">
                  {method === 'call' ? 'Phone Call' : method === 'text' ? 'Text Message' : 'Email'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
