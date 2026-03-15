'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
  updateNotificationPrefs,
  deleteAccount,
} from '@/lib/data/user-store';
import type { NotificationPreferences } from '@/lib/types';

export default function SettingsTab() {
  const router = useRouter();
  const { user, account, refreshAccount, logout } = useAuth();

  const [prefs, setPrefs] = useState<NotificationPreferences>(
    account?.notificationPrefs ?? {
      orderUpdates: true,
      appointmentUpdates: true,
      newsletter: false,
      promotions: false,
    },
  );
  const [prefsSaved, setPrefsSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (key: keyof NotificationPreferences) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    if (user) {
      updateNotificationPrefs(user.id, updated);
      refreshAccount();
    }
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2000);
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    deleteAccount(user.id);
    logout();
    router.push('/');
  };

  const NOTIFICATION_OPTIONS: { key: keyof NotificationPreferences; label: string; description: string }[] = [
    {
      key: 'orderUpdates',
      label: 'Order Updates',
      description: 'Receive notifications when your order status changes',
    },
    {
      key: 'appointmentUpdates',
      label: 'Appointment Updates',
      description: 'Get notified about appointment confirmations and changes',
    },
    {
      key: 'newsletter',
      label: 'Newsletter',
      description: 'Monthly updates on new products and build spotlights',
    },
    {
      key: 'promotions',
      label: 'Promotional Emails',
      description: 'Sales, discounts, and special offers',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Notifications */}
      <section className="rounded-xl border border-border bg-surface p-6">
        <div className="mb-1 flex items-center gap-2">
          <Bell className="h-4 w-4 text-accent" />
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            Notifications
          </h3>
        </div>
        <p className="mb-6 text-xs text-text-tertiary">
          Choose which emails you would like to receive.
        </p>

        {prefsSaved && (
          <div className="mb-4 rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-xs text-success">
            Preferences saved.
          </div>
        )}

        <div className="space-y-4">
          {NOTIFICATION_OPTIONS.map((option) => (
            <div key={option.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{option.label}</p>
                <p className="text-xs text-text-tertiary">{option.description}</p>
              </div>
              <button
                onClick={() => handleToggle(option.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  prefs[option.key] ? 'bg-accent' : 'bg-surface-light'
                }`}
                role="switch"
                aria-checked={prefs[option.key]}
                aria-label={`${option.label} notifications`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    prefs[option.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Delete Account */}
      <section className="rounded-xl border border-error/20 bg-surface p-6">
        <h3 className="mb-2 font-display text-base font-bold uppercase tracking-wider text-white">
          Account
        </h3>

        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-secondary">
              Permanently delete your account and all associated data.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 rounded-lg border border-error/30 px-4 py-2 text-xs font-semibold text-error transition-colors hover:bg-error/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Account
            </button>
          </div>
        ) : (
          <div className="rounded-lg border border-error/30 bg-error/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
              <div>
                <p className="text-sm font-semibold text-error">
                  Are you sure? This cannot be undone.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  This will permanently delete your account, saved vehicles, order history, wishlist, and addresses.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    className="rounded-lg bg-error px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-error/80"
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="rounded-lg bg-surface-light px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
