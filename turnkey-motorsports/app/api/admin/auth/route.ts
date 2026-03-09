import { z } from 'zod';
import { cookies } from 'next/headers';
import { verifyPassword, createSessionToken, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/admin-auth';

const LoginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

// Simple in-memory rate limiter
const failedAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function isRateLimited(ip: string): { limited: boolean; retryAfterMs: number } {
  const record = failedAttempts.get(ip);
  if (!record) return { limited: false, retryAfterMs: 0 };

  const elapsed = Date.now() - record.firstAttempt;
  if (elapsed > WINDOW_MS) {
    failedAttempts.delete(ip);
    return { limited: false, retryAfterMs: 0 };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { limited: true, retryAfterMs: WINDOW_MS - elapsed };
  }

  return { limited: false, retryAfterMs: 0 };
}

function recordFailure(ip: string): void {
  const record = failedAttempts.get(ip);
  if (!record || Date.now() - record.firstAttempt > WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    record.count++;
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateCheck = isRateLimited(ip);

  if (rateCheck.limited) {
    const retryMinutes = Math.ceil(rateCheck.retryAfterMs / 60000);
    return Response.json(
      { error: `Too many attempts. Try again in ${retryMinutes} minute${retryMinutes === 1 ? '' : 's'}.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Password is required' }, { status: 400 });
  }

  if (!verifyPassword(parsed.data.password)) {
    recordFailure(ip);
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Clear any failure records on success
  failedAttempts.delete(ip);

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return Response.json({ success: true });
}
