'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import ChatSessionList from '@/components/admin/ChatSessionList';
import ChatConversation from '@/components/admin/ChatConversation';
import type { AdminChatSession, ChatMessage } from '@/lib/types';

export default function AdminChatPanel() {
  const [sessions, setSessions] = useState<AdminChatSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<AdminChatSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;

  // Poll session list every 5 seconds
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/admin/chat');
        if (!res.ok) throw new Error('Failed to load sessions');
        const data = await res.json() as { sessions: AdminChatSession[] };
        setSessions(data.sessions);

        // Auto-select newest session if none selected
        if (!selectedIdRef.current && data.sessions.length > 0) {
          setSelectedId(data.sessions[0].id);
        }
      } catch {
        // Silent failure — retry on next tick
      }
    };

    void fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Poll active session every 3 seconds
  useEffect(() => {
    if (!selectedId) {
      setActiveSession(null);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/admin/chat/${encodeURIComponent(selectedId)}`);
        if (!res.ok) throw new Error('Failed to load session');
        const data = await res.json() as { session: AdminChatSession };
        setActiveSession(data.session);
      } catch {
        // Silent failure
      }
    };

    void fetchSession();
    const interval = setInterval(fetchSession, 3000);
    return () => clearInterval(interval);
  }, [selectedId]);

  const handleSendReply = useCallback(async (message: string) => {
    if (!selectedId) return;
    setError(null);

    try {
      const res = await fetch(`/api/admin/chat/${encodeURIComponent(selectedId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error('Failed to send reply');

      const data = await res.json() as { success: boolean; message: ChatMessage };

      // Optimistic update — add the message to local state immediately
      setActiveSession((prev) => {
        if (!prev) return prev;
        return { ...prev, messages: [...prev.messages, data.message] };
      });
    } catch {
      setError('Failed to send reply. Please try again.');
    }
  }, [selectedId]);

  const handleAiTakeover = useCallback(async () => {
    if (!selectedId) return;
    setError(null);

    try {
      const res = await fetch(`/api/admin/chat/${encodeURIComponent(selectedId)}/takeover`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to hand off to AI');

      // Update local state
      setActiveSession((prev) => {
        if (!prev) return prev;
        return { ...prev, mode: 'ai', aiTakenOver: true };
      });
    } catch {
      setError('Failed to hand off to AI. Please try again.');
    }
  }, [selectedId]);

  const handleBack = useCallback(() => {
    setSelectedId(null);
    setActiveSession(null);
  }, []);

  // Mobile: show conversation full-screen when a session is selected
  const showConversation = selectedId !== null && activeSession !== null;

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-lg border border-border bg-surface overflow-hidden">
      {/* Session List — hidden on mobile when viewing conversation */}
      <div className={`w-full lg:w-80 lg:block lg:border-r lg:border-border ${showConversation ? 'hidden' : 'block'}`}>
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Active Chats ({sessions.length})
          </h2>
        </div>
        <ChatSessionList
          sessions={sessions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Conversation — full-screen on mobile, flex-1 on desktop */}
      <div className={`flex-1 flex flex-col ${showConversation ? 'block' : 'hidden lg:flex'}`}>
        {/* Mobile back button */}
        {showConversation && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 border-b border-border px-4 py-2 text-sm text-text-secondary hover:text-white transition-colors lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to chats
          </button>
        )}

        {error && (
          <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        {activeSession ? (
          <ChatConversation
            session={activeSession}
            onSendReply={handleSendReply}
            onAiTakeover={handleAiTakeover}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-text-tertiary">
              {sessions.length === 0
                ? 'No active chats. Waiting for customers...'
                : 'Select a conversation from the list'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
