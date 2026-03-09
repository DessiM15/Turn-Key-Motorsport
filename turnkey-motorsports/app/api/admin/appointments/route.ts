import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/admin-auth';
import { getAllAppointments } from '@/lib/data/appointments';
import type { AppointmentStatus } from '@/lib/types';

const VALID_STATUSES: AppointmentStatus[] = ['submitted', 'pending', 'confirmed', 'rescheduled', 'cancelled'];

export async function GET(req: NextRequest) {
  // Server-side auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const statusFilter = req.nextUrl.searchParams.get('status');
  let appointments = getAllAppointments();

  if (statusFilter && VALID_STATUSES.includes(statusFilter as AppointmentStatus)) {
    appointments = appointments.filter((a) => a.status === statusFilter);
  }

  return Response.json({ appointments });
}
