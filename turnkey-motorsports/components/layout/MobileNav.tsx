'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, Search, User, ShoppingCart } from 'lucide-react';
import { MAIN_NAV, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleToggle = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-all duration-300 lg:hidden',
        isOpen ? 'visible' : 'invisible'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full max-w-sm bg-background shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
            Menu
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Utility Links */}
        <div className="flex items-center gap-4 border-b border-border px-4 py-3">
          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white"
          >
            <User className="h-4 w-4" />
            Account
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>
        </div>

        {/* Navigation */}
        <nav className="overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.has(item.label);

              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 py-3 font-display text-lg font-bold uppercase tracking-wider text-white transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => handleToggle(item.label)}
                        className="rounded-lg p-2 text-text-secondary transition-colors hover:text-white"
                        aria-expanded={isExpanded}
                        aria-label={`Expand ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 transition-transform duration-200',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && (
                    <div
                      className={cn(
                        'grid transition-all duration-200 overflow-hidden',
                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      )}
                    >
                      <ul className="overflow-hidden pl-4 space-y-1">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-sm text-text-secondary transition-colors hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

            {/* Extra links */}
            <li className="border-t border-border pt-3 mt-3">
              <Link
                href="/testimonials"
                onClick={onClose}
                className="block py-3 font-display text-lg font-bold uppercase tracking-wider text-white transition-colors hover:text-accent"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                onClick={onClose}
                className="block py-3 font-display text-lg font-bold uppercase tracking-wider text-white transition-colors hover:text-accent"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="block py-3 font-display text-lg font-bold uppercase tracking-wider text-white transition-colors hover:text-accent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface p-4">
          <p className="text-xs text-text-tertiary">{CONTACT_INFO.phone}</p>
          <p className="text-xs text-text-tertiary">{CONTACT_INFO.email}</p>
          <div className="mt-3 flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-tertiary transition-colors hover:text-accent"
                aria-label={social.platform}
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
