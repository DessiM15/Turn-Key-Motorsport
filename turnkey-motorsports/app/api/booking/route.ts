import { z } from 'zod';

const BookingRequestSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  servicesInterested: z.array(z.string()).min(1),
  description: z.string().min(10),
  preferredContact: z.enum(['call', 'email']),
});

export async function POST(req: Request) {
  // 1. Parse and validate input
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

  // 2. No auth check — public booking endpoint

  // 3. Business logic
  try {
    // TODO: Send notification email to shop (Mailchimp / SendGrid / Resend)
    // TODO: Send confirmation email to customer
    // TODO: Create lead in CRM system
    // TODO: Add rate limiting for production

    console.log('[POST /api/booking] Consultation request received:', {
      name: parsed.data.name,
      email: parsed.data.email,
      vehicle: `${parsed.data.vehicleYear} ${parsed.data.vehicleMake} ${parsed.data.vehicleModel}`,
      services: parsed.data.servicesInterested,
      preferredContact: parsed.data.preferredContact,
    });

    return Response.json({
      success: true,
      message: 'Consultation request received. We will contact you within 1 business day.',
    });
  } catch (err) {
    console.error('[POST /api/booking]', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
