# Software Requirements Specification — Workout Rep Counter

## 1. Scope
Client-only single-page app implementing the brief. No backend, no auth, no external API calls.

## 2. Data Model
```ts
interface WorkoutSet {
  id: string;          // uuid or timestamp-based unique id
  exerciseName: string;
  reps: number;
  timestamp: string;   // ISO 8601
}

interface SessionState {
  exerciseName: string;  // in-progress exercise name
  currentReps: number;   // in-progress rep count
  history: WorkoutSet[]; // persisted, most-recent-first
}
```

## 3. Functional Requirements

**FR-1 — Exercise name input**
- FR-1.1 Text input at the top of the screen, editable at any time, including mid-set.
- FR-1.2 If left empty when Done is pressed, default to `"Untitled Exercise"` — never block the primary action on a required field.
- FR-1.3 Input is trimmed and rendered as plain text (never `innerHTML`) — see NFR-4.

**FR-2 — Giant tap button**
- FR-2.1 Dominant central element; minimum 240×240px effective tap target on mobile viewports, since users tap without looking precisely mid-exercise.
- FR-2.2 Each tap increments `currentReps` by 1; the visible number updates synchronously, with no perceptible delay.
- FR-2.3 Triggers a scale-bounce animation (~150–200ms) on every tap. The animation must restart cleanly on rapid repeat taps rather than queueing — use a CSS transform restart (e.g. re-triggering via a keyed re-render or `animation` reset), not stacked JS timers that can desync from the actual count.
- FR-2.4 Displays `currentReps` at a large, glanceable size — this is the primary readout of the screen.

**FR-3 — Done button**
- FR-3.1 Always visible and enabled, including when `currentReps === 0`.
- FR-3.2 On tap: appends `{ id, exerciseName (or default per FR-1.2), reps: currentReps, timestamp: now }` to `history`, then resets `currentReps` to 0.
- FR-3.3 Must **not** silently block or disable at 0 reps — a user may intentionally log a 0-rep/failed set.
- FR-3.4 History updates immediately and consistently ordered (recommended: newest first).

**FR-4 — Reset button**
- FR-4.1 Sets `currentReps` to 0 without creating a history entry.
- FR-4.2 Visually distinct from Done (e.g. secondary/ghost style vs. primary/filled) so the two are never confused mid-workout.
- FR-4.3 Positioned so it isn't accidentally hit by a stray tap aimed at the giant counter button.

**FR-5 — History list**
- FR-5.1 Each row renders `exerciseName`, `reps`, and a formatted, human-readable timestamp.
- FR-5.2 Consistent ordering (see FR-3.4); newest entries reachable without excessive scrolling on a typical mobile viewport.
- FR-5.3 Explicit empty state when `history.length === 0` — never render a blank gap with no explanation.

**FR-6 — Delete entry**
- FR-6.1 Every history row has its own delete affordance.
- FR-6.2 Deletes only the targeted entry; verified correct when deleting from the start, middle, and end of the list.
- FR-6.3 Immediate on tap — a confirmation dialog is not required for this scope.

**FR-7 — Persistence**
- FR-7.1 `history` is written to `localStorage` after every mutation (add or delete).
- FR-7.2 On load, `history` is hydrated from `localStorage` if present and valid.
- FR-7.3 Corrupted or invalid stored data must **not** crash the app — fall back to an empty history and continue normally.
- FR-7.4 `currentReps` and the in-progress `exerciseName` are not required to persist across a refresh; the brief's persistence requirement is about the logged history.

## 4. Non-Functional Requirements
- **NFR-1 Performance** — tap-to-visual-feedback latency is imperceptible; no layout thrash on increment.
- **NFR-2 Responsive** — usable from ~320px to 1440px+ viewport widths; the giant button stays dominant and centered at every size (see `DESIGN.md` §3).
- **NFR-3 Accessibility** — button reachable via keyboard (Enter/Space); an `aria-live="polite"` region announces rep count changes for screen reader users; text contrast meets WCAG AA; all interactive elements have a hit area ≥44×44px.
- **NFR-4 Security** — the exercise name is user-controlled text and must never be inserted via `innerHTML` or equivalent; render it as text content only.
- **NFR-5 Resilience** — no unhandled exception on any edge case in §5 below.
- **NFR-6 Offline-friendly** — no network calls required for core functionality after first load.

## 5. Edge Case Checklist (manually verify before submission)
- [ ] Tap Done with 0 reps and an empty name
- [ ] Tap Done with 0 reps and a name filled in
- [ ] Rapid-fire tapping (20+ taps/sec) — count stays accurate, animation doesn't visually break or fall behind
- [ ] Reset mid-set, then continue tapping normally afterward
- [ ] Delete the only entry in history → empty state returns correctly
- [ ] Delete a middle entry → entries before and after are untouched
- [ ] Refresh the page after logging sets → history is restored from `localStorage`
- [ ] `localStorage` blocked or unavailable (e.g. private browsing) → app still fully functions, just doesn't persist, no crash or console error surfaced to the user
- [ ] Very long exercise name → input and history row truncate/wrap gracefully, no layout break
- [ ] Exercise name containing HTML/script-like text (e.g. `<img src=x onerror=...>`) → rendered as literal, inert text
- [ ] Large rep count (e.g. 4-digit) → numeral display doesn't clip or overflow its container
- [ ] Changing the exercise name mid-set does not reset or affect `currentReps`

## 6. Constraints
- No backend, no authentication, no external API calls, no analytics or tracking scripts.
- All state is client-side; `localStorage` is the only persistence layer.

## 7. Rubric Traceability
| Rubric category | Enforced by |
|---|---|
| Problem Solving & Design | FR-2 (tap target sized for real workout conditions), NFR-2, NFR-3 |
| Completeness | FR-1 through FR-7 in full, §5 edge case checklist |
| Technical Craft | FR-2.3 (animation robustness), FR-7.3 (resilience), NFR-4 (input safety), NFR-5 |
