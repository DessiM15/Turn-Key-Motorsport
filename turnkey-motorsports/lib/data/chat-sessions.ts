// ============================================================
// Turn-Key Motorsport — Server-Side Chat Session Store
// Shared in-memory store for customer chat + admin chat APIs
// ============================================================

import type { ChatMessage, ChatMode, LeadInfo } from '@/lib/types';

export interface ServerChatSession {
  id: string;
  messages: ChatMessage[];
  lead: Partial<LeadInfo>;
  mode: ChatMode;
  startedAt: number;
  lastShopReplyAt: number | null;
  lastCustomerMessageAt: number;
  lastDeliveredAt: number;
  isActive: boolean;
  aiTakenOver: boolean;
}

// --- In-memory store (same pattern as lib/data/appointments.ts) ---

const sessions = new Map<string, ServerChatSession>();

export function getSession(id: string): ServerChatSession | undefined {
  return sessions.get(id);
}

export function getAllActiveSessions(): ServerChatSession[] {
  return Array.from(sessions.values())
    .filter((s) => s.isActive)
    .sort((a, b) => b.lastCustomerMessageAt - a.lastCustomerMessageAt);
}

export function createSession(id: string, mode: ChatMode): ServerChatSession {
  const now = Date.now();
  const session: ServerChatSession = {
    id,
    messages: [],
    lead: {},
    mode,
    startedAt: now,
    lastShopReplyAt: null,
    lastCustomerMessageAt: now,
    lastDeliveredAt: now,
    isActive: true,
    aiTakenOver: false,
  };
  sessions.set(id, session);
  return session;
}

export function addMessageToSession(id: string, message: ChatMessage): void {
  const session = sessions.get(id);
  if (!session) return;
  session.messages.push(message);
  if (message.role === 'user') {
    session.lastCustomerMessageAt = message.timestamp;
  }
}

export function updateSessionLead(id: string, lead: Partial<LeadInfo>): void {
  const session = sessions.get(id);
  if (!session) return;
  session.lead = { ...session.lead, ...lead };
}

export function setShopReplied(id: string): void {
  const session = sessions.get(id);
  if (!session) return;
  session.lastShopReplyAt = Date.now();
}

export function markAiTakeover(id: string): void {
  const session = sessions.get(id);
  if (!session) return;
  session.aiTakenOver = true;
  session.mode = 'ai';
}

export function setSessionMode(id: string, mode: ChatMode): void {
  const session = sessions.get(id);
  if (!session) return;
  session.mode = mode;
}

export function updateLastDelivered(id: string, timestamp: number): void {
  const session = sessions.get(id);
  if (!session) return;
  session.lastDeliveredAt = timestamp;
}

export function getNewMessages(id: string, after: number): ChatMessage[] {
  const session = sessions.get(id);
  if (!session) return [];
  return session.messages.filter((m) => m.timestamp > after);
}

export function endSession(id: string): void {
  const session = sessions.get(id);
  if (!session) return;
  session.isActive = false;
}
