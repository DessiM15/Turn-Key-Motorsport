'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  compact?: boolean;
}

export default function LoginForm({ onSuccess, onSwitchToSignup, compact = false }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = LoginSchema.safeParse({ email, password });
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
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed.';
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
      {!compact && (
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Sign In
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Welcome back to Turn-Key Motorsport
          </p>
        </div>
      )}

      {errors.form && (
        <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error" role="alert">
          {errors.form}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="mb-1 block text-xs font-medium text-text-secondary">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass('email')}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="login-email-error" className="mt-1 text-xs text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-xs font-medium text-text-secondary">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className={inputClass('password')}
          aria-describedby={errors.password ? 'login-password-error' : undefined}
          autoComplete="current-password"
        />
        {errors.password && (
          <p id="login-password-error" className="mt-1 text-xs text-error">{errors.password}</p>
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
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{' '}
        {onSwitchToSignup ? (
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-accent hover:underline"
          >
            Create one
          </button>
        ) : (
          <Link href="/signup" className="font-semibold text-accent hover:underline">
            Create one
          </Link>
        )}
      </p>
    </form>
  );
}
