# SESSION HANDOFF

## Resume Instructions
Read CLAUDE.md, then cat _BUILD/BUILD-STATE.md to resume.

## What Was Happening
Feature 11 (Hybrid Chat Widget) is fully built and verified. All 11 files created/modified, TypeScript compiles clean, production build passes, 15/15 verification checks passed.

## What's Done
- All 11 features complete and building successfully
- Feature 11 files: knowledge base, types, utils, API route, context provider, 4 UI components, layout wiring, env updates
- @anthropic-ai/sdk installed, added to serverExternalPackages
- No API key leaks in client bundles

## What's Next
- User needs to add their `ANTHROPIC_API_KEY` to `.env.local` to enable live chat testing
- Commit all Feature 11 changes when ready
- All planned features are now complete

## Open Questions
- User needs to provide their Anthropic API key
- Live/interactive testing requires running dev server with the key configured

## Watch Out For
- Square SDK fontFamily issue: already fixed (commit e5c9443)
- Square sandbox only accepts Visa test card 4111 1111 1111 1111
- Dev server needs `NODE_OPTIONS="--max-old-space-size=4096"`
- tsconfig target is ES2017 — use `[\s\S]` instead of regex `s` flag
- Tailwind v4 uses CSS-based @theme config in globals.css, no tailwind.config.ts
