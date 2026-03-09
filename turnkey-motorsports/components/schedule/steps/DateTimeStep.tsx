'use client';

import CalendarPicker from '@/components/schedule/CalendarPicker';

interface DateTimeStepProps {
  appointmentDate: string;
  appointmentTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  errors: Record<string, string>;
}

export default function DateTimeStep({
  appointmentDate,
  appointmentTime,
  onDateSelect,
  onTimeSelect,
  errors,
}: DateTimeStepProps) {
  return (
    <div>
      <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-wide text-white">
        Pick a Date &amp; Time
      </h3>
      <p className="mb-6 text-sm text-text-secondary">
        Choose a weekday that works for you. We are open Mon&ndash;Fri, 9 AM&ndash;6 PM.
      </p>

      {(errors.appointmentDate || errors.appointmentTime) && (
        <p className="mb-4 text-sm text-error" role="alert">
          {errors.appointmentDate ?? errors.appointmentTime}
        </p>
      )}

      <CalendarPicker
        selectedDate={appointmentDate}
        selectedTime={appointmentTime}
        onDateSelect={onDateSelect}
        onTimeSelect={onTimeSelect}
      />
    </div>
  );
}
