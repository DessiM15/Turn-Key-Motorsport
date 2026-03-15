'use client';

import { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2, Check, X, Star } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import {
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} from '@/lib/data/user-store';
import { cn } from '@/lib/utils';
import type { Address } from '@/lib/types';

const AddressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  isDefault: z.boolean(),
});

const INITIAL_FORM = {
  label: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  isDefault: false,
};

export default function AddressesTab() {
  const { account, user, refreshAccount } = useAuth();
  const addresses = account?.addresses ?? [];

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleStartAdd = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setErrors({});
    setShowForm(true);
  };

  const handleStartEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.isDefault,
    });
    setErrors({});
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const handleSave = () => {
    const result = AddressSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (!user) return;

    if (editingId) {
      updateAddress(user.id, editingId, result.data);
    } else {
      addAddress(user.id, result.data);
    }

    refreshAccount();
    handleCancel();
  };

  const handleRemove = (addressId: string) => {
    if (!user) return;
    removeAddress(user.id, addressId);
    refreshAccount();
  };

  const handleSetDefault = (addressId: string) => {
    if (!user) return;
    setDefaultAddress(user.id, addressId);
    refreshAccount();
  };

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent',
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
          Saved Addresses
        </h3>
        {!showForm && (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Address
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <h4 className="mb-4 text-sm font-semibold text-white">
            {editingId ? 'Edit Address' : 'New Address'}
          </h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Label</label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => updateField('label', e.target.value)}
                placeholder="Home, Work, Shop..."
                className={inputClass('label')}
              />
              {errors.label && <p className="mt-1 text-xs text-error">{errors.label}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Street Address</label>
              <input
                type="text"
                value={form.street}
                onChange={(e) => updateField('street', e.target.value)}
                placeholder="123 Main St"
                className={inputClass('street')}
              />
              {errors.street && <p className="mt-1 text-xs text-error">{errors.street}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-text-secondary">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={inputClass('city')}
                />
                {errors.city && <p className="mt-1 text-xs text-error">{errors.city}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-secondary">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className={inputClass('state')}
                />
                {errors.state && <p className="mt-1 text-xs text-error">{errors.state}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-secondary">ZIP</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => updateField('zip', e.target.value)}
                  className={inputClass('zip')}
                />
                {errors.zip && <p className="mt-1 text-xs text-error">{errors.zip}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => updateField('isDefault', e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-xs text-text-secondary">Set as default address</span>
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover"
            >
              <Check className="h-3.5 w-3.5" />
              {editingId ? 'Update' : 'Add Address'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-lg bg-surface-light px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showForm ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <MapPin className="mx-auto mb-4 h-10 w-10 text-text-tertiary" />
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            No Addresses Saved
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Add a shipping address to speed up checkout.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                'rounded-xl border bg-surface p-4',
                address.isDefault ? 'border-accent/50' : 'border-border',
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <MapPin className={cn('mt-0.5 h-4 w-4 shrink-0', address.isDefault ? 'text-accent' : 'text-text-tertiary')} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{address.label}</span>
                      {address.isDefault && (
                        <span className="flex items-center gap-0.5 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                          <Star className="h-2.5 w-2.5 fill-accent" />
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      {address.street}<br />
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(address)}
                    className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:text-white"
                    aria-label="Edit address"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleRemove(address.id)}
                    className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:text-error"
                    aria-label="Remove address"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="mt-3 w-full rounded-lg bg-surface-light py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-white"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
