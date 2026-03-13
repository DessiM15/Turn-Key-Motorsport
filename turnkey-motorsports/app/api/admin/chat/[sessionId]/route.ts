import { z } from 'zod';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/admin-auth';
import {
  getSession,
  addMessageToSession,
  setShopReplied,
} from '@/lib/data/chat-sessions';
import type { ChatMessage, AdminChatSession } from '@/lib/types';

const ReplySchema = z.object({
  message: z.string().min(1).max(500),
});

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sessionId } = await params;
  const serverSession = getSession(sessionId);

  if (!serverSession) {
    return Response.json({ error: 'Session not found' }, { status: 404 });
  }

  const session: AdminChatSession = {
    id: serverSession.id,
    messages: serverSession.messages,
    lead: serverSession.lead,
    mode: serverSession.mode,
    startedAt: serverSession.startedAt,
    lastCustomerMessageAt: serverSession.lastCustomerMessageAt,
    lastShopReplyAt: serverSession.lastShopReplyAt,
    isActive: serverSession.isActive,
    aiTakenOver: serverSession.aiTakenOver,
  };

  return Response.json({ session });
}

export async function POST(req: Request, { params }: RouteParams) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sessionId } = await params;
  const session = getSession(sessionId);

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ReplySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const chatMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: parsed.data.message,
    timestamp: Date.now(),
  };

  addMessageToSession(sessionId, chatMessage);
  setShopReplied(sessionId);

  return Response.json({ success: true, message: chatMessage });
}
