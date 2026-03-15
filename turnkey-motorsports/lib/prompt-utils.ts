// DEMO: Prompt dismissal tracking via localStorage.
// Replace with Supabase user preferences when connected.

const STORAGE_KEY = 'turn-key-dismissed-prompts';

type PromptId = 'vehicle-save' | 'checkout-account' | 'appointment-account' | 'wishlist-auth';

function getDismissedPrompts(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveDismissedPrompts(prompts: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...prompts]));
  } catch {
    // Storage full
  }
}

export function shouldShowPrompt(promptId: PromptId): boolean {
  return !getDismissedPrompts().has(promptId);
}

export function dismissPrompt(promptId: PromptId): void {
  const prompts = getDismissedPrompts();
  prompts.add(promptId);
  saveDismissedPrompts(prompts);
}

export function resetDismissedPrompts(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
