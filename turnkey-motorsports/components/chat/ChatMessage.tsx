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
          {message.content}
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
