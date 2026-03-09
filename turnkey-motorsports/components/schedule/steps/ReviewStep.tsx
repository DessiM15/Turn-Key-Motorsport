'use client';

import { Calendar, Clock, Car, Wrench, User } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ReviewStepProps {
  data: {
    servicesRequested: string[];
    projectDescription: string;
    vehicleYear: string;
    vehicleMake: string;
    vehicleModel: string;
    appointmentDate: string;
    appointmentTime: string;
    name: string;
    email: string;
    phone: string;
    preferredContact: string;
  };
  onEditStep: (step: number) => void;
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

export default function ReviewStep({ data, onEditStep }: ReviewStepProps) {
  const sections = [
    {
      icon: Wrench,
      title: 'Services',
      step: 0,
      content: (
        <div className="space-y-1">
          {data.servicesRequested.map((s) => (
            <p key={s} className="text-sm text-text-secondary">{s}</p>
          ))}
          {data.projectDescription && (
            <p className="mt-2 text-sm italic text-text-tertiary">
              &ldquo;{data.projectDescription}&rdquo;
            </p>
          )}
        </div>
      ),
    },
    {
      icon: Car,
      title: 'Vehicle',
      step: 1,
      content: (
        <p className="text-sm text-text-secondary">
          {data.vehicleYear} {data.vehicleMake} {data.vehicleModel}
        </p>
      ),
    },
    {
      icon: Calendar,
      title: 'Appointment',
      step: 2,
      content: (
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span>{formatDisplayDate(data.appointmentDate)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {data.appointmentTime}
          </span>
        </div>
      ),
    },
    {
      icon: User,
      title: 'Contact',
      step: 3,
      content: (
        <div className="space-y-1 text-sm text-text-secondary">
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p className="capitalize text-text-tertiary">
            Preferred: {data.preferredContact === 'call' ? 'Phone Call' : data.preferredContact === 'text' ? 'Text Message' : 'Email'}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-wide text-white">
        Review Your Appointment
      </h3>
      <p className="mb-6 text-sm text-text-secondary">
        Make sure everything looks right before submitting.
      </p>

      <div className="space-y-4">
        {sections.map(({ icon: Icon, title, step, content }) => (
          <div
            key={title}
            className="flex items-start justify-between rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="mb-1 font-display text-sm font-bold uppercase tracking-wider text-white">
                  {title}
                </h4>
                {content}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(step)}
              className="shrink-0 text-accent"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
