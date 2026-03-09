import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/lib/admin-auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: 0,
  });

  return Response.json({ success: true });
}
