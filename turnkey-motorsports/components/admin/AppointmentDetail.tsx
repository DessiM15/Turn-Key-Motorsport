'use client';

import { Calendar, Clock, User, Phone, Mail, Wrench, Car, MessageSquare } from 'lucide-react';
import type { AppointmentRequest, AppointmentStatus } from '@/lib/types';

interface AppointmentDetailProps {
  appointment: AppointmentRequest;
  onAction: (ref: string, status: AppointmentStatus) => void;
  onReschedule: () => void;
}

function formatDetailDate(dateStr: string): string {
  if (dateStr.includes('-') && dateStr.length === 10) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return dateStr;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AppointmentDetail({ appointment }: AppointmentDetailProps) {
  const contactMethodLabel =
    appointment.preferredContact === 'call'
      ? 'Phone Call'
      : appointment.preferredContact === 'text'
        ? 'Text Message'
        : 'Email';

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <User className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="font-medium text-white">{appointment.name}</p>
            <p className="text-text-tertiary">{appointment.email}</p>
            <p className="text-text-tertiary">{appointment.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Car className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-text-secondary">
            {appointment.vehicleYear} {appointment.vehicleMake} {appointment.vehicleModel}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-text-secondary">
            Preferred: {contactMethodLabel}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-text-secondary">
            {formatDetailDate(appointment.appointmentDate)}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-text-secondary">{appointment.appointmentTime}</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            {appointment.servicesRequested.map((s) => (
              <p key={s} className="text-text-secondary">{s}</p>
            ))}
          </div>
        </div>
      </div>

      {appointment.projectDescription && (
        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">Project Description</p>
          <p className="mt-1 text-sm text-text-secondary">{appointment.projectDescription}</p>
        </div>
      )}

      <div className="sm:col-span-2">
        <p className="text-xs text-text-tertiary">
          Submitted {formatTimestamp(appointment.submittedAt)}
        </p>
      </div>
    </div>
  );
}
