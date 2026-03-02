import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    // TODO: Send email notification (SendGrid / Resend)
    // TODO: Add rate limiting for production
    console.log('[POST /api/contact] Message received:', { name: parsed.data.name, email: parsed.data.email, subject: parsed.data.subject });
    return Response.json({ success: true, message: 'Message received. We will respond within 1 business day.' });
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
