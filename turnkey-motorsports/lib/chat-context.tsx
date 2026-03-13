'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import type { ChatMessage, ChatMode, LeadInfo } from '@/lib/types';
import { isDuringBusinessHours, generateSessionId } from '@/lib/chat-utils';

// --- Types ---

interface ChatContextValue {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isTyping: boolean;
  mode: ChatMode;
  lead: Partial<LeadInfo>;
  unreadCount: number;
}

// --- Storage keys ---

const SESSION_KEY = 'turn-key-chat-session';
const SESSION_ID_KEY = 'turn-key-chat-session-id';

// --- Context ---

const ChatContext = createContext<ChatContextValue | null>(null);

// --- Helpers ---

interface StoredSession {
  messages: ChatMessage[];
  lead: Partial<LeadInfo>;
  mode: ChatMode;
  startedAt: number;
}

function loadSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored) as StoredSession;
  } catch {
    // Corrupted data — start fresh
  }
  return null;
}

function saveSession(data: StoredSession): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

// --- Provider ---

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<ChatMode>('ai');
  const [lead, setLead] = useState<Partial<LeadInfo>>({});
  const [unreadCount, setUnreadCount] = useState(0);

  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const lastSendRef = useRef(0);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Load session on mount
  useEffect(() => {
    const stored = loadSession();
    if (stored) {
      setMessages(stored.messages);
      setLead(stored.lead);
      setMode(stored.mode);
    }

    // Set initial mode based on business hours
    const businessHours = isDuringBusinessHours();
    if (!stored) {
      setMode(businessHours ? 'live' : 'ai');
    }
  }, []);

  // Re-check business hours every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const businessHours = isDuringBusinessHours();
      setMode((prev) => {
        if (prev === 'handoff') return prev; // Don't change during handoff
        return businessHours ? 'live' : 'ai';
      });
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Poll for new messages when in live mode
  useEffect(() => {
    if (mode !== 'live') return;

    const sessionId = getSessionId();
    if (!sessionId) return;

    const pollInterval = setInterval(async () => {
      try {
        // Use the latest message timestamp as the "after" parameter
        const currentMessages = messagesRef.current;
        const lastTimestamp = currentMessages.length > 0
          ? currentMessages[currentMessages.length - 1].timestamp
          : 0;

        const res = await fetch(
          `/api/chat?sessionId=${encodeURIComponent(sessionId)}&after=${lastTimestamp}`,
        );

        if (!res.ok) return;

        const data = await res.json() as {
          messages: ChatMessage[];
          mode: ChatMode;
        };

        // If mode changed (e.g., AI takeover), update
        if (data.mode && data.mode !== modeRef.current) {
          setMode(data.mode);
        }

        // Append new messages (only assistant/system — we already have our own user messages)
        if (data.messages && data.messages.length > 0) {
          const newMessages = data.messages.filter(
            (m) => m.role === 'assistant' || m.role === 'system',
          );

          if (newMessages.length > 0) {
            setMessages((prev) => {
              // Deduplicate by ID
              const existingIds = new Set(prev.map((m) => m.id));
              const fresh = newMessages.filter((m) => !existingIds.has(m.id));
              if (fresh.length === 0) return prev;
              return [...prev, ...fresh];
            });

            // Increment unread if chat is closed
            if (!isOpenRef.current) {
              setUnreadCount((prev) => prev + newMessages.length);
            }
          }
        }
      } catch {
        // Polling failure — silently retry on next tick
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [mode]);

  // Persist session whenever messages/lead/mode change
  useEffect(() => {
    if (messages.length === 0) return;
    saveSession({
      messages,
      lead,
      mode,
      startedAt: Date.now(),
    });
  }, [messages, lead, mode]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setUnreadCount(0); // Opening — clear unread
      return !prev;
    });
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) return;

    // Client-side rate limit: 1 message per 2 seconds
    const now = Date.now();
    if (now - lastSendRef.current < 2000) return;
    lastSendRef.current = now;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const sessionId = getSessionId();

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          lead,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json() as {
        reply: string | null;
        mode: ChatMode;
        waitMessage?: string;
        extractedLead?: Partial<LeadInfo> | null;
      };

      // Update mode
      setMode(data.mode);

      // Handle response
      if (data.reply) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Increment unread if chat is closed
        if (!isOpenRef.current) {
          setUnreadCount((prev) => prev + 1);
        }
      } else if (data.waitMessage) {
        const systemMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'system',
          content: data.waitMessage,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, systemMessage]);
      }

      // Merge extracted lead data
      if (data.extractedLead) {
        setLead((prev) => ({ ...prev, ...data.extractedLead }));
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'system',
        content: 'Something went wrong. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, lead]);

  const value: ChatContextValue = {
    isOpen,
    toggleChat,
    openChat,
    closeChat,
    messages,
    sendMessage,
    isTyping,
    mode,
    lead,
    unreadCount,
  };

  return <ChatContext value={value}>{children}</ChatContext>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
}
