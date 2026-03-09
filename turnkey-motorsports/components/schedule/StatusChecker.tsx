'use client';

import { useState } from 'react';
import { ChevronDown, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { AppointmentStatus } from '@/lib/types';

const STATUS_BADGE_MAP: Record<AppointmentStatus, { variant: 'neutral' | 'warning' | 'success' | 'accent'; label: string }> = {
  submitted: { variant: 'neutral', label: 'Submitted' },
  pending: { variant: 'warning', label: 'Pending Confirmation' },
  confirmed: { variant: 'success', label: 'Confirmed' },
  rescheduled: { variant: 'accent', label: 'Rescheduled' },
  cancelled: { variant: 'neutral', label: 'Cancelled' },
};

interface StatusResult {
  status: AppointmentStatus;
  referenceNumber: string;
  appointmentDate: string;
  appointmentTime: string;
}

export default function StatusChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [refInput, setRefInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!refInput.trim()) {
      setError('Please enter a reference number');
      return;
    }

    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/booking?ref=${encodeURIComponent(refInput.trim())}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('No appointment found with that reference number.');
        } else {
          setError('Something went wrong. Please try again.');
        }
        return;
      }
      const data: StatusResult = await response.json();
      setResult(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const badgeInfo = result ? STATUS_BADGE_MAP[result.status] : null;

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-left transition-colors duration-200 hover:border-border-light"
      >
        <span className="text-sm font-medium text-text-secondary">
          Already have an appointment? Check your status
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-text-tertiary transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="mt-2 rounded-xl border border-border bg-surface p-5">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="TKM-XXXXX"
              value={refInput}
              onChange={(e) => {
                setRefInput(e.target.value.toUpperCase());
                setError('');
                setResult(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCheck();
              }}
              className="flex-1 rounded-lg border border-border bg-surface-light px-4 py-2.5 text-sm text-white placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Appointment reference number"
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handleCheck}
              isLoading={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="mr-1.5 h-4 w-4" />
                  Check
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-error" role="alert">{error}</p>
          )}

          {result && badgeInfo && (
            <div className="mt-4 rounded-lg border border-border bg-surface-light p-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-white">
                  {result.referenceNumber}
                </span>
                <Badge variant={badgeInfo.variant} size="sm">
                  {badgeInfo.label}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-text-tertiary">
                {result.appointmentDate} at {result.appointmentTime}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
