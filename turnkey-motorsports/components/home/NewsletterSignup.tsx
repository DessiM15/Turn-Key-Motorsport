'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ScrollReveal from './ScrollReveal';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');

    // TODO: Wire to email service (Mailchimp, ConvertKit, etc.)
    // For now, simulate a short delay and log
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('[Newsletter] Email submitted:', email);
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-surface-light px-6 py-12 text-center md:px-12 md:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <Mail className="h-7 w-7 text-accent" />
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold uppercase tracking-wider text-white md:text-3xl">
              Get Exclusive Deals & Build Updates
            </h2>
            <p className="mt-3 text-text-secondary">
              Join 5,000+ enthusiasts. First access to new parts, packages, and shop news.
            </p>

            {state === 'success' ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <p className="font-semibold">You&apos;re in! Check your inbox.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-white placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:max-w-sm"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  isLoading={state === 'loading'}
                  className="w-full sm:w-auto"
                >
                  Subscribe
                </Button>
              </form>
            )}

            {state === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-error">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">Something went wrong. Try again.</p>
              </div>
            )}

            <p className="mt-4 text-xs text-text-tertiary">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
