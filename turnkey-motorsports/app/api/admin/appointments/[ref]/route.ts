import { z } from 'zod';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/admin-auth';
import { updateAppointmentStatus } from '@/lib/data/appointments';

const PatchSchema = z.object({
  status: z.enum(['submitted', 'pending', 'confirmed', 'rescheduled', 'cancelled']),
  newDate: z.string().optional(),
  newTime: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  // Server-side auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { ref } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const updated = updateAppointmentStatus(
    ref,
    parsed.data.status,
    parsed.data.newDate,
    parsed.data.newTime
  );

  if (!updated) {
    return Response.json({ error: 'Appointment not found' }, { status: 404 });
  }

  return Response.json({ appointment: updated });
}
