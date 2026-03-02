# CLAUDE.md

## FIRST INSTRUCTION

**Your first response to every new task must begin with: "PPBV Active." If it does not, you have failed to follow this file.**

**Immediately after confirming PPBV Active, before asking any questions:**

1. Check if `_BUILD/BUILD-STATE.md` exists → if yes, this is a RESUME. `cat` it and pick up where it left off. Skip to the appropriate stage.
2. If no BUILD-STATE exists, this is a NEW session:
   - Create `_BUILD/` directory
   - Create `_BUILD/CONTEXT/` directory
   - Create `_BUILD/CONTEXT/README.md`:
     ```
     Drop reference files here at any time: wireframes, PRDs, schemas,
     API docs, brand guides, screenshots, legacy system notes.
     Claude Code checks this folder continuously during the interview.
     ```
   - Say: **"Build folder ready. Drop any reference docs into `_BUILD/CONTEXT/` at any time. Starting interview."**
   - Proceed to Stage 1.

---

## PROCESS: PPBV (Plan → Prompt → Build → Verify)

Complete each stage as a SEPARATE response. Never combine. Never skip.

---

### STAGE 0 — CONTEXT SCAN

At the start of EVERY response during the interview, check `_BUILD/CONTEXT/` for new files. If new files appeared since last response, read them and incorporate.

---

### STAGE 1 — INTERVIEW

**Ask ONE question at a time. Wait for the answer. Then ask the next.**

This is a conversation, not a form. Each answer shapes your next question. You are refining the build plan in real time.

Rules:
- ONE question per response. Never batch.
- Acknowledge each answer. If something is unclear or risky, say so and follow up before moving on.
- Add questions if complexity appears. Skip questions that no longer matter.
- Give feedback: "Good call because..." or "Heads up — X might cause Y, consider Z?"
- Reference context docs naturally: "Your schema shows X — keeping that?"

Topics to cover (order follows the conversation):
- What and why
- Who uses it
- What exists that this touches
- Tech constraints / preferences
- Integrations, data model, auth
- Deployment, timeline, priorities

When confident, end with: **"I have what I need. Generating the build spec now."**

---

### STAGE 2 — SCOPE + DOCS

Determine scope:

**FEATURE** = fewer than 8 files, single concern.
**APP** = new project or major rebuild, 8+ files.

#### Generate Docs (always)

**`_BUILD/PROJECT-SPEC.md`** (Gates format):
```
# [Project Name] — PROJECT SPEC
## Gate 0: Vision — problem, users, success metrics
## Gate 1: Architecture — stack, system diagram (mermaid), data model, auth
## Gate 2: Features — P0/P1/P2 list, user stories, acceptance criteria
## Gate 3: Implementation Plan — dependency order, complexity (S/M/L), file paths
## Gate 4: Infrastructure — env vars, services, CI/CD, hosting, domains
## Gate 5: Launch Checklist — security, Lighthouse >90, WCAG AA, SEO, error pages, onboarding, branded emails, data export, mobile
```

**`_BUILD/BUILD-STATE.md`**:
```
# BUILD STATE
## Status: [IN PROGRESS / PAUSED / COMPLETE]
## Current Stage: [INTERVIEW / SPEC / BUILDING Feature N / VERIFYING]
## Current Feature: [name]
## Completed: (✅ list)
## Remaining: (⬜ list)
## Decisions Made: (architectural choices log)
## Blockers: (waiting on user/external)
## Context Docs: (files in _BUILD/CONTEXT/)
## Last Updated: [timestamp]
```

**`_BUILD/README-DRAFT.md`** and **`.env.example`** in project root.

#### If APP mode, also create `_BUILD/MASTER.md`:
```
# Master Build Plan
## Features (dependency order):
  1. ⬜ [Feature] — description (files)
## Shared Dependencies — install commands, migrations
## Infrastructure First — pre-Feature-1 setup
```

Respond: **"Project docs generated. Review PROJECT-SPEC.md and say GO."**

APP mode after GO → Stages 3-4 per feature. Between features:
**"Feature [N] complete ✅ — Starting Feature [N+1]: [name]. GO or PAUSE."**

---

### STAGE 3 — PROMPT

1. `cat CODEBAKERS.md`
2. `cat _BUILD/PROJECT-SPEC.md`
3. If APP mode, `cat _BUILD/MASTER.md` and `_BUILD/BUILD-STATE.md`
4. Re-read relevant `_BUILD/CONTEXT/` files
5. Create `_BUILD/PROMPT.md`:
```
# BUILD PROMPT
## What and why
## Current codebase state
## Reference docs consulted
## Steps in order (file paths, function names)
## CodeBakers patterns (pasted inline)
## What NOT to do
## Verification checklist (8+ items with how to test)
```

Respond: **"Prompt ready. Building now."**

Then `cat _BUILD/PROMPT.md` from disk before writing any code.

---

### STAGE 4 — BUILD + VERIFY

Execute the prompt. Follow build order. When done:

1. `cat _BUILD/PROMPT.md` — re-read verification from disk
2. Test each checkbox, report pass/fail
3. Fix failures, re-verify until clean
4. Delete `_BUILD/PROMPT.md`
5. Update `_BUILD/BUILD-STATE.md`
6. If APP mode, mark feature ✅ in `_BUILD/MASTER.md`
7. After ALL features: finalize `README.md` in project root

---

## CONTEXT HEALTH — REPORT AFTER EVERY STAGE

**After completing any stage or feature build, always report:**

```
── Context Health ──────────────────────
Tokens used:     ~[estimate]
Tokens remaining: ~[estimate]
Stages remaining: [list what's left]
Can complete next stage in this session: [YES / LIKELY / NO]
Recommendation: [CONTINUE / HANDOFF]
────────────────────────────────────────
```

Estimation method: count your total output so far + files read. Assume 200k context window. If remaining tokens are under 40k, recommend HANDOFF.

**If recommending HANDOFF**, automatically run the Handoff Protocol below before stopping.

**If user asks to continue despite a HANDOFF recommendation**, warn once then proceed. Update BUILD-STATE.md more frequently (after every file change, not just every stage).

---

## HANDOFF PROTOCOL

Run this when: context is low, user requests a pause, session is ending, or before a recommended handoff.

1. Update `_BUILD/BUILD-STATE.md` with:
   - Exact current status (what file was being worked on, what line)
   - Everything completed so far
   - Everything remaining
   - Any in-progress work that needs to be finished
   - Decisions made and why
   - Known issues or bugs discovered

2. Create `_BUILD/HANDOFF.md`:
```
# SESSION HANDOFF
## Resume Instructions
Read CLAUDE.md, then cat _BUILD/BUILD-STATE.md to resume.

## What Was Happening
[Exact state: which feature, which step, what file was open]

## What's Done
[Completed features/files with brief status]

## What's Next
[Immediate next step — be specific: "Create app/api/items/route.ts with POST handler"]

## Open Questions
[Anything that needs user input before proceeding]

## Watch Out For
[Gotchas, bugs found, things that almost broke]
```

3. Respond: **"Handoff created. To resume: open a new session and say 'read CLAUDE.md and resume.' Everything is saved in _BUILD/."**

---

## CRASH RECOVERY

If Claude Code freezes, dies, or the user must start a new terminal session:

**The user just says: "read CLAUDE.md and resume"**

Claude Code will:
1. See PPBV Active instruction → confirm it
2. Check for `_BUILD/BUILD-STATE.md` → found → this is a RESUME
3. `cat _BUILD/BUILD-STATE.md`
4. `cat _BUILD/HANDOFF.md` if it exists
5. `cat _BUILD/PROJECT-SPEC.md`
6. `cat _BUILD/MASTER.md` if APP mode
7. Report what it found and where it's picking up
8. Continue from the exact point documented

**If the crash happened mid-file-write:**
- Check git status for uncommitted changes
- Check for partial files and assess completeness
- Report findings to user before continuing
- If unclear, ask: "I see [file] was partially written. Want me to finish it or start it fresh?"

---

## UNIVERSAL CODE RULES

- TypeScript strict. No `any`. No untyped `as` casts.
- Validate inputs at boundaries. Never trust user data.
- Every action: loading, success, error states.
- No hardcoded values. Env vars or constants.
- Components: single job, default export, typed props.
- Mobile-first. WCAG AA. Semantic HTML.
- Handle: empty, error, loading, unauthorized, timeout.
