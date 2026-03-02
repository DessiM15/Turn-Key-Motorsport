'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle, Loader2 } from 'lucide-react';
import { SERVICE_NAMES, VEHICLE_MAKES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const BookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  email: z.string().email('Please enter a valid email'),
  vehicleYear: z.string().min(4, 'Year is required'),
  vehicleMake: z.string().min(1, 'Make is required'),
  vehicleModel: z.string().min(1, 'Model is required'),
  servicesInterested: z.array(z.string()).min(1, 'Select at least one service'),
  description: z.string().min(10, 'Please describe your project (at least 10 characters)'),
  preferredContact: z.enum(['call', 'email']),
});

type BookingFormData = z.infer<typeof BookingSchema>;

const INITIAL_FORM: BookingFormData = {
  name: '',
  phone: '',
  email: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  servicesInterested: [],
  description: '',
  preferredContact: 'email',
};

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleServiceToggle = (service: string) => {
    setForm((prev) => {
      const current = prev.servicesInterested;
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, servicesInterested: updated };
    });
    if (errors.servicesInterested) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.servicesInterested;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = BookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BookingFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      setIsComplete(true);
    } catch {
      setErrors({ name: 'Something went wrong. Please try again or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="mb-6 h-16 w-16 text-success" />
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          Consultation Requested
        </h3>
        <p className="mt-4 max-w-md text-sm text-text-secondary">
          Thank you! We will reach out within 1 business day to discuss your build.
          This is a demo — no real request was submitted.
        </p>
      </div>
    );
  }

  const inputClass = (field: keyof BookingFormData) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      {/* Contact Info */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="booking-name" className="mb-1 block text-xs font-medium text-text-secondary">
            Full Name *
          </label>
          <input
            id="booking-name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputClass('name')}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
          />
          {errors.name && <p id="booking-name-error" className="mt-1 text-xs text-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="booking-email" className="mb-1 block text-xs font-medium text-text-secondary">
            Email *
          </label>
          <input
            id="booking-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass('email')}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
          />
          {errors.email && <p id="booking-email-error" className="mt-1 text-xs text-error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="booking-phone" className="mb-1 block text-xs font-medium text-text-secondary">
            Phone *
          </label>
          <input
            id="booking-phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass('phone')}
            aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
          />
          {errors.phone && <p id="booking-phone-error" className="mt-1 text-xs text-error">{errors.phone}</p>}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
          Your Vehicle
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="booking-year" className="mb-1 block text-xs font-medium text-text-secondary">
              Year *
            </label>
            <input
              id="booking-year"
              type="text"
              placeholder="2021"
              value={form.vehicleYear}
              onChange={(e) => handleChange('vehicleYear', e.target.value)}
              className={inputClass('vehicleYear')}
              aria-describedby={errors.vehicleYear ? 'booking-year-error' : undefined}
            />
            {errors.vehicleYear && <p id="booking-year-error" className="mt-1 text-xs text-error">{errors.vehicleYear}</p>}
          </div>
          <div>
            <label htmlFor="booking-make" className="mb-1 block text-xs font-medium text-text-secondary">
              Make *
            </label>
            <select
              id="booking-make"
              value={form.vehicleMake}
              onChange={(e) => handleChange('vehicleMake', e.target.value)}
              className={inputClass('vehicleMake')}
              aria-describedby={errors.vehicleMake ? 'booking-make-error' : undefined}
            >
              <option value="">Select Make</option>
              {VEHICLE_MAKES.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
              <option value="Other">Other</option>
            </select>
            {errors.vehicleMake && <p id="booking-make-error" className="mt-1 text-xs text-error">{errors.vehicleMake}</p>}
          </div>
          <div>
            <label htmlFor="booking-model" className="mb-1 block text-xs font-medium text-text-secondary">
              Model *
            </label>
            <input
              id="booking-model"
              type="text"
              placeholder="Camaro SS"
              value={form.vehicleModel}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              className={inputClass('vehicleModel')}
              aria-describedby={errors.vehicleModel ? 'booking-model-error' : undefined}
            />
            {errors.vehicleModel && <p id="booking-model-error" className="mt-1 text-xs text-error">{errors.vehicleModel}</p>}
          </div>
        </div>
      </div>

      {/* Services Interested */}
      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
          Services Interested In *
        </h3>
        {errors.servicesInterested && (
          <p className="mb-2 text-xs text-error">{errors.servicesInterested}</p>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {SERVICE_NAMES.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors hover:border-border-light hover:bg-surface-light"
            >
              <input
                type="checkbox"
                checked={form.servicesInterested.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className="text-sm text-text-secondary">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <label htmlFor="booking-desc" className="mb-1 block text-xs font-medium text-text-secondary">
          Tell Us About Your Project *
        </label>
        <textarea
          id="booking-desc"
          rows={4}
          placeholder="Describe your goals, current modifications, power target, budget range, timeline, etc."
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className={inputClass('description')}
          aria-describedby={errors.description ? 'booking-desc-error' : undefined}
        />
        {errors.description && <p id="booking-desc-error" className="mt-1 text-xs text-error">{errors.description}</p>}
      </div>

      {/* Preferred Contact */}
      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
          Preferred Contact Method
        </h3>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={form.preferredContact === 'email'}
              onChange={() => handleChange('preferredContact', 'email')}
              className="h-4 w-4 border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary">Email</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="preferredContact"
              value="call"
              checked={form.preferredContact === 'call'}
              onChange={() => handleChange('preferredContact', 'call')}
              className="h-4 w-4 border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary">Phone Call</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request Consultation'
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-text-tertiary">
        Free consultation — no commitment required. We typically respond within 1 business day.
      </p>
    </form>
  );
}
