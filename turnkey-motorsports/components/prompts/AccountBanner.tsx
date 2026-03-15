'use client';

import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { shouldShowPrompt, dismissPrompt } from '@/lib/prompt-utils';
import SignupForm from '@/components/auth/SignupForm';

interface AccountBannerProps {
  promptId: 'checkout-account' | 'appointment-account';
  heading: string;
  description: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
}

export default function AccountBanner({
  promptId,
  heading,
  description,
  prefillName,
  prefillEmail,
  prefillPhone,
}: AccountBannerProps) {
  const { isLoggedIn } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [created, setCreated] = useState(false);

  if (isLoggedIn || dismissed || !shouldShowPrompt(promptId)) return null;

  const handleDismiss = () => {
    dismissPrompt(promptId);
    setDismissed(true);
  };

  const handleSuccess = () => {
    dismissPrompt(promptId);
    setCreated(true);
  };

  // Has enough pre-fill data for password-only mode
  const hasPrefilledIdentity = Boolean(prefillName && prefillEmail);

  if (created) {
    return (
      <div className="mt-8 rounded-xl border border-success/30 bg-success/10 p-6 text-center">
        <p className="text-sm font-semibold text-success">
          Account created! You can now track your orders and manage your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <UserPlus className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-sm font-semibold text-white">{heading}</h3>
            <p className="mt-1 text-xs text-text-secondary">{description}</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-1 text-text-tertiary transition-colors hover:text-white"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <SignupForm
          compact
          passwordOnly={hasPrefilledIdentity}
          prefillName={prefillName}
          prefillEmail={prefillEmail}
          prefillPhone={prefillPhone}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
