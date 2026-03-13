import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/admin-auth';
import {
  getSession,
  markAiTakeover,
  addMessageToSession,
} from '@/lib/data/chat-sessions';
import type { ChatMessage } from '@/lib/types';

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

export async function POST(_req: Request, { params }: RouteParams) {
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

  markAiTakeover(sessionId);

  // Add system message so customer knows AI is taking over
  const systemMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'system',
    content: 'AI assistant is now helping this customer.',
    timestamp: Date.now(),
  };
  addMessageToSession(sessionId, systemMessage);

  return Response.json({ success: true });
}
