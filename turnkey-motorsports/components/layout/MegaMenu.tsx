'use client';

import Link from 'next/link';
import { MEGA_MENU_CATEGORIES, MEGA_MENU_VEHICLES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Wrench } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <div
      className={cn(
        'absolute left-0 top-full w-full border-b border-border bg-surface shadow-2xl transition-all duration-200',
        isOpen
          ? 'visible translate-y-0 opacity-100'
          : 'invisible -translate-y-2 opacity-0'
      )}
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-8 py-8">
        {/* Shop by Category */}
        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">
            {MEGA_MENU_CATEGORIES.title}
          </h3>
          <ul className="space-y-2">
            {MEGA_MENU_CATEGORIES.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop by Vehicle */}
        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">
            {MEGA_MENU_VEHICLES.title}
          </h3>
          <ul className="space-y-2">
            {MEGA_MENU_VEHICLES.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured / Promo */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-light p-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
            <Wrench className="h-8 w-8 text-accent" />
          </div>
          <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">
            Engine Packages
          </h4>
          <p className="mt-2 text-sm text-text-secondary">
            500HP to 1000HP+ builds. Turn-Key solutions for serious power.
          </p>
          <Link
            href="/packages"
            onClick={onClose}
            className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
          >
            View Packages →
          </Link>
        </div>
      </div>
    </div>
  );
}
