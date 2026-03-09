'use client';

import { VEHICLE_MAKES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface VehicleStepProps {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  onFieldChange: (field: 'vehicleYear' | 'vehicleMake' | 'vehicleModel', value: string) => void;
  errors: Record<string, string>;
}

export default function VehicleStep({
  vehicleYear,
  vehicleMake,
  vehicleModel,
  onFieldChange,
  errors,
}: VehicleStepProps) {
  const inputClass = (field: string) =>
    cn(
      'w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-tertiary transition-colors duration-200 focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

  return (
    <div>
      <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-wide text-white">
        Your Vehicle
      </h3>
      <p className="mb-6 text-sm text-text-secondary">
        Tell us what you are bringing in.
      </p>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="sched-year" className="mb-2 block text-sm font-medium text-text-secondary">
            Year *
          </label>
          <input
            id="sched-year"
            type="text"
            inputMode="numeric"
            placeholder="2021"
            value={vehicleYear}
            onChange={(e) => onFieldChange('vehicleYear', e.target.value)}
            className={inputClass('vehicleYear')}
            aria-describedby={errors.vehicleYear ? 'sched-year-error' : undefined}
          />
          {errors.vehicleYear && (
            <p id="sched-year-error" className="mt-1 text-sm text-error" role="alert">{errors.vehicleYear}</p>
          )}
        </div>

        <div>
          <label htmlFor="sched-make" className="mb-2 block text-sm font-medium text-text-secondary">
            Make *
          </label>
          <select
            id="sched-make"
            value={vehicleMake}
            onChange={(e) => onFieldChange('vehicleMake', e.target.value)}
            className={inputClass('vehicleMake')}
            aria-describedby={errors.vehicleMake ? 'sched-make-error' : undefined}
          >
            <option value="">Select Make</option>
            {VEHICLE_MAKES.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.vehicleMake && (
            <p id="sched-make-error" className="mt-1 text-sm text-error" role="alert">{errors.vehicleMake}</p>
          )}
        </div>

        <div>
          <label htmlFor="sched-model" className="mb-2 block text-sm font-medium text-text-secondary">
            Model *
          </label>
          <input
            id="sched-model"
            type="text"
            placeholder="Camaro SS"
            value={vehicleModel}
            onChange={(e) => onFieldChange('vehicleModel', e.target.value)}
            className={inputClass('vehicleModel')}
            aria-describedby={errors.vehicleModel ? 'sched-model-error' : undefined}
          />
          {errors.vehicleModel && (
            <p id="sched-model-error" className="mt-1 text-sm text-error" role="alert">{errors.vehicleModel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
