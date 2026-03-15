'use client';

import {
  User,
  Package,
  Car,
  Heart,
  MapPin,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

type TabId = 'profile' | 'orders' | 'vehicles' | 'wishlist' | 'addresses' | 'settings';

interface AccountSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS = [
  { icon: User, label: 'Profile', id: 'profile' as TabId },
  { icon: Package, label: 'Order History', id: 'orders' as TabId },
  { icon: Car, label: 'Saved Vehicles', id: 'vehicles' as TabId },
  { icon: Heart, label: 'Wishlist', id: 'wishlist' as TabId },
  { icon: MapPin, label: 'Addresses', id: 'addresses' as TabId },
  { icon: Settings, label: 'Settings', id: 'settings' as TabId },
];

export default function AccountSidebar({ activeTab, onTabChange }: AccountSidebarProps) {
  const { logout } = useAuth();

  return (
    <aside className="space-y-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors',
            activeTab === tab.id
              ? 'bg-accent/15 font-semibold text-accent'
              : 'text-text-secondary hover:bg-surface-light hover:text-white',
          )}
        >
          <tab.icon className="h-4 w-4 shrink-0" />
          {tab.label}
        </button>
      ))}
      <button
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-text-tertiary transition-colors hover:bg-surface-light hover:text-error"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Sign Out
      </button>
    </aside>
  );
}
