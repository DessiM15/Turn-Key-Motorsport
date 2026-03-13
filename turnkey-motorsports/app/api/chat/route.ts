import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE_BASE } from '@/lib/data/chat-knowledge-base';
import { isDuringBusinessHours } from '@/lib/chat-utils';
import type { ChatMessage, LeadInfo } from '@/lib/types';
import {
  getSession,
  createSession,
  addMessageToSession,
  updateSessionLead,
  getNewMessages,
  updateLastDelivered,
  setSessionMode,
} from '@/lib/data/chat-sessions';

// --- Zod Schema ---

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(2000),
});

const ChatRequestSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(500),
  messages: z.array(MessageSchema).max(50).default([]),
  lead: z.record(z.string(), z.string()).optional(),
});

const PollSchema = z.object({
  sessionId: z.string().min(1),
  after: z.coerce.number().min(0),
});

// --- Constants ---

const SHOP_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

// --- Build system prompt from knowledge base ---

function buildSystemPrompt(): string {
  const kb = KNOWLEDGE_BASE;

  const servicesBlock = kb.services
    .map((s) => `- ${s.name}: ${s.description} (Timeline: ${s.timeline}, Price: ${s.priceRange})`)
    .join('\n');

  const faqBlock = kb.faq
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  const policiesBlock = [
    `Shipping: ${kb.policies.shipping}`,
    `Returns: ${kb.policies.returns}`,
    `Warranty: ${kb.policies.warranty}`,
    `Payment: ${kb.policies.payment}`,
    `Deposits: ${kb.policies.deposits}`,
  ].join('\n');

  return `You are the Turn-Key Motorsport virtual assistant. You help customers with questions about performance parts, engine builds, custom fabrication, EFI tuning, and services.

BUSINESS INFO:
Name: ${kb.business.name}
Tagline: ${kb.business.tagline}
Address: ${kb.business.address}
Phone: ${kb.business.phone}
Email: ${kb.business.email}
Hours: ${kb.business.hours.map((h) => `${h.days}: ${h.time}`).join(', ')}
Platforms: ${kb.business.platforms.join(', ')}

SERVICES:
${servicesBlock}

FAQ:
${faqBlock}

POLICIES:
${policiesBlock}

RULES:
- Be friendly, knowledgeable, and enthusiastic about performance cars
- Answer questions using ONLY the information above. If you don't know, say "I'd recommend calling us at (555) 123-4567 or stopping by the shop for that one"
- Keep responses under 3 sentences unless the question requires more detail
- When a customer mentions their vehicle (year/make/model), acknowledge it and relate your answer to their specific platform
- Naturally encourage customers to share their name and contact info — don't interrogate
- If a customer seems ready to book, suggest the scheduling page: /schedule
- If a customer wants to buy parts, direct them to the shop: /shop
- Never make up prices, timelines, or capabilities not listed above
- You are NOT a mechanic giving diagnostic advice. For specific mechanical questions, recommend they bring the vehicle in
- Always represent Turn-Key positively but honestly

LEAD EXTRACTION:
When the user shares personal info, include it at the END of your response in this exact format (only include fields that were mentioned):
[LEAD_DATA]{"name":"...","phone":"...","email":"...","vehicleYear":"...","vehicleMake":"...","vehicleModel":"...","serviceInterest":"..."}[/LEAD_DATA]`;
}

// --- Parse lead data from AI response ---

function extractLeadData(text: string): { cleanText: string; leadData: Partial<LeadInfo> | null } {
  const leadMatch = text.match(/\[LEAD_DATA\]([\s\S]*?)\[\/LEAD_DATA\]/);
  if (!leadMatch) return { cleanText: text, leadData: null };

  const cleanText = text.replace(/\[LEAD_DATA\][\s\S]*?\[\/LEAD_DATA\]/, '').trim();

  try {
    const parsed = JSON.parse(leadMatch[1]) as Partial<LeadInfo>;
    return { cleanText, leadData: parsed };
  } catch {
    return { cleanText, leadData: null };
  }
}

// --- Determine chat mode ---

function determineChatMode(sessionId: string): 'ai' | 'live' {
  const isBusinessHours = isDuringBusinessHours();
  if (!isBusinessHours) return 'ai';

  const session = getSession(sessionId);
  if (!session) {
    // New session during business hours — will be created as live
    return 'live';
  }

  // If AI has taken over manually, stay in AI mode
  if (session.aiTakenOver) return 'ai';

  // If shop never replied and session started > 5 min ago, switch to AI
  const elapsed = Date.now() - session.startedAt;
  if (session.lastShopReplyAt === null && elapsed > SHOP_TIMEOUT_MS) {
    return 'ai';
  }

  // If shop replied but it's been > 5 min since last reply, switch to AI
  if (session.lastShopReplyAt !== null) {
    const sinceLastReply = Date.now() - session.lastShopReplyAt;
    if (sinceLastReply > SHOP_TIMEOUT_MS) return 'ai';
  }

  return 'live';
}

// --- GET handler (customer polling for new messages) ---

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = PollSchema.safeParse({
    sessionId: url.searchParams.get('sessionId'),
    after: url.searchParams.get('after'),
  });

  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid parameters', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { sessionId, after } = parsed.data;
  const session = getSession(sessionId);

  if (!session) {
    return Response.json({ messages: [], mode: 'ai' });
  }

  const newMessages = getNewMessages(sessionId, after);
  const currentMode = determineChatMode(sessionId);

  // Update session mode if it changed (e.g., timeout kicked in)
  if (session.mode !== currentMode) {
    setSessionMode(sessionId, currentMode);
  }

  if (newMessages.length > 0) {
    const latestTimestamp = newMessages[newMessages.length - 1].timestamp;
    updateLastDelivered(sessionId, latestTimestamp);
  }

  return Response.json({
    messages: newMessages,
    mode: currentMode,
  });
}

// --- POST handler ---

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { sessionId, message, messages, lead } = parsed.data;

  try {
    const mode = determineChatMode(sessionId);

    // Ensure session exists in the shared store
    let session = getSession(sessionId);
    if (!session) {
      session = createSession(sessionId, mode);
    }

    // Update session mode
    if (session.mode !== mode) {
      setSessionMode(sessionId, mode);
    }

    // Store the user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    addMessageToSession(sessionId, userMessage);

    // Store lead data if provided
    if (lead) {
      const leadData = lead as Partial<LeadInfo>;
      updateSessionLead(sessionId, leadData);
    }

    if (mode === 'live') {
      // Check if shop has queued any replies since the customer's last delivered message
      const shopReplies = session.messages.filter(
        (m) => m.role === 'assistant' && m.timestamp > session.lastDeliveredAt,
      );

      if (shopReplies.length > 0) {
        const latestReply = shopReplies[shopReplies.length - 1];
        updateLastDelivered(sessionId, latestReply.timestamp);
        return Response.json({
          reply: latestReply.content,
          mode: 'live',
        });
      }

      return Response.json({
        reply: null,
        mode: 'live',
        waitMessage: 'A team member will be with you shortly. If no one responds within a few minutes, our AI assistant will help you out.',
      });
    }

    // AI mode
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('[POST /api/chat] ANTHROPIC_API_KEY is not configured');
      return Response.json({ error: 'Chat service is not configured' }, { status: 503 });
    }

    const client = new Anthropic({ apiKey });

    // Build conversation history (last 20 messages to control tokens)
    const conversationHistory = messages
      .slice(-20)
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Add the current message
    conversationHistory.push({ role: 'user', content: message });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      temperature: 0.7,
      system: buildSystemPrompt(),
      messages: conversationHistory,
    });

    const rawReply = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const { cleanText, leadData } = extractLeadData(rawReply);

    // Store AI reply in the shared session
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: cleanText,
      timestamp: Date.now(),
    };
    addMessageToSession(sessionId, assistantMessage);

    // Store extracted lead
    if (leadData) {
      updateSessionLead(sessionId, leadData);
    }

    return Response.json({
      reply: cleanText,
      mode: 'ai',
      extractedLead: leadData,
    });
  } catch (err) {
    console.error('[POST /api/chat]', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
