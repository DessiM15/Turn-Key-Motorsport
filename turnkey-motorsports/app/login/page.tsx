'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) router.replace('/account');
  }, [isLoggedIn, router]);

  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8">
        <LoginForm
          onSuccess={() => router.push('/account')}
        />
      </div>
    </Container>
  );
}
