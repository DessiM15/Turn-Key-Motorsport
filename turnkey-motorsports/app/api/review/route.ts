import { z } from 'zod';

const ReviewSchema = z.object({
  customerName: z.string().min(1),
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  rating: z.number().min(1).max(5),
  text: z.string().min(20),
  serviceType: z.string().optional(),
});

export async function POST(req: Request) {
  // 1. Parse and validate input
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ReviewSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 2. No auth check — public review submission

  // 3. Business logic
  try {
    // TODO: Save to database for moderation
    // TODO: Send notification to admin for review approval
    // TODO: Add rate limiting for production
    // TODO: Add spam detection / honeypot field

    console.log('[POST /api/review] Review submitted:', {
      name: parsed.data.customerName,
      vehicle: `${parsed.data.vehicleYear} ${parsed.data.vehicleMake} ${parsed.data.vehicleModel}`,
      rating: parsed.data.rating,
      service: parsed.data.serviceType,
    });

    return Response.json({
      success: true,
      message: 'Review submitted. It will be published after moderation.',
    });
  } catch (err) {
    console.error('[POST /api/review]', err);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
