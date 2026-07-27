# AGENTS.md — Workout Rep Counter

## Before writing any code
Read, in this exact order, everything in `docs/`:
1. `docs/PRD.md` — what we're building and why
2. `docs/SRS.md` — exact functional/non-functional requirements + the edge case checklist
3. `docs/DESIGN.md` — visual direction, layout, motion, accessibility

Do not start implementation until all three have been read. If anything in this file conflicts with `docs/` on product or technical detail, `docs/` wins — this file governs process (git, design skill usage, review loop), not product spec.

## Tech stack (default — see `docs/PRD.md` §10)
Nuxt (Vue 3) + Tailwind CSS, purely client-side. No server routes needed for app logic. No backend, no auth, no external API calls, no analytics or tracking of any kind.

## Design skill — mandatory
Use the **Hallmark** anti-AI-slop design skill for every visual and UI decision — color, type, spacing, motion, copy tone. Consult it before writing component markup, not as a cleanup pass afterward. Cross-check the result against `docs/DESIGN.md` §7 (Do/Don't) before considering any screen finished. If the first instinct is a purple-gradient hero or the default Tailwind gray/indigo palette, that's the signal to stop and revisit Hallmark + `docs/DESIGN.md`.

## Git workflow — mandatory
- Commit early and often. Never batch the whole app into one commit.
- **Hard limit: no single commit may exceed 25KB of diff.** Check the diff size before committing; if a change is larger, split it into multiple logical commits (by component, by feature, or by file) rather than committing it as one.
- Push after every commit — never accumulate unpushed local commits.
- Write clear, specific commit messages describing what changed and why (never "wip" / "update"). Conventional-commit prefixes (`feat:`, `fix:`, `style:`, `chore:`, `docs:`) are preferred.
- Suggested sequence (adjust as needed, keep every commit under 25KB):
  1. `chore: scaffold Nuxt + Tailwind project`
  2. `feat: exercise name input`
  3. `feat: giant tap button, rep counter, bounce animation`
  4. `feat: done button logs set to history`
  5. `feat: reset current counter`
  6. `feat: history list rendering + empty state`
  7. `feat: delete history entry`
  8. `feat: localStorage persistence + corrupted-data fallback`
  9. `style: Hallmark design pass (color, type, motion)`
  10. `fix: edge cases from SRS §5 checklist`
  11. `docs: update README if needed`

## Definition of done
Every feature from the brief is implemented **and reachable in the UI** — not stubbed:
- [ ] Exercise name input
- [ ] Tap button increments and animates on every tap, instantly
- [ ] Done logs `{ name, reps, timestamp }` to history and resets the counter
- [ ] Reset zeroes the counter without logging anything
- [ ] Delete removes exactly the targeted history entry
- [ ] History renders name, reps, and formatted time per row, with a real empty state
- [ ] History persists across a refresh via `localStorage`, with a fallback for corrupted data
- [ ] Every edge case in `docs/SRS.md` §5 has been manually exercised and doesn't break the app
- [ ] Visual design checked against `docs/DESIGN.md` and the Hallmark skill — no default-template look

## Self-review before the final push (rubric-aligned)
Score the build honestly against these three categories before calling it done. If any category feels weak, fix it before the final commit, not after.

**Problem Solving & Design (0–100)** — Does this solve the real problem (fast, low-friction rep counting mid-workout), not a simplified version of it? Is the flow coherent end-to-end? Does the responsive/visual design feel intentional per `docs/DESIGN.md`?

**Completeness (0–100)** — Is every brief feature present *and wired up* (no dead buttons)? Does it behave correctly off the happy path (see `docs/SRS.md` §5)?

**Technical Craft (0–100)** — Is the state model clean (see `docs/SRS.md` §2)? Is user input handled safely (no raw HTML injection from the exercise name field)? Is the animation robust under rapid taps? Is the code readable enough for another engineer to pick up cold?

## Explicitly out of scope — do not add
- Any authentication or user accounts
- Any backend, API, or database
- Analytics, tracking, or third-party scripts
- Anything not in the brief (timers, exercise library, social sharing) unless requested separately
