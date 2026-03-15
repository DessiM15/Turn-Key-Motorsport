'use client';

import { useState } from 'react';
import { Car, Pencil, Trash2, Check, X } from 'lucide-react';
import { useGarage } from '@/lib/garage-context';
import { cn } from '@/lib/utils';

export default function VehiclesTab() {
  const { vehicles, removeVehicle, updateNickname, setActiveVehicle, activeVehicle } = useGarage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNickname, setEditNickname] = useState('');

  const handleStartEdit = (id: string, currentNickname: string) => {
    setEditingId(id);
    setEditNickname(currentNickname);
  };

  const handleSaveNickname = (id: string) => {
    updateNickname(id, editNickname);
    setEditingId(null);
  };

  if (vehicles.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <Car className="mx-auto mb-4 h-10 w-10 text-text-tertiary" />
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
          No Vehicles Saved
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Add a vehicle using the garage selector in the header to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
        Saved Vehicles
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {vehicles.map((v) => {
          const isActive = activeVehicle?.id === v.id;
          const isEditing = editingId === v.id;

          return (
            <div
              key={v.id}
              className={cn(
                'rounded-xl border bg-surface p-4 transition-colors',
                isActive ? 'border-accent/50' : 'border-border',
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Car className={cn('mt-0.5 h-5 w-5 shrink-0', isActive ? 'text-accent' : 'text-text-tertiary')} />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {v.year} {v.make} {v.model}
                    </p>
                    {v.engine && (
                      <p className="text-xs text-text-tertiary">{v.engine}</p>
                    )}
                    {isEditing ? (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={editNickname}
                          onChange={(e) => setEditNickname(e.target.value)}
                          placeholder="Nickname"
                          className="w-32 rounded border border-border bg-surface-light px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveNickname(v.id)}
                          className="rounded p-1 text-success hover:bg-success/10"
                          aria-label="Save nickname"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded p-1 text-text-tertiary hover:text-white"
                          aria-label="Cancel"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      v.nickname && (
                        <p className="mt-0.5 text-xs text-accent">{v.nickname}</p>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {!isEditing && (
                    <button
                      onClick={() => handleStartEdit(v.id, v.nickname)}
                      className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:text-white"
                      aria-label="Edit nickname"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:text-error"
                    aria-label="Remove vehicle"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Set Active Button */}
              <button
                onClick={() => setActiveVehicle(v.id)}
                className={cn(
                  'mt-3 w-full rounded-lg py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'bg-surface-light text-text-secondary hover:text-white',
                )}
              >
                {isActive ? 'Active Vehicle' : 'Set as Active'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
