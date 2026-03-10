import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin-session';
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_API_PATHS = ['/api/admin/auth', '/api/admin/logout'];

/**
 * Edge-compatible lightweight session check.
 * Full HMAC signature verification happens in the API routes (Node.js runtime).
 * Middleware only checks cookie presence and token expiry.
 */
function isSessionLikelyValid(token: string): boolean {
  try {
    const decoded = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
    const payload: { ts?: number } = JSON.parse(decoded);

    if (typeof payload.ts !== 'number') {
      return false;
    }

    // Check expiry
    if (Date.now() - payload.ts > TOKEN_MAX_AGE_MS) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public admin paths
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }
  if (PUBLIC_API_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  // Check for valid-looking session cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !isSessionLikelyValid(token)) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
