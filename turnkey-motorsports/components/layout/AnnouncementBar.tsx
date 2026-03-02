'use client';

import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const advanceMessage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(advanceMessage, 5000);
    return () => clearInterval(interval);
  }, [isDismissed, advanceMessage]);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') setIsDismissed(true);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  if (isDismissed) return null;

  const message = ANNOUNCEMENT_MESSAGES[currentIndex];

  const content = (
    <span
      className={cn(
        'text-sm font-medium transition-opacity duration-300',
        isTransitioning ? 'opacity-0' : 'opacity-100'
      )}
    >
      {message.text}{' '}
      {message.highlightText && (
        <span className="font-bold text-accent underline underline-offset-2">
          {message.highlightText}
        </span>
      )}
    </span>
  );

  return (
    <div className="relative z-50 bg-surface py-2.5" role="banner">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        {message.link ? (
          <Link href={message.link} className="hover:opacity-80 transition-opacity">
            {content}
          </Link>
        ) : (
          content
        )}
        <button
          onClick={handleDismiss}
          className="absolute right-4 rounded p-1 text-text-tertiary transition-colors hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
