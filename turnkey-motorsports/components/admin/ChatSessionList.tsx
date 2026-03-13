'use client';

import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import type { AdminChatSession } from '@/lib/types';

interface ChatSessionListProps {
  sessions: AdminChatSession[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
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

function getCustomerName(session: AdminChatSession): string {
  return session.lead.name || 'Anonymous Visitor';
}

function getVehicleInfo(session: AdminChatSession): string {
  const { vehicleYear, vehicleMake, vehicleModel } = session.lead;
  if (vehicleYear && vehicleMake && vehicleModel) {
    return `${vehicleYear} ${vehicleMake} ${vehicleModel}`;
  }
  if (vehicleMake && vehicleModel) {
    return `${vehicleMake} ${vehicleModel}`;
  }
  return 'No vehicle info';
}

function getLastMessagePreview(session: AdminChatSession): string {
  const customerMessages = session.messages.filter((m) => m.role === 'user');
  const last = customerMessages[customerMessages.length - 1];
  if (!last) return 'No messages yet';
  return last.content.length > 50 ? last.content.slice(0, 50) + '...' : last.content;
}

function hasUnread(session: AdminChatSession): boolean {
  if (!session.lastShopReplyAt) {
    // Shop hasn't replied — all customer messages are "unread"
    return session.messages.some((m) => m.role === 'user');
  }
  // Any customer message after the last shop reply is unread
  return session.messages.some(
    (m) => m.role === 'user' && m.timestamp > (session.lastShopReplyAt ?? 0),
  );
}

export default function ChatSessionList({ sessions, selectedId, onSelect }: ChatSessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-sm text-text-tertiary">No active chats right now</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto p-2">
      {sessions.map((session) => {
        const isSelected = session.id === selectedId;
        const badge = getModeBadge(session);
        const unread = hasUnread(session);

        return (
          <button
            key={session.id}
            type="button"
            onClick={() => onSelect(session.id)}
            className={cn(
              'flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors duration-150',
              isSelected
                ? 'border-accent bg-accent/10'
                : 'border-border bg-surface hover:bg-surface-light',
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {unread && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
                <span className="text-sm font-medium text-white">
                  {getCustomerName(session)}
                </span>
              </div>
              <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
            </div>

            <span className="text-xs text-text-tertiary">
              {getVehicleInfo(session)}
            </span>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary line-clamp-1">
                {getLastMessagePreview(session)}
              </span>
              <span className="ml-2 shrink-0 text-xs text-text-tertiary">
                {formatTimeAgo(session.lastCustomerMessageAt)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
