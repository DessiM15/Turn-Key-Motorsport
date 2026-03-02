import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { CONTACT_INFO } from '@/lib/constants';
import {
  User,
  Package,
  Car,
  Heart,
  MapPin,
  ChevronRight,
  ShoppingBag,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Turnkey Motorsports account — orders, saved vehicles, wishlist, and more.',
};

const SIDEBAR_LINKS = [
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Package, label: 'Order History', id: 'orders' },
  { icon: Car, label: 'Saved Vehicles', id: 'vehicles' },
  { icon: Heart, label: 'Wishlist', id: 'wishlist' },
  { icon: MapPin, label: 'Addresses', id: 'addresses' },
  { icon: Settings, label: 'Settings', id: 'settings' },
] as const;

export default function AccountPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Account</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              My Account
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Manage your orders, vehicles, and profile.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        {/* Auth Gate */}
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center">
          <Lock className="mx-auto mb-4 h-12 w-12 text-text-tertiary" />
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Sign In Required
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Authentication is not yet connected. Below is a preview of the account dashboard layout.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-1">
            {SIDEBAR_LINKS.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-text-tertiary transition-colors hover:bg-surface-light hover:text-error">
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Profile Section */}
            <section id="profile" className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Profile Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-text-tertiary">Name</p>
                  <p className="text-sm text-text-secondary">John Doe</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary">Email</p>
                  <p className="text-sm text-text-secondary">john@example.com</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary">Phone</p>
                  <p className="text-sm text-text-secondary">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary">Member Since</p>
                  <p className="text-sm text-text-secondary">January 2025</p>
                </div>
              </div>
            </section>

            {/* Recent Orders */}
            <section id="orders" className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  Recent Orders
                </h3>
                <span className="text-xs text-accent">View All</span>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'TM-001234', date: '2025-12-01', total: 1249.99, status: 'delivered' as const },
                  { id: 'TM-001198', date: '2025-11-15', total: 459.99, status: 'shipped' as const },
                  { id: 'TM-001156', date: '2025-10-28', total: 2899.99, status: 'delivered' as const },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg bg-surface-light px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-4 w-4 text-text-tertiary" />
                      <div>
                        <p className="text-sm font-medium text-white">#{order.id}</p>
                        <p className="text-xs text-text-tertiary">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={order.status === 'delivered' ? 'success' : 'accent'} size="sm">
                        {order.status}
                      </Badge>
                      <p className="text-sm font-semibold text-white">${order.total.toLocaleString()}</p>
                      <ChevronRight className="h-4 w-4 text-text-tertiary" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved Vehicles */}
            <section id="vehicles" className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Saved Vehicles
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { year: 2023, make: 'Dodge', model: 'Charger Scat Pack', nickname: 'Daily' },
                  { year: 2019, make: 'Chevrolet', model: 'Camaro SS', nickname: 'Track Car' },
                ].map((v) => (
                  <div key={v.nickname} className="flex items-center gap-3 rounded-lg bg-surface-light px-4 py-3">
                    <Car className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">{v.year} {v.make} {v.model}</p>
                      <p className="text-xs text-text-tertiary">{v.nickname}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wishlist */}
            <section id="wishlist" className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Wishlist
              </h3>
              <p className="text-sm text-text-secondary">
                Your wishlist is empty. Browse the{' '}
                <Link href="/shop" className="font-semibold text-accent hover:underline">shop</Link>{' '}
                to save products for later.
              </p>
            </section>

            {/* Addresses */}
            <section id="addresses" className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Saved Addresses
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-surface-light px-4 py-3">
                  <div className="mb-1 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    <span className="text-xs font-semibold text-white">Home (Default)</span>
                  </div>
                  <p className="text-xs text-text-secondary">123 Main Street<br />Anytown, ST 12345</p>
                </div>
                <div className="rounded-lg bg-surface-light px-4 py-3">
                  <div className="mb-1 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-text-tertiary" />
                    <span className="text-xs font-semibold text-white">Shop</span>
                  </div>
                  <p className="text-xs text-text-secondary">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
