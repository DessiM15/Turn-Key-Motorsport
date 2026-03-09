'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import CalendarPicker from '@/components/schedule/CalendarPicker';
import type { AppointmentRequest } from '@/lib/types';

interface RescheduleModalProps {
  appointment: AppointmentRequest;
  onClose: () => void;
  onComplete: () => void;
}

export default function RescheduleModal({ appointment, onClose, onComplete }: RescheduleModalProps) {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!newDate || !newTime) {
      setError('Please select both a date and time.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/appointments/${encodeURIComponent(appointment.referenceNumber)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rescheduled',
          newDate,
          newTime,
        }),
      });

      if (!res.ok) throw new Error('Failed to reschedule');
      onComplete();
    } catch {
      setError('Failed to reschedule. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Reschedule Appointment" size="lg">
      <div className="mb-6 rounded-lg border border-border bg-surface-light p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-accent">{appointment.referenceNumber}</span>
          <span className="text-sm text-text-secondary">{appointment.name}</span>
        </div>
        <p className="mt-1 text-xs text-text-tertiary">
          Currently: {appointment.appointmentDate} at {appointment.appointmentTime}
        </p>
      </div>

      <CalendarPicker
        selectedDate={newDate}
        selectedTime={newTime}
        onDateSelect={(d) => {
          setNewDate(d);
          setNewTime('');
          setError('');
        }}
        onTimeSelect={(t) => {
          setNewTime(t);
          setError('');
        }}
      />

      {error && (
        <p className="mt-4 text-sm text-error" role="alert">{error}</p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" size="md" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleConfirm}
          isLoading={isSubmitting}
          disabled={!newDate || !newTime}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rescheduling...
            </>
          ) : (
            'Confirm Reschedule'
          )}
        </Button>
      </div>
    </Modal>
  );
}
