'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/lib/auth-context';
import AccountSidebar from '@/components/account/AccountSidebar';
import ProfileTab from '@/components/account/ProfileTab';
import OrdersTab from '@/components/account/OrdersTab';
import VehiclesTab from '@/components/account/VehiclesTab';
import WishlistTab from '@/components/account/WishlistTab';
import AddressesTab from '@/components/account/AddressesTab';
import SettingsTab from '@/components/account/SettingsTab';

type TabId = 'profile' | 'orders' | 'vehicles' | 'wishlist' | 'addresses' | 'settings';

export default function AccountPage() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // Loading state
  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </Container>
    );
  }

  // Not logged in — show auth gate
  if (!isLoggedIn) {
    return (
      <>
        <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="accent" size="md">Account</Badge>
              <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
                My Account
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Sign in to manage your orders, vehicles, and profile.
              </p>
            </div>
          </Container>
        </section>

        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center">
            <Lock className="mx-auto mb-4 h-12 w-12 text-text-tertiary" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Sign In Required
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in or create an account to access your dashboard.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="rounded-lg bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-border px-8 py-3 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Container>
      </>
    );
  }

  // Logged in — show dashboard
  const tabContent: Record<TabId, React.ReactNode> = {
    profile: <ProfileTab />,
    orders: <OrdersTab />,
    vehicles: <VehiclesTab />,
    wishlist: <WishlistTab />,
    addresses: <AddressesTab />,
    settings: <SettingsTab />,
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-12 lg:py-16">
        <Container className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="accent" size="md">Account</Badge>
              <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
                Welcome back, {user?.name?.split(' ')[0]}
              </h1>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar — scrollable on mobile */}
          <div className="overflow-x-auto lg:overflow-visible">
            <div className="flex gap-1 lg:block lg:space-y-1">
              <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          {/* Main Content */}
          <div>
            {tabContent[activeTab]}
          </div>
        </div>
      </Container>
    </>
  );
}
