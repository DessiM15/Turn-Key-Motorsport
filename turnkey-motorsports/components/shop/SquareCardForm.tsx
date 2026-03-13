'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

// Square Web Payments SDK types (not published as npm package)
interface SquareCardStyle {
  '.input-container'?: Record<string, string>;
  '.input-container.is-focus'?: Record<string, string>;
  input?: Record<string, string>;
  'input::placeholder'?: Record<string, string>;
  '.message-text'?: Record<string, string>;
}

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenResult>;
  destroy: () => Promise<void>;
}

interface SquarePaymentsInstance {
  card: (options?: { style?: SquareCardStyle }) => Promise<SquareCard>;
}

interface SquareTokenResult {
  status: 'OK' | 'ERROR';
  token?: string;
  errors?: Array<{ message: string }>;
}

interface SquareGlobal {
  payments: (appId: string, locationId: string) => Promise<SquarePaymentsInstance>;
}

declare global {
  interface Window {
    Square?: SquareGlobal;
  }
}

export interface SquareCardFormHandle {
  tokenize: () => Promise<string>;
}

interface SquareCardFormProps {
  isProcessing: boolean;
  error?: string;
}

const CARD_STYLE: SquareCardStyle = {
  '.input-container': {
    borderColor: 'transparent',
    borderRadius: '0',
  },
  '.input-container.is-focus': {
    borderColor: 'transparent',
  },
  input: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '14px',
  },
  'input::placeholder': {
    color: '#6B7280',
  },
  '.message-text': {
    color: '#EF4444',
  },
};

const SquareCardForm = forwardRef<SquareCardFormHandle, SquareCardFormProps>(
  function SquareCardForm({ isProcessing, error }, ref) {
    const cardRef = useRef<SquareCard | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sdkError, setSdkError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      async tokenize(): Promise<string> {
        if (!cardRef.current) {
          throw new Error('Card form is not ready. Please wait and try again.');
        }

        const result = await cardRef.current.tokenize();

        if (result.status !== 'OK' || !result.token) {
          const message =
            result.errors?.[0]?.message ?? 'Could not process card details. Please check and try again.';
          throw new Error(message);
        }

        return result.token;
      },
    }));

    useEffect(() => {
      let card: SquareCard | null = null;
      let cancelled = false;

      async function initCard() {
        const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        if (!appId || !locationId) {
          setSdkError('Payment configuration is missing. Please contact support.');
          setIsLoading(false);
          return;
        }

        // Wait for the Square SDK script to load (max ~10s)
        let attempts = 0;
        while (!window.Square && attempts < 50) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          attempts++;
        }

        if (!window.Square) {
          setSdkError('Payment system failed to load. Please refresh the page.');
          setIsLoading(false);
          return;
        }

        try {
          const payments = await window.Square.payments(appId, locationId);
          card = await payments.card({ style: CARD_STYLE });

          if (cancelled) {
            await card.destroy();
            return;
          }

          await card.attach('#square-card-container');
          cardRef.current = card;
          setIsLoading(false);
        } catch (err) {
          if (!cancelled) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setSdkError(`Payment form failed to initialize: ${message}`);
            setIsLoading(false);
          }
        }
      }

      initCard();

      return () => {
        cancelled = true;
        if (card) {
          card.destroy().catch(() => {});
        }
        cardRef.current = null;
      };
    }, []);

    return (
      <div>
        <div
          ref={containerRef}
          className={`rounded-lg border bg-surface px-4 py-3 ${
            error ? 'border-error' : 'border-border'
          } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        >
          {isLoading && !sdkError && (
            <div className="flex items-center gap-3 py-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-text-tertiary border-t-accent" />
              <span className="text-sm text-text-tertiary">Loading payment form...</span>
            </div>
          )}

          {sdkError && (
            <p className="py-2 text-sm text-error">{sdkError}</p>
          )}

          <div
            id="square-card-container"
            className={isLoading || sdkError ? 'hidden' : ''}
          />
        </div>

        {error && (
          <p className="mt-2 text-xs text-error" aria-live="polite">{error}</p>
        )}
      </div>
    );
  }
);

export default SquareCardForm;
