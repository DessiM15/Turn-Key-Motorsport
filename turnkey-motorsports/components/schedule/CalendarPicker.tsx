'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AVAILABLE_TIME_SLOTS } from '@/lib/constants';

interface CalendarPickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getMockUnavailableSlots(dateStr: string): Set<string> {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  const unavailable = new Set<string>();
  AVAILABLE_TIME_SLOTS.forEach((slot, idx) => {
    if ((hash >> idx) & 1) {
      unavailable.add(slot);
    }
  });
  if (unavailable.size === AVAILABLE_TIME_SLOTS.length) {
    unavailable.delete(AVAILABLE_TIME_SLOTS[0]);
  }
  return unavailable;
}

export default function CalendarPicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: CalendarPickerProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const days: Array<{ date: Date; dateStr: string; inMonth: boolean }> = [];

    for (let i = 0; i < startOffset; i++) {
      const d = new Date(viewYear, viewMonth, -startOffset + i + 1);
      days.push({ date: d, dateStr: toDateString(d), inMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(viewYear, viewMonth, i);
      days.push({ date: d, dateStr: toDateString(d), inMonth: true });
    }

    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(viewYear, viewMonth + 1, i);
        days.push({ date: d, dateStr: toDateString(d), inMonth: false });
      }
    }

    return days;
  }, [viewMonth, viewYear]);

  const unavailableSlots = useMemo(
    () => (selectedDate ? getMockUnavailableSlots(selectedDate) : new Set<string>()),
    [selectedDate]
  );

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDaySelectable = (date: Date, inMonth: boolean): boolean => {
    if (!inMonth) return false;
    const day = date.getDay();
    if (day === 0 || day === 6) return false;
    if (date < today) return false;
    if (date > maxDate) return false;
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={!canGoPrev}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors duration-200',
            canGoPrev
              ? 'text-text-secondary hover:border-accent hover:text-accent'
              : 'cursor-not-allowed text-text-tertiary opacity-40'
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium uppercase tracking-wider text-text-tertiary"
          >
            {day}
          </div>
        ))}

        {/* Calendar Grid */}
        {calendarDays.map(({ date, dateStr, inMonth }) => {
          const selectable = isDaySelectable(date, inMonth);
          const isSelected = dateStr === selectedDate;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isToday = dateStr === toDateString(today);

          return (
            <button
              key={dateStr + (inMonth ? '-in' : '-out')}
              type="button"
              onClick={() => {
                if (selectable) {
                  onDateSelect(dateStr);
                  onTimeSelect('');
                }
              }}
              disabled={!selectable}
              aria-label={`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}${!selectable ? ' (unavailable)' : ''}${isSelected ? ' (selected)' : ''}`}
              aria-pressed={isSelected}
              className={cn(
                'relative flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors duration-200',
                !inMonth && 'text-text-tertiary/30',
                inMonth && !selectable && isWeekend && 'text-text-tertiary/50',
                inMonth && !selectable && !isWeekend && 'text-text-tertiary/50',
                inMonth && selectable && !isSelected && 'text-text-secondary hover:bg-surface-light hover:text-white',
                isSelected && 'bg-accent text-white font-bold',
                isToday && !isSelected && inMonth && 'ring-1 ring-accent/50'
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-white">
            Available Times
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AVAILABLE_TIME_SLOTS.map((slot) => {
              const isUnavailable = unavailableSlots.has(slot);
              const isSelected = slot === selectedTime;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    if (!isUnavailable) onTimeSelect(slot);
                  }}
                  disabled={isUnavailable}
                  aria-label={`${slot}${isUnavailable ? ' (unavailable)' : ''}${isSelected ? ' (selected)' : ''}`}
                  aria-pressed={isSelected}
                  className={cn(
                    'rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                    isUnavailable && 'cursor-not-allowed border-border bg-surface text-text-tertiary/50 line-through',
                    !isUnavailable && !isSelected && 'border-border bg-surface text-text-secondary hover:border-accent hover:text-accent',
                    isSelected && 'border-accent bg-accent text-white'
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
