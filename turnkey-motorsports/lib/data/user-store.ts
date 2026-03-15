// DEMO: Using localStorage for persistence. Replace with Supabase.
// This entire file is the data abstraction layer. When Supabase is connected,
// swap the internals of each function from localStorage to Supabase queries.
// The function signatures stay the same — zero component changes needed.

import type {
  AuthUser,
  UserAccount,
  Address,
  Order,
  SavedVehicle,
  NotificationPreferences,
} from '@/lib/types';

// --- Storage Keys ---
// DEMO: These localStorage keys are replaced by Supabase tables.

const USERS_KEY = 'turn-key-users';
const ACCOUNTS_KEY = 'turn-key-accounts';
const SESSION_KEY = 'turn-key-auth-user';

// --- Helpers ---

function getStoredUsers(): AuthUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: AuthUser[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Storage full
  }
}

function getStoredAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(ACCOUNTS_KEY);
    return stored ? (JSON.parse(stored) as UserAccount[]) : [];
  } catch {
    return [];
  }
}

function saveStoredAccounts(accounts: UserAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Storage full
  }
}

// --- Password Hashing ---
// DEMO: Basic hash for localStorage. Supabase Auth handles real hashing.

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'turn-key-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// --- Auth Functions ---
// DEMO: Replace with Supabase Auth calls.

export async function createUser(
  name: string,
  email: string,
  phone: string,
  password: string,
): Promise<AuthUser> {
  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  const passwordHash = await hashPassword(password);
  const user: AuthUser = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    createdAt: new Date().toISOString(),
    notificationPrefs: {
      orderUpdates: true,
      appointmentUpdates: true,
      newsletter: false,
      promotions: false,
    },
  };

  users.push(user);
  saveStoredUsers(users);

  // Create the corresponding account
  const account: UserAccount = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    savedVehicles: [],
    addresses: [],
    wishlistProductIds: [],
    orderHistory: [],
    appointmentRefs: [],
    notificationPrefs: user.notificationPrefs,
    createdAt: user.createdAt,
  };
  const accounts = getStoredAccounts();
  accounts.push(account);
  saveStoredAccounts(accounts);

  return user;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<AuthUser> {
  const users = getStoredUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error('No account found with this email.');
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    throw new Error('Incorrect password. Please try again.');
  }

  return user;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const users = getStoredUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) throw new Error('User not found.');

  const currentHash = await hashPassword(currentPassword);
  if (users[userIndex].passwordHash !== currentHash) {
    throw new Error('Current password is incorrect.');
  }

  users[userIndex].passwordHash = await hashPassword(newPassword);
  saveStoredUsers(users);
}

// --- Session ---
// DEMO: Replace with Supabase session management.

export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // Storage full
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

// --- Account Data ---
// DEMO: Replace with Supabase table queries.

export function getAccount(userId: string): UserAccount | null {
  const accounts = getStoredAccounts();
  return accounts.find((a) => a.id === userId) ?? null;
}

function updateAccount(userId: string, updater: (account: UserAccount) => UserAccount): UserAccount {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex((a) => a.id === userId);
  if (index === -1) throw new Error('Account not found.');
  accounts[index] = updater(accounts[index]);
  saveStoredAccounts(accounts);
  return accounts[index];
}

// --- Profile ---

export function updateProfile(
  userId: string,
  data: { name: string; email: string; phone: string },
): UserAccount {
  // Also update the auth user record
  const users = getStoredUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data, email: data.email.toLowerCase() };
    saveStoredUsers(users);
    // Update session
    const session = getSession();
    if (session && session.id === userId) {
      setSession({ ...session, ...data, email: data.email.toLowerCase() });
    }
  }

  return updateAccount(userId, (acc) => ({
    ...acc,
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
  }));
}

// --- Vehicles ---

export function saveVehicleToAccount(userId: string, vehicle: Omit<SavedVehicle, 'id'>): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    savedVehicles: [
      ...acc.savedVehicles,
      { ...vehicle, id: crypto.randomUUID() },
    ],
  }));
}

export function removeVehicleFromAccount(userId: string, vehicleId: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    savedVehicles: acc.savedVehicles.filter((v) => v.id !== vehicleId),
  }));
}

export function updateVehicleNickname(userId: string, vehicleId: string, nickname: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    savedVehicles: acc.savedVehicles.map((v) =>
      v.id === vehicleId ? { ...v, nickname } : v,
    ),
  }));
}

// --- Addresses ---

export function addAddress(userId: string, address: Omit<Address, 'id'>): UserAccount {
  return updateAccount(userId, (acc) => {
    const newAddress: Address = { ...address, id: crypto.randomUUID() };
    // If this is the first address or marked default, unset others
    const updatedAddresses = address.isDefault
      ? acc.addresses.map((a) => ({ ...a, isDefault: false }))
      : acc.addresses;
    return { ...acc, addresses: [...updatedAddresses, newAddress] };
  });
}

export function updateAddress(userId: string, addressId: string, data: Omit<Address, 'id'>): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    addresses: acc.addresses.map((a) => {
      if (a.id === addressId) return { ...a, ...data };
      if (data.isDefault) return { ...a, isDefault: false };
      return a;
    }),
  }));
}

export function removeAddress(userId: string, addressId: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    addresses: acc.addresses.filter((a) => a.id !== addressId),
  }));
}

export function setDefaultAddress(userId: string, addressId: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    addresses: acc.addresses.map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    })),
  }));
}

// --- Wishlist ---

export function addToWishlist(userId: string, productId: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    wishlistProductIds: acc.wishlistProductIds.includes(productId)
      ? acc.wishlistProductIds
      : [...acc.wishlistProductIds, productId],
  }));
}

export function removeFromWishlist(userId: string, productId: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    wishlistProductIds: acc.wishlistProductIds.filter((id) => id !== productId),
  }));
}

// --- Orders ---

export function addOrder(userId: string, order: Omit<Order, 'id'>): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    orderHistory: [
      { ...order, id: crypto.randomUUID() },
      ...acc.orderHistory,
    ],
  }));
}

// --- Appointments ---

export function linkAppointment(userId: string, referenceNumber: string): UserAccount {
  return updateAccount(userId, (acc) => ({
    ...acc,
    appointmentRefs: acc.appointmentRefs.includes(referenceNumber)
      ? acc.appointmentRefs
      : [...acc.appointmentRefs, referenceNumber],
  }));
}

// --- Notification Preferences ---

export function updateNotificationPrefs(
  userId: string,
  prefs: NotificationPreferences,
): UserAccount {
  // Update auth user too
  const users = getStoredUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].notificationPrefs = prefs;
    saveStoredUsers(users);
  }

  return updateAccount(userId, (acc) => ({
    ...acc,
    notificationPrefs: prefs,
  }));
}

// --- Delete Account ---

export function deleteAccount(userId: string): void {
  const users = getStoredUsers();
  saveStoredUsers(users.filter((u) => u.id !== userId));

  const accounts = getStoredAccounts();
  saveStoredAccounts(accounts.filter((a) => a.id !== userId));

  clearSession();
}

// --- Merge localStorage data into account on login ---
// DEMO: Pulls garage vehicles and wishlist from localStorage into account.

export function mergeLocalDataIntoAccount(
  userId: string,
  garageVehicles: Array<{ year: number; make: string; model: string; engine: string; nickname: string }>,
  wishlistIds: string[],
): UserAccount {
  return updateAccount(userId, (acc) => {
    // Merge vehicles that don't already exist (by year+make+model)
    const existingKeys = new Set(
      acc.savedVehicles.map((v) => `${v.year}-${v.make}-${v.model}`),
    );
    const newVehicles: SavedVehicle[] = garageVehicles
      .filter((v) => !existingKeys.has(`${v.year}-${v.make}-${v.model}`))
      .map((v) => ({
        id: crypto.randomUUID(),
        year: v.year,
        make: v.make,
        model: v.model,
        engine: v.engine,
        nickname: v.nickname,
      }));

    // Merge wishlist IDs that aren't already saved
    const existingWishlist = new Set(acc.wishlistProductIds);
    const newWishlistIds = wishlistIds.filter((id) => !existingWishlist.has(id));

    return {
      ...acc,
      savedVehicles: [...acc.savedVehicles, ...newVehicles],
      wishlistProductIds: [...acc.wishlistProductIds, ...newWishlistIds],
    };
  });
}
