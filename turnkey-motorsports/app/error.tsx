'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="mb-6 h-16 w-16 text-error" />
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        Something Went Wrong
      </h1>
      <p className="mt-4 max-w-md text-sm text-text-secondary">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" size="lg" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary" size="lg">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </Container>
  );
}
