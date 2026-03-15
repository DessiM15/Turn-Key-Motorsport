'use client';

import { useState } from 'react';
import { Loader2, Car, Pencil, Trash2, Check, X } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { useGarage } from '@/lib/garage-context';
import { cn } from '@/lib/utils';

const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').or(z.literal('')),
});

const PasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Must be at least 6 characters'),
  newPassword: z.string().min(6, 'Must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function ProfileTab() {
  const { user, updateProfile, changePassword } = useAuth();
  const { vehicles } = useGarage();

  // Profile form
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileSaved, setProfileSaved] = useState(false);

  // Password form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleSaveProfile = () => {
    const result = ProfileSchema.safeParse({ name, email, phone });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setProfileErrors(fieldErrors);
      return;
    }
    setProfileErrors({});
    updateProfile({ name, email, phone });
    setIsEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleCancelProfile = () => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPhone(user?.phone ?? '');
    setProfileErrors({});
    setIsEditingProfile(false);
  };

  const handleChangePassword = async () => {
    const result = PasswordSchema.safeParse({ currentPassword, newPassword, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setPasswordErrors(fieldErrors);
      return;
    }

    setPasswordErrors({});
    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordChanged(true);
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordChanged(false), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to change password.';
      setPasswordErrors({ form: message });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      hasError
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent',
    );

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <section className="rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            Profile Information
          </h3>
          {!isEditingProfile && (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          )}
        </div>

        {profileSaved && (
          <div className="mb-4 rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-xs text-success">
            Profile updated successfully.
          </div>
        )}

        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass(Boolean(profileErrors.name))}
              />
              {profileErrors.name && <p className="mt-1 text-xs text-error">{profileErrors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass(Boolean(profileErrors.email))}
              />
              {profileErrors.email && <p className="mt-1 text-xs text-error">{profileErrors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass(Boolean(profileErrors.phone))}
              />
              {profileErrors.phone && <p className="mt-1 text-xs text-error">{profileErrors.phone}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover"
              >
                <Check className="h-3.5 w-3.5" />
                Save
              </button>
              <button
                onClick={handleCancelProfile}
                className="flex items-center gap-1.5 rounded-lg bg-surface-light px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-text-tertiary">Name</p>
              <p className="text-sm text-text-secondary">{user?.name ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Email</p>
              <p className="text-sm text-text-secondary">{user?.email ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Phone</p>
              <p className="text-sm text-text-secondary">{user?.phone || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Member Since</p>
              <p className="text-sm text-text-secondary">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  : '—'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Change Password */}
      <section className="rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            Password
          </h3>
          {!showPasswordForm && (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Change Password
            </button>
          )}
        </div>

        {passwordChanged && (
          <div className="mb-4 rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-xs text-success">
            Password changed successfully.
          </div>
        )}

        {showPasswordForm && (
          <div className="space-y-4">
            {passwordErrors.form && (
              <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-xs text-error">
                {passwordErrors.form}
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass(Boolean(passwordErrors.currentPassword))}
                autoComplete="current-password"
              />
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-xs text-error">{passwordErrors.currentPassword}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass(Boolean(passwordErrors.newPassword))}
                autoComplete="new-password"
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-xs text-error">{passwordErrors.newPassword}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass(Boolean(passwordErrors.confirmPassword))}
                autoComplete="new-password"
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-xs text-error">{passwordErrors.confirmPassword}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
              >
                {isChangingPassword ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </button>
              <button
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordErrors({});
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="rounded-lg bg-surface-light px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Vehicles */}
      <section className="rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
          My Vehicles
        </h3>
        {vehicles.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No vehicles saved. Add a vehicle from the garage selector.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {vehicles.map((v) => (
              <div key={v.id} className="flex items-center gap-3 rounded-lg bg-surface-light px-4 py-3">
                <Car className="h-5 w-5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {v.year} {v.make} {v.model}
                  </p>
                  {v.nickname && (
                    <p className="text-xs text-text-tertiary">{v.nickname}</p>
                  )}
                  {v.engine && (
                    <p className="text-xs text-text-tertiary">{v.engine}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
