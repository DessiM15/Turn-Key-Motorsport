'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import type { AdminChatSession, LeadInfo } from '@/lib/types';

interface ChatConversationProps {
  session: AdminChatSession;
  onSendReply: (message: string) => Promise<void>;
  onAiTakeover: () => Promise<void>;
}

// --- Helpers ---

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getModeBadge(session: AdminChatSession): { label: string; variant: 'success' | 'accent' | 'warning' } {
  if (session.aiTakenOver || session.mode === 'ai') {
    return { label: 'AI', variant: 'accent' };
  }
  if (session.lastShopReplyAt !== null) {
    return { label: 'Live', variant: 'success' };
  }
  return { label: 'Waiting', variant: 'warning' };
}

// --- Lead Info Bar ---

interface LeadFieldProps {
  label: string;
  value: string | undefined;
}

function LeadField({ label, value }: LeadFieldProps) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-tertiary">{label}:</span>
      <span className="text-xs text-white">{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-text-tertiary hover:text-accent transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  );
}

function LeadInfoBar({ lead }: { lead: Partial<LeadInfo> }) {
  const [expanded, setExpanded] = useState(true);

  const vehicle = [lead.vehicleYear, lead.vehicleMake, lead.vehicleModel]
    .filter(Boolean)
    .join(' ');

  const hasAnyInfo = lead.name || lead.phone || lead.email || vehicle || lead.serviceInterest;
  if (!hasAnyInfo) return null;

  return (
    <div className="border-b border-border bg-surface-light/50 px-4 py-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-xs font-medium uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
      >
        <span>Lead Info</span>
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {expanded && (
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          <LeadField label="Name" value={lead.name} />
          <LeadField label="Phone" value={lead.phone} />
          <LeadField label="Email" value={lead.email} />
          <LeadField label="Vehicle" value={vehicle || undefined} />
          <LeadField label="Interest" value={lead.serviceInterest} />
        </div>
      )}
    </div>
  );
}

// --- Main Component ---

export default function ChatConversation({
  session,
  onSendReply,
  onAiTakeover,
}: ChatConversationProps) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTakingOver, setIsTakingOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    setInput('');
    try {
      await onSendReply(trimmed);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e);
    }
  };

  const handleTakeover = async () => {
    setIsTakingOver(true);
    try {
      await onAiTakeover();
    } finally {
      setIsTakingOver(false);
    }
  };

  const badge = getModeBadge(session);
  const customerName = session.lead.name || 'Anonymous Visitor';
  const vehicle = [session.lead.vehicleYear, session.lead.vehicleMake, session.lead.vehicleModel]
    .filter(Boolean)
    .join(' ');
  const isLive = session.mode === 'live' && !session.aiTakenOver;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{customerName}</span>
              <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
            </div>
            {vehicle && (
              <span className="text-xs text-text-tertiary">{vehicle}</span>
            )}
          </div>
        </div>

        {isLive && (
          <button
            type="button"
            onClick={handleTakeover}
            disabled={isTakingOver}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-light hover:text-white disabled:opacity-50"
          >
            <Bot className="h-3.5 w-3.5" />
            {isTakingOver ? 'Handing off...' : 'Hand to AI'}
          </button>
        )}
      </div>

      {/* Lead Info */}
      <LeadInfoBar lead={session.lead} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {session.messages.map((msg) => {
            if (msg.role === 'system') {
              return (
                <div key={msg.id} className="flex justify-center">
                  <span className="rounded-full bg-surface-light px-3 py-1 text-xs italic text-text-tertiary">
                    {msg.content}
                  </span>
                </div>
              );
            }

            const isCustomer = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col gap-0.5',
                  isCustomer ? 'items-start' : 'items-end',
                )}
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                  {isCustomer ? 'Customer' : 'You'}
                </span>
                <div
                  className={cn(
                    'max-w-[80%] rounded-xl px-3 py-2 text-sm',
                    isCustomer
                      ? 'bg-surface-light text-white'
                      : 'bg-accent/15 text-accent',
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-text-tertiary">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-border p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLive ? 'Type a reply...' : 'AI is handling this chat'}
          disabled={!isLive || isSending}
          rows={1}
          maxLength={500}
          className="flex-1 resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder-text-tertiary focus:border-accent focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!isLive || isSending || !input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-black transition-opacity hover:opacity-90 disabled:opacity-40"
          aria-label="Send reply"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
