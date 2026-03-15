'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  message?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'signup',
  prefillName,
  prefillEmail,
  prefillPhone,
  message,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn(
        'relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl',
        'animate-in fade-in zoom-in-95 duration-200',
      )}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Optional message */}
        {message && (
          <p className="mb-4 text-center text-sm text-text-secondary">
            {message}
          </p>
        )}

        {/* Tab toggle */}
        <div className="mb-6 flex gap-1 rounded-lg bg-surface p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-semibold transition-all',
              activeTab === 'login'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-white',
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-semibold transition-all',
              activeTab === 'signup'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-white',
            )}
          >
            Create Account
          </button>
        </div>

        {activeTab === 'login' ? (
          <LoginForm
            compact
            onSuccess={onClose}
            onSwitchToSignup={() => setActiveTab('signup')}
          />
        ) : (
          <SignupForm
            compact
            onSuccess={onClose}
            onSwitchToLogin={() => setActiveTab('login')}
            prefillName={prefillName}
            prefillEmail={prefillEmail}
            prefillPhone={prefillPhone}
          />
        )}
      </div>
    </div>
  );
}
