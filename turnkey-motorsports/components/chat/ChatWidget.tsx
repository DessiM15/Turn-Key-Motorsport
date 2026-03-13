'use client';

import dynamic from 'next/dynamic';
import { useChat } from '@/lib/chat-context';
import ChatBubble from './ChatBubble';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false });

export default function ChatWidget() {
  const { isOpen } = useChat();

  return (
    <>
      {isOpen && <ChatWindow />}
      <ChatBubble />
    </>
  );
}
