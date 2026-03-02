'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const ReviewSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  vehicleYear: z.string().min(4, 'Year is required'),
  vehicleMake: z.string().min(1, 'Make is required'),
  vehicleModel: z.string().min(1, 'Model is required'),
  rating: z.number().min(1, 'Rating is required').max(5),
  text: z.string().min(20, 'Review must be at least 20 characters'),
  serviceType: z.string().optional(),
});

type ReviewFormData = z.infer<typeof ReviewSchema>;

const INITIAL_FORM: ReviewFormData = {
  customerName: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  rating: 0,
  text: '',
  serviceType: '',
};

export default function ReviewForm() {
  const [form, setForm] = useState<ReviewFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (field: keyof ReviewFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = ReviewSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReviewFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ReviewFormData;
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
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsComplete(true);
    } catch {
      setErrors({ customerName: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-success" />
        <h3 className="font-display text-xl font-bold uppercase text-white">
          Thank You!
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Your review has been submitted and will be published after moderation.
        </p>
      </div>
    );
  }

  const inputClass = (field: keyof ReviewFormData) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="review-name" className="mb-1 block text-xs font-medium text-text-secondary">
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            placeholder="John D."
            value={form.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            className={inputClass('customerName')}
          />
          {errors.customerName && <p className="mt-1 text-xs text-error">{errors.customerName}</p>}
        </div>

        {/* Vehicle */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="review-year" className="mb-1 block text-xs font-medium text-text-secondary">Year *</label>
            <input
              id="review-year"
              type="text"
              placeholder="2021"
              value={form.vehicleYear}
              onChange={(e) => handleChange('vehicleYear', e.target.value)}
              className={inputClass('vehicleYear')}
            />
          </div>
          <div>
            <label htmlFor="review-make" className="mb-1 block text-xs font-medium text-text-secondary">Make *</label>
            <input
              id="review-make"
              type="text"
              placeholder="Dodge"
              value={form.vehicleMake}
              onChange={(e) => handleChange('vehicleMake', e.target.value)}
              className={inputClass('vehicleMake')}
            />
          </div>
          <div>
            <label htmlFor="review-model" className="mb-1 block text-xs font-medium text-text-secondary">Model *</label>
            <input
              id="review-model"
              type="text"
              placeholder="Challenger"
              value={form.vehicleModel}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              className={inputClass('vehicleModel')}
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">Rating *</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleChange('rating', i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
                aria-label={`Rate ${i + 1} star${i > 0 ? 's' : ''}`}
              >
                <Star
                  className={cn(
                    'h-7 w-7 transition-colors',
                    (hoverRating || form.rating) > i
                      ? 'fill-accent text-accent'
                      : 'text-text-tertiary'
                  )}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="mt-1 text-xs text-error">{errors.rating}</p>}
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="review-service" className="mb-1 block text-xs font-medium text-text-secondary">
            Service Received (optional)
          </label>
          <input
            id="review-service"
            type="text"
            placeholder="e.g. Engine Build, Dyno Tune, Cam Install"
            value={form.serviceType}
            onChange={(e) => handleChange('serviceType', e.target.value)}
            className={inputClass('serviceType')}
          />
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review-text" className="mb-1 block text-xs font-medium text-text-secondary">
            Your Review *
          </label>
          <textarea
            id="review-text"
            rows={4}
            placeholder="Tell us about your experience..."
            value={form.text}
            onChange={(e) => handleChange('text', e.target.value)}
            className={inputClass('text')}
          />
          {errors.text && <p className="mt-1 text-xs text-error">{errors.text}</p>}
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
          Submit Review
        </Button>
      </div>
    </form>
  );
}
