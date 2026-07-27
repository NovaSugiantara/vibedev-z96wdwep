# Product Requirements Document — Workout Rep Counter

## 1. Overview
A single-page app that lets someone doing a bodyweight workout at home count reps with one thumb, log finished sets, and glance back at what they've done in the session — with zero setup.

## 2. Problem Statement
Mid-set, a person doing push-ups or squats can't fumble with a fiddly UI. They need one obvious tap target, instant feedback, and a way to save the set and move on — without an account, a backend, or a page reload.

## 3. Target User
Solo home fitness user, mobile-first (phone propped up or held), doing a self-directed bodyweight session (push-ups, squats, lunges, etc.). No trainer, no gym app ecosystem, no patience for friction.

## 4. Goals
- Zero-friction rep counting — one thumb, one button, no precision required
- A clear, trustworthy history of the session's sets
- Works entirely client-side: no login, no setup, no network dependency after first load

## 5. Non-Goals / Out of Scope
- Multi-user accounts, auth, or cloud sync
- Exercise library / prebuilt workout programs
- Rest timers or countdowns (not in brief — candidate for a future version, do not build it now)
- Charts, streaks, or analytics beyond the simple history list

## 6. Core Features
| Feature | Description | Priority |
|---|---|---|
| Exercise name input | Small text field, top of screen, editable anytime | Must |
| Giant tap button | Dominant central control; every tap increments the current set's rep count with a bounce animation | Must |
| Done | Logs the current set (name + reps + timestamp) into history, resets counter to 0 | Must |
| Reset | Zeroes the current counter without logging anything | Must |
| History list | Shows every logged set: name, reps, time | Must |
| Delete entry | Removes a single row from history | Must |
| localStorage persistence | History survives a page refresh | Must (brief says "optional" but treat as required for a complete submission) |

## 7. User Stories
- As a user, I type "Push-ups" once, then tap the button as fast as I can without looking away from my form.
- As a user, I tap Done when I'm out of reps, and immediately start my next set (e.g. "Squats") without re-navigating anywhere.
- As a user, I mis-tapped a few extra reps, so I hit Reset and redo the set cleanly.
- As a user, I logged a set with the wrong number by accident, so I delete that row from history.
- As a user, I refresh the page mid-workout (or my phone locks and I reopen the tab) and my history is still there.

## 8. User Flow
1. Open app → history hydrates from localStorage if present.
2. Enter/edit exercise name (optional at any point).
3. Tap the giant button repeatedly — counter updates and bounces on every tap.
4. Tap **Done** → set is logged, counter resets to 0, ready for the next set immediately.
5. Optionally tap **Reset** mid-set to discard the current count without logging it.
6. Review history below; delete any row that's wrong.

## 9. Success Metrics (rubric-aligned)
- **Problem Solving & Design** — the flow above has no dead ends, no required fields blocking progress, and the layout is clearly built around the giant button being the primary action, not decoration.
- **Completeness** — every row in §6 is implemented and reachable in the UI, and behaves correctly off the happy path (see `SRS.md` §5).
- **Technical Craft** — clean, minimal state model; safe handling of user-entered text; animation that stays correct under rapid input; no dead/stubbed features.

## 10. Assumptions
- Default tech stack: Nuxt (Vue 3) + Tailwind CSS, purely client-side, no server routes required for app logic. Swap if a different stack is preferred — `SRS.md` and `DESIGN.md` are written to be framework-agnostic; only `AGENTS.md` assumes this stack.
- Mobile-first, but must remain fully usable on desktop/tablet widths.

## 11. Risks / Edge Cases (summary — full checklist in `SRS.md` §5)
- Empty exercise name at Done
- Done tapped at 0 reps
- Rapid multi-tap on the counter
- localStorage unavailable (private browsing)
- Exercise name containing HTML/script-like text
