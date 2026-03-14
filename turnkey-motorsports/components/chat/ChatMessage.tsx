'use client';

import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTimestamp(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

/**
 * Renders simple markdown formatting for assistant messages:
 * - **bold** → <strong>
 * - Lines starting with - or * or numbered (1.) → list items
 * - Newlines → proper breaks between paragraphs
 */
function formatContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length === 0) return;
    const Tag = listType === 'ol' ? 'ol' : 'ul';
    const listClass = listType === 'ol'
      ? 'list-decimal list-inside space-y-0.5 my-1'
      : 'list-disc list-inside space-y-0.5 my-1';
    elements.push(
      <Tag key={`list-${elements.length}`} className={listClass}>
        {listItems.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </Tag>,
    );
    listItems = [];
    listType = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Strip horizontal rules
    if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed)) {
      flushList();
      continue;
    }

    // Convert headers to bold text (strip # prefix)
    const headerMatch = trimmed.match(/^#{1,4}\s+(.+)/);
    if (headerMatch) {
      flushList();
      elements.push(
        <p key={`h-${i}`} className="font-semibold">{renderInline(headerMatch[1])}</p>,
      );
      continue;
    }

    // Unordered list item
    const ulMatch = trimmed.match(/^[-*]\s+(.+)/);
    if (ulMatch) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+[.)]\s+(.+)/);
    if (olMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    // Not a list item — flush any pending list
    flushList();

    // Empty line = spacing
    if (!trimmed) {
      if (elements.length > 0) {
        elements.push(<div key={`br-${i}`} className="h-1.5" />);
      }
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`}>{renderInline(trimmed)}</p>,
    );
  }

  flushList();
  return <>{elements}</>;
}

/** Renders inline formatting: **bold** */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return <strong key={i} className="font-semibold">{boldMatch[1]}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'system') {
    return (
      <div className="py-2 text-center text-xs italic text-text-tertiary" role="status">
        {message.content}
      </div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
      role="log"
    >
      <div className="flex max-w-[80%] flex-col gap-1">
        <div
          className={cn(
            'rounded-2xl px-4 py-2 text-sm leading-relaxed',
            isUser
              ? 'rounded-br-sm bg-accent text-white'
              : 'rounded-bl-sm bg-surface-light text-white',
          )}
        >
          {isUser ? message.content : formatContent(message.content)}
        </div>
        <span
          className={cn(
            'text-[10px] text-text-tertiary',
            isUser ? 'text-right' : 'text-left',
          )}
        >
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
