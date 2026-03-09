import { z } from 'zod';
import type { NextRequest } from 'next/server';
import { getAppointmentByRef, addAppointment } from '@/lib/data/appointments';
import type { AppointmentRequest } from '@/lib/types';

const BookingRequestSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  // Support both legacy and new field names
  servicesInterested: z.array(z.string()).min(1).optional(),
  servicesRequested: z.array(z.string()).min(1).optional(),
  description: z.string().min(10).optional(),
  projectDescription: z.string().optional(),
  preferredContact: z.enum(['call', 'email', 'text']),
  // New scheduling fields
  appointmentDate: z.string().optional(),
  appointmentTime: z.string().optional(),
  referenceNumber: z.string().optional(),
  status: z.string().optional(),
  submittedAt: z.string().optional(),
}).refine(
  (data) => (data.servicesInterested?.length ?? 0) > 0 || (data.servicesRequested?.length ?? 0) > 0,
  { message: 'At least one service must be selected', path: ['servicesRequested'] }
);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = BookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const data = parsed.data;
    const services = data.servicesRequested ?? data.servicesInterested ?? [];

    // Add to mock data store so admin can see it
    if (data.referenceNumber && data.appointmentDate && data.appointmentTime) {
      const appointment: AppointmentRequest = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredContact: data.preferredContact,
        vehicleYear: data.vehicleYear,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        servicesRequested: services,
        projectDescription: data.projectDescription ?? data.description ?? '',
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        referenceNumber: data.referenceNumber,
        status: 'submitted',
        submittedAt: data.submittedAt ?? new Date().toISOString(),
      };
      addAppointment(appointment);
    }

    console.log('[POST /api/booking] Appointment request received:', {
      name: data.name,
      email: data.email,
      vehicle: `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`,
      services,
      preferredContact: data.preferredContact,
      appointmentDate: data.appointmentDate ?? 'N/A',
      appointmentTime: data.appointmentTime ?? 'N/A',
      referenceNumber: data.referenceNumber ?? 'N/A',
    });

    return Response.json({
      success: true,
      message: 'Appointment request received. We will contact you within 1 business day.',
      referenceNumber: data.referenceNumber,
    });
  } catch (err) {
    console.error('[POST /api/booking]', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref');

  if (!ref || ref.trim().length === 0) {
    return Response.json({ error: 'Reference number is required' }, { status: 400 });
  }

  // Look up in mock data store
  const appointment = getAppointmentByRef(ref.trim());

  if (appointment) {
    return Response.json({
      referenceNumber: appointment.referenceNumber,
      status: appointment.status,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
    });
  }

  return Response.json({ error: 'Appointment not found' }, { status: 404 });
}
