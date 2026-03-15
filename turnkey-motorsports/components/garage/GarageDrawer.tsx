'use client';

import { useState } from 'react';
import { X, Star, Trash2, Car, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGarage } from '@/lib/garage-context';
import VehicleSelector from './VehicleSelector';

export default function GarageDrawer() {
  const {
    vehicles,
    activeVehicle,
    addVehicle,
    removeVehicle,
    setActiveVehicle,
    updateNickname,
    isGarageOpen,
    closeGarage,
  } = useGarage();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNickname, setEditNickname] = useState('');

  if (!isGarageOpen) return null;

  const isFull = vehicles.length >= 5;

  const handleAddVehicle = (vehicle: Parameters<typeof addVehicle>[0]) => {
    addVehicle(vehicle);
    setShowAddForm(false);
  };

  const handleStartEditNickname = (id: string, current: string) => {
    setEditingId(id);
    setEditNickname(current);
  };

  const handleSaveNickname = (id: string) => {
    updateNickname(id, editNickname.trim());
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeGarage}
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-accent" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              My Garage
            </h2>
            <span className="text-sm text-text-tertiary">({vehicles.length}/5)</span>
          </div>
          <button
            type="button"
            onClick={closeGarage}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors"
            aria-label="Close garage"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Vehicle List */}
        <div className="flex-1 overflow-y-auto p-4">
          {vehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Car className="mb-3 h-10 w-10 text-text-tertiary" />
              <p className="text-sm text-text-secondary">Your garage is empty</p>
              <p className="mt-1 text-xs text-text-tertiary">
                Add a vehicle to see which parts fit
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {vehicles.map((vehicle) => {
                const isActive = vehicle.id === activeVehicle?.id;
                const displayName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
                const isEditing = editingId === vehicle.id;

                return (
                  <div
                    key={vehicle.id}
                    className={cn(
                      'rounded-xl border p-4 transition-colors',
                      isActive
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-surface-light hover:border-border-light',
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveVehicle(vehicle.id)}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          {isActive && <Star className="h-3.5 w-3.5 fill-accent text-accent" />}
                          <span className="text-sm font-semibold text-white">{displayName}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-text-secondary">{vehicle.engine}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeVehicle(vehicle.id)}
                        className="ml-2 rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Remove ${displayName}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Nickname */}
                    <div className="mt-2">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editNickname}
                            onChange={(e) => setEditNickname(e.target.value)}
                            maxLength={30}
                            className="flex-1 rounded-lg border border-border bg-surface px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveNickname(vehicle.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveNickname(vehicle.id)}
                            className="rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-white"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEditNickname(vehicle.id, vehicle.nickname)}
                          className="text-xs text-text-tertiary transition-colors hover:text-accent"
                        >
                          {vehicle.nickname || 'Add nickname...'}
                        </button>
                      )}
                    </div>

                    {isActive && (
                      <div className="mt-2">
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                          Active
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Vehicle */}
          <div className="mt-4">
            {showAddForm ? (
              <div className="rounded-xl border border-border bg-surface-light p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Add Vehicle
                </p>
                <VehicleSelector
                  onVehicleSelected={handleAddVehicle}
                  onCancel={() => setShowAddForm(false)}
                  disabled={isFull}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                disabled={isFull}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary"
              >
                <Plus className="h-4 w-4" />
                {isFull ? 'Garage full (5 max)' : 'Add Another Vehicle'}
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
