'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import {
  getAvailableYears,
  getMakesForYear,
  getModelsForYearMake,
  getEnginesForYearMakeModel,
} from '@/lib/data/garage-data';
import type { GarageVehicle } from '@/lib/types';

interface VehicleSelectorProps {
  onVehicleSelected: (vehicle: Omit<GarageVehicle, 'id'>) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export default function VehicleSelector({
  onVehicleSelected,
  onCancel,
  disabled,
}: VehicleSelectorProps) {
  const [year, setYear] = useState<number | null>(null);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [engine, setEngine] = useState('');
  const [nickname, setNickname] = useState('');

  const years = useMemo(() => getAvailableYears(), []);
  const makes = useMemo(() => (year ? getMakesForYear(year) : []), [year]);
  const models = useMemo(
    () => (year && make ? getModelsForYearMake(year, make) : []),
    [year, make],
  );
  const engines = useMemo(
    () => (year && make && model ? getEnginesForYearMakeModel(year, make, model) : []),
    [year, make, model],
  );

  const canSubmit = year !== null && make && model && engine && !disabled;

  const handleYearChange = (value: string) => {
    const y = value ? parseInt(value, 10) : null;
    setYear(y);
    setMake('');
    setModel('');
    setEngine('');
  };

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel('');
    setEngine('');
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setEngine('');
  };

  const handleSubmit = () => {
    if (!canSubmit || !year) return;
    onVehicleSelected({
      year,
      make,
      model,
      engine,
      nickname: nickname.trim(),
    });
    // Reset
    setYear(null);
    setMake('');
    setModel('');
    setEngine('');
    setNickname('');
  };

  const selectClass =
    'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-40';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-2">
      {/* Year */}
      <div className="flex-1">
        <label htmlFor="garage-year" className="mb-1 block text-xs text-text-tertiary">
          Year
        </label>
        <select
          id="garage-year"
          value={year ?? ''}
          onChange={(e) => handleYearChange(e.target.value)}
          className={selectClass}
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Make */}
      <div className="flex-1">
        <label htmlFor="garage-make" className="mb-1 block text-xs text-text-tertiary">
          Make
        </label>
        <select
          id="garage-make"
          value={make}
          onChange={(e) => handleMakeChange(e.target.value)}
          disabled={!year}
          className={selectClass}
        >
          <option value="">Select Make</option>
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div className="flex-1">
        <label htmlFor="garage-model" className="mb-1 block text-xs text-text-tertiary">
          Model
        </label>
        <select
          id="garage-model"
          value={model}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={!make}
          className={selectClass}
        >
          <option value="">Select Model</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Engine */}
      <div className="flex-1">
        <label htmlFor="garage-engine" className="mb-1 block text-xs text-text-tertiary">
          Engine
        </label>
        <select
          id="garage-engine"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          disabled={!model}
          className={selectClass}
        >
          <option value="">Select Engine</option>
          {engines.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      {/* Nickname */}
      <div className="sm:w-36">
        <label htmlFor="garage-nickname" className="mb-1 block text-xs text-text-tertiary">
          Nickname
        </label>
        <input
          id="garage-nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="e.g., Daily Driver"
          maxLength={30}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:shrink-0">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
