'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  compact?: boolean;
  passwordOnly?: boolean;
}

export default function SignupForm({
  onSuccess,
  onSwitchToLogin,
  prefillName = '',
  prefillEmail = '',
  prefillPhone = '',
  compact = false,
  passwordOnly = false,
}: SignupFormProps) {
  const { signup } = useAuth();
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [phone, setPhone] = useState(prefillPhone);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = SignupSchema.safeParse({ name, email, phone, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(name, email, phone, password);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed.';
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent',
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && !passwordOnly && (
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Create Account
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Join Turn-Key Motorsport
          </p>
        </div>
      )}

      {errors.form && (
        <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error" role="alert">
          {errors.form}
        </div>
      )}

      {!passwordOnly && (
        <>
          <div>
            <label htmlFor="signup-name" className="mb-1 block text-xs font-medium text-text-secondary">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={inputClass('name')}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <p id="signup-name-error" className="mt-1 text-xs text-error">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-email" className="mb-1 block text-xs font-medium text-text-secondary">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass('email')}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="signup-email-error" className="mt-1 text-xs text-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-phone" className="mb-1 block text-xs font-medium text-text-secondary">
              Phone <span className="text-text-tertiary">(optional)</span>
            </label>
            <input
              id="signup-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className={inputClass('phone')}
              autoComplete="tel"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="signup-password" className="mb-1 block text-xs font-medium text-text-secondary">
          {passwordOnly ? 'Choose a Password' : 'Password'}
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className={inputClass('password')}
          aria-describedby={errors.password ? 'signup-password-error' : undefined}
          autoComplete="new-password"
        />
        {errors.password && (
          <p id="signup-password-error" className="mt-1 text-xs text-error">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="signup-confirm" className="mb-1 block text-xs font-medium text-text-secondary">
          Confirm Password
        </label>
        <input
          id="signup-confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
          className={inputClass('confirmPassword')}
          aria-describedby={errors.confirmPassword ? 'signup-confirm-error' : undefined}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p id="signup-confirm-error" className="mt-1 text-xs text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          passwordOnly ? 'Set Password & Create Account' : 'Create Account'
        )}
      </button>

      {!passwordOnly && (
        <p className="text-center text-sm text-text-secondary">
          Already have an account?{' '}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-accent hover:underline"
            >
              Sign in
            </button>
          ) : (
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          )}
        </p>
      )}
    </form>
  );
}
