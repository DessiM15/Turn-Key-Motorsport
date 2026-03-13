// ============================================================
// Turn-Key Motorsport — Chat Utilities
// ============================================================

/**
 * Check if the current time falls within business hours.
 * Mon–Fri 9:00 AM – 6:00 PM Central Time.
 */
export function isDuringBusinessHours(): boolean {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  if (!weekdays.includes(weekday)) return false;

  const timeInMinutes = hour * 60 + minute;
  const openTime = 9 * 60;   // 9:00 AM
  const closeTime = 18 * 60; // 6:00 PM

  return timeInMinutes >= openTime && timeInMinutes < closeTime;
}

/**
 * Returns a human-readable string for when the shop next opens.
 */
export function getNextOpenTime(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayIndex = weekdays.indexOf(weekday);

  // If it's a weekday and before 6 PM, shop opens today (or already open)
  if (dayIndex >= 0 && dayIndex <= 4 && hour < 18) {
    if (hour < 9) return 'today at 9:00 AM';
    return 'now';
  }

  // Otherwise, find next weekday
  if (dayIndex === 4 && hour >= 18) return 'Monday at 9:00 AM'; // Friday after hours
  if (dayIndex === 5) return 'Monday at 9:00 AM'; // Saturday
  if (dayIndex === 6) return 'Monday at 9:00 AM'; // Sunday

  // Weekday after 6 PM
  return 'tomorrow at 9:00 AM';
}

/**
 * Generate a unique session ID.
 */
export function generateSessionId(): string {
  return crypto.randomUUID();
}
