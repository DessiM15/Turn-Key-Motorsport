'use client';

import { MessageCircle } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { cn } from '@/lib/utils';

export default function ChatBubble() {
  const { toggleChat, unreadCount, isOpen } = useChat();

  return (
    <button
      type="button"
      onClick={toggleChat}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full',
        'bg-accent text-white shadow-lg transition-transform duration-200 hover:scale-110',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        unreadCount > 0 && !isOpen && 'animate-pulse',
      )}
    >
      <MessageCircle className="h-6 w-6" />

      {unreadCount > 0 && !isOpen && (
        <span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          aria-label={`${unreadCount} unread messages`}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
