'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, LogIn, ShoppingCart, Car, Menu, ChevronDown } from 'lucide-react';
import { MAIN_NAV } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useGarage } from '@/lib/garage-context';
import { useAuth } from '@/lib/auth-context';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import SearchModal from '@/components/search/SearchModal';

export default function Header() {
  const { cartCount, openCart } = useCart();
  const { vehicles, toggleGarage } = useGarage();
  const { isLoggedIn, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavHover = (label: string, hasMegaMenu?: boolean) => {
    if (hasMegaMenu) {
      setIsMegaMenuOpen(true);
      setActiveDropdown(null);
    } else {
      setIsMegaMenuOpen(false);
      setActiveDropdown(label);
    }
  };

  const handleNavLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border bg-background/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/turnkey-logo-header.svg"
              alt="Turn-Key Motorsport"
              width={200}
              height={46}
              priority
              className="h-10 w-auto lg:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" onMouseLeave={handleNavLeave}>
            {MAIN_NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleNavHover(item.label, item.hasMegaMenu)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors',
                    'text-text-secondary hover:text-white',
                    (isMegaMenuOpen && item.hasMegaMenu) || activeDropdown === item.label
                      ? 'text-white'
                      : ''
                  )}
                >
                  {item.label}
                  {(item.children || item.hasMegaMenu) && (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Link>

                {/* Dropdown (non-mega) */}
                {item.children && !item.hasMegaMenu && activeDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full pt-2"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="min-w-[220px] rounded-xl border border-border bg-surface p-2 shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-light hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-text-tertiary transition-colors hover:border-border-light hover:text-white lg:flex"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="text-xs">Search...</span>
            </button>

            {/* Account / Sign In */}
            {isLoggedIn ? (
              <Link
                href="/account"
                className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface hover:text-white lg:flex"
                aria-label="My Account"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-white lg:flex"
                aria-label="Sign In"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-xs font-medium">Sign In</span>
              </Link>
            )}

            {/* Garage */}
            <button
              onClick={toggleGarage}
              className="relative hidden rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-white lg:flex"
              aria-label={`Garage with ${vehicles.length} vehicles`}
            >
              <Car className="h-5 w-5" />
              {vehicles.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {vehicles.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-white"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega Menu (desktop only) */}
        <div className="hidden lg:block">
          <MegaMenu
            isOpen={isMegaMenuOpen}
            onClose={() => setIsMegaMenuOpen(false)}
          />
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => { setIsMobileNavOpen(false); setIsSearchOpen(true); }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
