import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="mb-6 h-16 w-16 text-accent" />
      <h1 className="font-display text-6xl font-bold uppercase tracking-wide text-white sm:text-8xl">
        404
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        This page does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="secondary" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Shop
          </Button>
        </Link>
      </div>
    </Container>
  );
}
