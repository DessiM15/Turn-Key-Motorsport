import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/admin-auth';
import { getAllActiveSessions } from '@/lib/data/chat-sessions';
import type { AdminChatSession } from '@/lib/types';

export async function GET() {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serverSessions = getAllActiveSessions();

  // Map to admin-safe shape (exclude internal fields)
  const sessions: AdminChatSession[] = serverSessions.map((s) => ({
    id: s.id,
    messages: s.messages,
    lead: s.lead,
    mode: s.mode,
    startedAt: s.startedAt,
    lastCustomerMessageAt: s.lastCustomerMessageAt,
    lastShopReplyAt: s.lastShopReplyAt,
    isActive: s.isActive,
    aiTakenOver: s.aiTakenOver,
  }));

  return Response.json({ sessions });
}
