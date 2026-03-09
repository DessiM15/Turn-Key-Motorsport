'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClipboardList, Package, LayoutDashboard, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Appointments', href: '/admin/appointments', icon: ClipboardList },
  { label: 'Orders', href: '#', icon: Package, disabled: true },
  { label: 'Inventory', href: '#', icon: LayoutDashboard, disabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navContent = (
    <nav className="flex flex-col gap-1 p-3">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        if (link.disabled) {
          return (
            <div
              key={link.label}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-text-tertiary cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4.5 w-4.5" />
                <span className="text-sm">{link.label}</span>
              </div>
              <Badge variant="neutral" size="sm">Soon</Badge>
            </div>
          );
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200',
              isActive
                ? 'border-l-2 border-accent bg-accent/10 text-accent font-medium'
                : 'text-text-secondary hover:bg-surface-light hover:text-white'
            )}
          >
            <Icon className="h-4.5 w-4.5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:text-white lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-overlay"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative h-full w-64 border-r border-border bg-surface animate-fade-in">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg p-1 text-text-secondary hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-56 lg:flex-col border-r border-border bg-surface">
        {navContent}
      </aside>
    </>
  );
}
