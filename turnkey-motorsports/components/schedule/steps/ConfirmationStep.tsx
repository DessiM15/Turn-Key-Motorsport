'use client';

import Link from 'next/link';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AccountBanner from '@/components/prompts/AccountBanner';

interface ConfirmationStepProps {
  referenceNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  name: string;
  email?: string;
  phone?: string;
  onScheduleAnother: () => void;
}

function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ConfirmationStep({
  referenceNumber,
  appointmentDate,
  appointmentTime,
  name,
  email,
  phone,
  onScheduleAnother,
}: ConfirmationStepProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <CheckCircle className="mb-6 h-16 w-16 text-success" />

      <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
        Appointment Submitted
      </h3>

      <p className="mt-3 max-w-md text-text-secondary">
        Thank you, {name}! Your appointment request has been received.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 text-left sm:min-w-[400px]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Reference
          </span>
          <span className="font-display text-lg font-bold text-accent">
            {referenceNumber}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3 text-sm text-text-secondary">
          <Calendar className="h-4 w-4 shrink-0 text-accent" />
          <span>{formatDisplayDate(appointmentDate)}</span>
        </div>

        <div className="mb-4 flex items-center gap-3 text-sm text-text-secondary">
          <Clock className="h-4 w-4 shrink-0 text-accent" />
          <span>{appointmentTime}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Status
          </span>
          <Badge variant="warning" size="sm">Submitted — Pending Confirmation</Badge>
        </div>
      </div>

      <p className="mt-6 max-w-md text-sm text-text-tertiary">
        We will confirm your appointment within 1 business day via your preferred contact method.
        This is a demo — no real appointment was created.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" size="md" onClick={onScheduleAnother}>
          Schedule Another
        </Button>
        <Link href="/services">
          <Button variant="secondary" size="md">
            Back to Services
          </Button>
        </Link>
      </div>

      <div className="mt-4 w-full max-w-md">
        <AccountBanner
          promptId="appointment-account"
          heading="Create an account to check your appointment status"
          description="Track your appointment anytime without needing your reference number."
          prefillName={name}
          prefillEmail={email}
          prefillPhone={phone}
        />
      </div>
    </div>
  );
}
