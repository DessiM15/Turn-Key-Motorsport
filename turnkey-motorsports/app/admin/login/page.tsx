'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setError(data.error);
        return;
      }

      if (!res.ok) {
        setError('Invalid password');
        return;
      }

      router.push('/admin/appointments');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
            <Shield className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            TKM Admin
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Enter your password to access the admin panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4">
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter admin password"
              autoFocus
              className={cn(
                'w-full rounded-lg border bg-surface-light px-4 py-3 text-sm text-white placeholder:text-text-tertiary transition-colors duration-200 focus:outline-none focus:ring-1',
                error
                  ? 'border-error focus:border-error focus:ring-error'
                  : 'border-border focus:border-accent focus:ring-accent'
              )}
              aria-describedby={error ? 'login-error' : undefined}
            />
            {error && (
              <p id="login-error" className="mt-2 text-sm text-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Enter Admin'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
