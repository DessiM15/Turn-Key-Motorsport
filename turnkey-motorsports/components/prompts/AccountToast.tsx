'use client';

import { useState, useEffect } from 'react';
import { Car, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { shouldShowPrompt, dismissPrompt } from '@/lib/prompt-utils';
import AuthModal from '@/components/auth/AuthModal';

interface AccountToastProps {
  show: boolean;
  onDismiss: () => void;
}

export default function AccountToast({ show, onDismiss }: AccountToastProps) {
  const { isLoggedIn } = useAuth();
  const [visible, setVisible] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (show && !isLoggedIn && shouldShowPrompt('vehicle-save')) {
      // Small delay so it feels natural after the vehicle add
      const showTimer = setTimeout(() => setVisible(true), 500);
      // Auto-dismiss after 6 seconds
      const hideTimer = setTimeout(() => {
        setVisible(false);
        dismissPrompt('vehicle-save');
        onDismiss();
      }, 6500);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [show, isLoggedIn, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    dismissPrompt('vehicle-save');
    onDismiss();
  };

  const handleSignup = () => {
    setVisible(false);
    dismissPrompt('vehicle-save');
    setShowAuthModal(true);
  };

  if (isLoggedIn) return null;

  return (
    <>
      {/* Toast */}
      <div
        className={cn(
          'fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0 pointer-events-none',
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3.5 shadow-2xl">
          <Car className="h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-white">Save your ride for next time</span>
            {' '}&mdash;{' '}
            <button
              onClick={handleSignup}
              className="font-semibold text-accent hover:underline"
            >
              create an account
            </button>
          </p>
          <button
            onClick={handleDismiss}
            className="ml-2 shrink-0 rounded-lg p-1 text-text-tertiary transition-colors hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="signup"
        message="Create an account to save your vehicle and access it anytime"
      />
    </>
  );
}
