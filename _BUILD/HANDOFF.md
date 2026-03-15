# SESSION HANDOFF

## Resume Instructions
Read CLAUDE.md, then cat _BUILD/BUILD-STATE.md to resume.

## What Was Happening
Feature 12 (Shop-Side Live Chat Admin UI) was built and verified — 15/15 checks passed. All 12 features are now complete.

## What's Done
- Features 1–12: All complete and verified
- Feature 12 files (7 new, 5 modified):
  - `lib/data/chat-sessions.ts` — shared in-memory chat session store
  - `lib/types.ts` — added AdminChatSession interface
  - `app/api/chat/route.ts` — refactored to use shared store + added GET handler for customer polling
  - `lib/chat-context.tsx` — added live mode polling (3s interval)
  - `app/api/admin/chat/route.ts` — GET active sessions
  - `app/api/admin/chat/[sessionId]/route.ts` — GET session + POST reply
  - `app/api/admin/chat/[sessionId]/takeover/route.ts` — POST AI takeover
  - `components/admin/ChatSessionList.tsx` — session list with mode badges
  - `components/admin/ChatConversation.tsx` — conversation view with lead info + reply input
  - `components/admin/AdminChatPanel.tsx` — split layout with polling
  - `app/admin/chat/page.tsx` — admin chat page
  - `components/admin/AdminSidebar.tsx` — added Live Chat nav link

## What's Next
- Feature 12 code is ready to commit
- User may want to test live (needs ANTHROPIC_API_KEY in .env.local)
- No additional features are planned

## Open Questions
- None

## Watch Out For
- Square SDK fontFamily issue: already fixed (commit e5c9443) — don't re-add fontFamily to card styles
- Square sandbox only accepts Visa test card `4111 1111 1111 1111`
- Dev server needs `NODE_OPTIONS="--max-old-space-size=4096"` to avoid heap OOM
- tsconfig target is ES2017 — use `[\s\S]` instead of regex `s` flag
- Tailwind v4 uses CSS-based `@theme` config in `globals.css`, NO `tailwind.config.ts`
- Project lives at `turnkey-motorsports/` subdirectory, not workspace root
- `_BUILD/` directory is gitignored — build state files are local only
