'use client';

import { useState } from 'react';
import { Car, ChevronDown, X, Warehouse } from 'lucide-react';
import { useGarage } from '@/lib/garage-context';
import VehicleSelector from './VehicleSelector';

export default function GarageBar() {
  const {
    vehicles,
    activeVehicle,
    addVehicle,
    clearActiveVehicle,
    toggleGarage,
  } = useGarage();

  const [showSelector, setShowSelector] = useState(false);

  const handleVehicleSelected = (vehicle: Parameters<typeof addVehicle>[0]) => {
    addVehicle(vehicle);
    setShowSelector(false);
  };

  const handleChange = () => {
    setShowSelector(true);
  };

  const handleClear = () => {
    clearActiveVehicle();
    setShowSelector(false);
  };

  const isFull = vehicles.length >= 5;

  // Compact mode — vehicle is selected
  if (activeVehicle && !showSelector) {
    const displayName = `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} ${activeVehicle.engine}`;

    return (
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Car className="h-4 w-4 shrink-0 text-accent" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-secondary">Shopping for:</span>
              <span className="font-semibold text-white">{displayName}</span>
              {activeVehicle.nickname && (
                <span className="text-text-tertiary">({activeVehicle.nickname})</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {vehicles.length > 1 && (
              <button
                type="button"
                onClick={toggleGarage}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs text-text-secondary transition-colors hover:text-white"
              >
                <Warehouse className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Garage</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {vehicles.length}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={handleChange}
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-secondary transition-colors hover:text-white"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg p-1 text-text-tertiary transition-colors hover:text-white"
              aria-label="Clear vehicle"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Selector mode — no vehicle or user clicked "Change"
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-white">Select Your Vehicle</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-tertiary" />
          </div>

          {vehicles.length > 0 && (
            <button
              type="button"
              onClick={toggleGarage}
              className="flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-accent"
            >
              <Warehouse className="h-3.5 w-3.5" />
              My Garage ({vehicles.length})
            </button>
          )}
        </div>

        <VehicleSelector
          onVehicleSelected={handleVehicleSelected}
          onCancel={activeVehicle ? () => setShowSelector(false) : undefined}
          disabled={isFull}
        />

        {isFull && (
          <p className="mt-2 text-xs text-warning">
            Garage full (5 max). Remove a vehicle to add a new one.
          </p>
        )}
      </div>
    </div>
  );
}
