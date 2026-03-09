import { createHmac, timingSafeEqual } from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'dev-fallback-secret-change-me';
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

interface TokenPayload {
  ts: number;
  sig: string;
}

function sign(timestamp: number): string {
  return createHmac('sha256', ADMIN_SECRET)
    .update(String(timestamp))
    .digest('hex');
}

export function createSessionToken(): string {
  const ts = Date.now();
  const sig = sign(ts);
  const payload: TokenPayload = { ts, sig };
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const payload: TokenPayload = JSON.parse(decoded);

    if (typeof payload.ts !== 'number' || typeof payload.sig !== 'string') {
      return false;
    }

    // Check expiry
    if (Date.now() - payload.ts > TOKEN_MAX_AGE_MS) {
      return false;
    }

    // Verify signature
    const expected = sign(payload.ts);
    const sigBuf = Buffer.from(payload.sig, 'utf-8');
    const expectedBuf = Buffer.from(expected, 'utf-8');

    if (sigBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const inputBuf = Buffer.from(input, 'utf-8');
  const passwordBuf = Buffer.from(adminPassword, 'utf-8');

  if (inputBuf.length !== passwordBuf.length) return false;
  return timingSafeEqual(inputBuf, passwordBuf);
}

export const COOKIE_NAME = 'admin-session';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/admin',
  maxAge: 60 * 60 * 24, // 24 hours in seconds
};
