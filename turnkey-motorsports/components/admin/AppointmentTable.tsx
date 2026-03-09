'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import AppointmentDetail from './AppointmentDetail';
import RescheduleModal from './RescheduleModal';
import type { AppointmentRequest, AppointmentStatus } from '@/lib/types';

const STATUS_FILTERS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'rescheduled', label: 'Rescheduled' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_BADGE: Record<AppointmentStatus, { variant: 'neutral' | 'warning' | 'success' | 'accent'; label: string }> = {
  submitted: { variant: 'neutral', label: 'Submitted' },
  pending: { variant: 'warning', label: 'Pending' },
  confirmed: { variant: 'success', label: 'Confirmed' },
  rescheduled: { variant: 'accent', label: 'Rescheduled' },
  cancelled: { variant: 'neutral', label: 'Cancelled' },
};

function formatDate(dateStr: string): string {
  if (dateStr.includes('-') && dateStr.length === 10) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return dateStr;
}

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<AppointmentRequest | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/appointments');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setAppointments(data.appointments);
    } catch {
      setError('Failed to load appointments.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleStatusChange = async (ref: string, newStatus: AppointmentStatus) => {
    try {
      const res = await fetch(`/api/admin/appointments/${encodeURIComponent(ref)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchAppointments();
    } catch {
      setError('Failed to update appointment.');
    }
  };

  const handleRescheduleComplete = () => {
    setRescheduleTarget(null);
    fetchAppointments();
  };

  // Client-side filtering
  const filtered = appointments.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const searchable = [
        a.name, a.email, a.phone, a.referenceNumber,
        `${a.vehicleYear} ${a.vehicleMake} ${a.vehicleModel}`,
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });

  const getActions = (appointment: AppointmentRequest) => {
    const { status, referenceNumber } = appointment;
    const actions: Array<{ label: string; variant: 'primary' | 'secondary' | 'ghost'; onClick: () => void; className?: string }> = [];

    if (status === 'submitted' || status === 'pending') {
      actions.push({ label: 'Confirm', variant: 'primary', onClick: () => handleStatusChange(referenceNumber, 'confirmed'), className: 'bg-success hover:bg-success/80 text-white' });
      actions.push({ label: 'Reschedule', variant: 'secondary', onClick: () => setRescheduleTarget(appointment) });
      actions.push({ label: 'Deny', variant: 'ghost', onClick: () => handleStatusChange(referenceNumber, 'cancelled'), className: 'text-error hover:bg-error/10' });
    } else if (status === 'confirmed') {
      actions.push({ label: 'Reschedule', variant: 'secondary', onClick: () => setRescheduleTarget(appointment) });
      actions.push({ label: 'Cancel', variant: 'ghost', onClick: () => handleStatusChange(referenceNumber, 'cancelled'), className: 'text-error hover:bg-error/10' });
    } else if (status === 'rescheduled') {
      actions.push({ label: 'Confirm', variant: 'primary', onClick: () => handleStatusChange(referenceNumber, 'confirmed'), className: 'bg-success hover:bg-success/80 text-white' });
      actions.push({ label: 'Cancel', variant: 'ghost', onClick: () => handleStatusChange(referenceNumber, 'cancelled'), className: 'text-error hover:bg-error/10' });
    } else if (status === 'cancelled') {
      actions.push({ label: 'Reopen', variant: 'ghost', onClick: () => handleStatusChange(referenceNumber, 'submitted') });
    }

    return actions;
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200',
                statusFilter === f.value
                  ? 'bg-accent text-white'
                  : 'bg-surface-light text-text-secondary hover:text-white'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-56 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-light py-2 pl-9 pr-3 text-sm text-white placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Search appointments"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={fetchAppointments} isLoading={isLoading}>
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          </Button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-error" role="alert">{error}</p>
      )}

      {/* Loading */}
      {isLoading && appointments.length === 0 && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-16 text-center">
          <p className="text-text-secondary">
            {appointments.length === 0
              ? 'No appointments yet.'
              : 'No appointments match your filters.'}
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {!isLoading && filtered.length > 0 && (
        <div className="hidden overflow-hidden rounded-xl border border-border md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Ref</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Customer</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Vehicle</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Date</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Services</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => {
                const badge = STATUS_BADGE[apt.status];
                const isExpanded = expandedRef === apt.referenceNumber;
                const actions = getActions(apt);

                return (
                  <tr key={apt.referenceNumber} className="group">
                    <td colSpan={7} className="p-0">
                      <div
                        className={cn(
                          'border-b border-border transition-colors duration-200 hover:bg-surface-light',
                          isExpanded && 'border-l-2 border-l-accent bg-surface-light'
                        )}
                      >
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => setExpandedRef(isExpanded ? null : apt.referenceNumber)}
                            className="flex items-center px-4 py-3"
                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                          >
                            {isExpanded
                              ? <ChevronDown className="h-4 w-4 text-accent" />
                              : <ChevronRight className="h-4 w-4 text-text-tertiary" />
                            }
                          </button>
                          <div className="flex flex-1 items-center">
                            <span className="w-28 shrink-0 px-2 font-mono text-xs text-accent">{apt.referenceNumber}</span>
                            <div className="w-40 shrink-0 px-2">
                              <p className="text-white">{apt.name}</p>
                              <p className="text-xs text-text-tertiary">{apt.email}</p>
                            </div>
                            <span className="w-44 shrink-0 px-2 text-text-secondary">
                              {apt.vehicleYear} {apt.vehicleMake} {apt.vehicleModel}
                            </span>
                            <span className="w-28 shrink-0 px-2 text-text-secondary">
                              {formatDate(apt.appointmentDate)} {apt.appointmentTime}
                            </span>
                            <div className="w-36 shrink-0 px-2">
                              <span className="text-text-secondary">{apt.servicesRequested[0]}</span>
                              {apt.servicesRequested.length > 1 && (
                                <Badge variant="neutral" size="sm" className="ml-1">
                                  +{apt.servicesRequested.length - 1}
                                </Badge>
                              )}
                            </div>
                            <div className="w-28 shrink-0 px-2">
                              <Badge
                                variant={badge.variant}
                                size="sm"
                                className={apt.status === 'cancelled' ? 'text-error border-error/30 bg-error/15' : ''}
                              >
                                {badge.label}
                              </Badge>
                            </div>
                            <div className="flex gap-1.5 px-2">
                              {actions.map((action) => (
                                <Button
                                  key={action.label}
                                  variant={action.variant}
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                  }}
                                  className={action.className}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <AppointmentDetail appointment={apt} onAction={handleStatusChange} onReschedule={() => setRescheduleTarget(apt)} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      {!isLoading && filtered.length > 0 && (
        <div className="space-y-3 md:hidden">
          {filtered.map((apt) => {
            const badge = STATUS_BADGE[apt.status];
            const isExpanded = expandedRef === apt.referenceNumber;
            const actions = getActions(apt);

            return (
              <div
                key={apt.referenceNumber}
                className={cn(
                  'rounded-xl border border-border bg-surface transition-colors duration-200',
                  isExpanded && 'border-l-2 border-l-accent'
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedRef(isExpanded ? null : apt.referenceNumber)}
                  className="flex w-full items-start justify-between p-4 text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-accent">{apt.referenceNumber}</span>
                      <Badge
                        variant={badge.variant}
                        size="sm"
                        className={apt.status === 'cancelled' ? 'text-error border-error/30 bg-error/15' : ''}
                      >
                        {badge.label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">{apt.name}</p>
                    <p className="text-xs text-text-tertiary">
                      {apt.vehicleYear} {apt.vehicleMake} {apt.vehicleModel}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {formatDate(apt.appointmentDate)} at {apt.appointmentTime}
                    </p>
                  </div>
                  {isExpanded
                    ? <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    : <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-text-tertiary" />
                  }
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-4 pb-4 pt-3">
                    <AppointmentDetail appointment={apt} onAction={handleStatusChange} onReschedule={() => setRescheduleTarget(apt)} />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {actions.map((action) => (
                        <Button
                          key={action.label}
                          variant={action.variant}
                          size="sm"
                          onClick={action.onClick}
                          className={action.className}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          onClose={() => setRescheduleTarget(null)}
          onComplete={handleRescheduleComplete}
        />
      )}
    </div>
  );
}
