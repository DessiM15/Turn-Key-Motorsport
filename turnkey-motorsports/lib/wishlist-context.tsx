'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  addToWishlist as addToWishlistStore,
  removeFromWishlist as removeFromWishlistStore,
  getAccount,
} from '@/lib/data/user-store';

// --- Types ---

interface WishlistContextValue {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
}

// --- Constants ---

const STORAGE_KEY = 'turn-key-wishlist';

// --- Storage helpers ---
// DEMO: Replace with Supabase queries when connected.

function loadWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full
  }
}

// --- Context ---

const WishlistContext = createContext<WishlistContextValue | null>(null);

// --- Provider ---

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const { isLoggedIn, user, refreshAccount } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate: load from account if logged in, else localStorage
  useEffect(() => {
    if (isLoggedIn && user) {
      const acc = getAccount(user.id);
      if (acc) {
        setWishlistIds(acc.wishlistProductIds);
      }
    } else {
      setWishlistIds(loadWishlist());
    }
    setHydrated(true);
  }, [isLoggedIn, user]);

  // Sync to localStorage when not logged in
  useEffect(() => {
    if (!hydrated) return;
    if (!isLoggedIn) {
      saveWishlist(wishlistIds);
    }
  }, [wishlistIds, hydrated, isLoggedIn]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (isLoggedIn && user) {
        if (wishlistIds.includes(productId)) {
          removeFromWishlistStore(user.id, productId);
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
        } else {
          addToWishlistStore(user.id, productId);
          setWishlistIds((prev) => [...prev, productId]);
        }
        refreshAccount();
      } else {
        // Guest: just toggle in local state (will trigger auth modal via WishlistButton)
        setWishlistIds((prev) =>
          prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId],
        );
      }
    },
    [isLoggedIn, user, wishlistIds, refreshAccount],
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      if (isLoggedIn && user) {
        removeFromWishlistStore(user.id, productId);
        refreshAccount();
      }
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
    },
    [isLoggedIn, user, refreshAccount],
  );

  const value: WishlistContextValue = {
    wishlistIds,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    wishlistCount: wishlistIds.length,
  };

  return <WishlistContext value={value}>{children}</WishlistContext>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
