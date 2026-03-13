'use client';

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { X, Send } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';

export default function ChatWindow() {
  const { messages, sendMessage, isTyping, mode, closeChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape key closes chat
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') closeChat();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeChat]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e as unknown as FormEvent);
    }
  }

  const modeBanner = mode === 'live'
    ? "You're chatting with Turn-Key"
    : mode === 'ai'
      ? 'AI Assistant'
      : 'Connecting you to the team...';

  const modeDetail = mode === 'ai'
    ? 'The shop is currently closed'
    : mode === 'live'
      ? 'A team member will respond shortly'
      : '';

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col overflow-hidden',
        'bg-surface border border-border shadow-2xl',
        // Mobile: full screen
        'inset-0',
        // Desktop: floating window
        'sm:inset-auto sm:bottom-20 sm:right-6 sm:h-[500px] sm:w-[360px] sm:rounded-xl',
      )}
      role="dialog"
      aria-label="Chat window"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'h-2.5 w-2.5 rounded-full',
              mode === 'live' ? 'bg-green-500' : 'bg-accent',
            )}
          />
          <span className="font-display text-sm font-semibold">Turn-Key Motorsport</span>
        </div>
        <button
          type="button"
          onClick={closeChat}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Mode banner */}
      <div className="border-b border-border bg-background/50 px-4 py-1.5 text-xs text-text-secondary">
        <span className="font-medium">{modeBanner}</span>
        {modeDetail && <span> &mdash; {modeDetail}</span>}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="py-8 text-center text-sm text-text-tertiary">
              <p className="mb-1 font-display text-base font-semibold text-white">
                Welcome to Turn-Key Motorsport
              </p>
              <p>Ask us about our services, parts, or builds!</p>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface-light px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-tertiary [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-tertiary [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-tertiary [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-4 py-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Type a message
        </label>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={mode === 'live' ? 'Message the shop...' : 'Type a message...'}
          disabled={isTyping}
          maxLength={500}
          autoComplete="off"
          className={cn(
            'flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-white',
            'placeholder:text-text-tertiary',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
            'disabled:opacity-50',
          )}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white transition-colors',
            'hover:bg-accent/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
