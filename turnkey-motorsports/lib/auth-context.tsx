'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthUser, UserAccount } from '@/lib/types';
import {
  createUser,
  authenticateUser,
  getSession,
  setSession,
  clearSession,
  getAccount,
  updateProfile as updateProfileStore,
  changePassword as changePasswordStore,
  mergeLocalDataIntoAccount,
} from '@/lib/data/user-store';

// --- Types ---

interface AuthContextValue {
  user: AuthUser | null;
  account: UserAccount | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name: string; email: string; phone: string }) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  refreshAccount: () => void;
}

// --- Context ---

const AuthContext = createContext<AuthContextValue | null>(null);

// --- Provider ---

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session from localStorage on mount
  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      const acc = getAccount(session.id);
      setAccount(acc);
    }
    setIsLoading(false);
  }, []);

  const refreshAccount = useCallback(() => {
    if (user) {
      const acc = getAccount(user.id);
      setAccount(acc);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const authedUser = await authenticateUser(email, password);
    setSession(authedUser);
    setUser(authedUser);

    // Merge localStorage garage + wishlist into account
    try {
      const garageRaw = localStorage.getItem('turn-key-garage');
      const wishlistRaw = localStorage.getItem('turn-key-wishlist');
      const garageVehicles = garageRaw
        ? (JSON.parse(garageRaw) as { vehicles: Array<{ year: number; make: string; model: string; engine: string; nickname: string }> }).vehicles
        : [];
      const wishlistIds = wishlistRaw ? (JSON.parse(wishlistRaw) as string[]) : [];

      if (garageVehicles.length > 0 || wishlistIds.length > 0) {
        mergeLocalDataIntoAccount(authedUser.id, garageVehicles, wishlistIds);
      }
    } catch {
      // Non-critical — skip merge on error
    }

    const acc = getAccount(authedUser.id);
    setAccount(acc);
  }, []);

  const signup = useCallback(async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    const newUser = await createUser(name, email, phone, password);
    // Auto-login on signup
    setSession(newUser);
    setUser(newUser);
    const acc = getAccount(newUser.id);
    setAccount(acc);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setAccount(null);
  }, []);

  const updateProfile = useCallback((data: { name: string; email: string; phone: string }) => {
    if (!user) return;
    const updated = updateProfileStore(user.id, data);
    setAccount(updated);
    // Refresh user from session
    const session = getSession();
    if (session) setUser(session);
  }, [user]);

  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (!user) throw new Error('Not logged in.');
    await changePasswordStore(user.id, currentPassword, newPassword);
  }, [user]);

  const value: AuthContextValue = {
    user,
    account,
    isLoggedIn: user !== null,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    refreshAccount,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
