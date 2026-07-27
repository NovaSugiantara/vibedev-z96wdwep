# Design Guide — Workout Rep Counter

## 1. Design Philosophy
This must not read as generic AI-generated SaaS boilerplate — no default purple/indigo gradient hero, no stock Inter-on-white card grid, no emoji standing in for real icons. Apply the **Hallmark** anti-AI-slop design skill to every visual and interaction decision in this build — color, type, spacing, motion, and copy tone — not as a final polish pass, but from the first component onward.

Direction: energetic, kinetic, scoreboard/stopwatch energy. The rep counter is the hero of the screen — everything else is support.

## 2. Visual Identity

### Color
Avoid Tailwind's default indigo/violet-500 look. Anchor palette intent (adjust exact hex to taste, but keep the roles distinct):
- **Primary/accent** — a punchy, saturated warm color (orange/red-orange range) for the tap button. Reads instantly under motion and low attention, which matches how this app is actually used.
- **Neutral base** — near-black or near-white, nudged off Tailwind's literal `gray-900`/`gray-50` defaults so it doesn't look templated.
- **Secondary (Done)** — a muted teal or green, reserved for the confirm action only.
- **Danger (Delete)** — reserved only for the delete affordance; never reused elsewhere.

### Typography
- The rep numeral is the largest, boldest element on the entire screen — tabular/monospaced figures so it doesn't jitter in width as digits change.
- Use a distinctive display face for the numeral, paired with a different, calmer face for labels and history rows — avoid a single generic system-ui/Inter pairing doing all the work.
- Establish real hierarchy: numeral ≫ button label > history row text > input label. Don't set everything at the same size and weight.

### Spacing & Shape
- Pick one consistent spacing scale (e.g. 4/8/12/16/24/32/48) and stick to it.
- Choose corner radii deliberately and apply consistently — don't mix sharp and heavily rounded corners without a reason.
- Differentiate the tap button (should feel like a physical, pressable object — real depth/shadow that responds to press) from the history list (should feel like a log or ledger, not another soft-shadow card).

## 3. Layout (mobile-first, single page)
```
┌─────────────────────────────┐
│  [ Exercise name ________ ]  │  ← compact, top of screen
│                               │
│         ┌───────────┐        │
│         │    42     │        │  ← giant tap button,
│         │  tap me   │        │     ~40–55% of viewport height,
│         └───────────┘        │     always centered
│                               │
│    [ Reset ]     [ Done ]    │  ← visually distinct: secondary vs primary
│                               │
│  ── History ───────────────  │
│  Push-ups  · 20 · 10:32 AM  🗑│
│  Squats    · 15 · 10:28 AM  🗑│
└─────────────────────────────┘
```
- The giant button must never require scrolling to reach; input, button, and controls stay in the stable upper region.
- History scrolls independently below the fold when long.
- Desktop/tablet: constrain content to a centered column (e.g. `max-w-md`); do not stretch the button edge-to-edge on wide screens — keep it a bounded, deliberately-shaped target.

## 4. Interaction & Motion
- **Tap feedback**: scale bounce roughly `0.9× → 1.05× → 1×` over ~150–200ms, eased (not linear). Must restart cleanly on rapid repeat taps — no animation queueing or backlog building up behind the actual count.
- **Done**: the newly logged row enters the history list with a short, distinct slide/fade-in — separate from the button's own tap animation, so "I logged a set" reads differently from "I added a rep."
- **Delete**: the row animates out rather than vanishing instantly, avoiding a jarring layout jump.
- **Reset**: a distinct, brief acknowledgment (e.g. the numeral flashes as it drops to 0) so it reads clearly as "reset," not as just another decrement.

## 5. Component States
- **Tap button**: default / active-press. No disabled state (per `SRS.md` FR-2) — always tappable.
- **Done**: always enabled, including at 0 reps (per `SRS.md` FR-3.3) — do not visually gray it out at zero.
- **Reset**: default / active-press.
- **History row**: default / hover (desktop) / delete-in-progress (brief exit animation).
- **Empty history**: a designed empty state with a short, on-tone message — not a blank gap and not a generic "No data" placeholder.

## 6. Accessibility
- Text/numeral contrast against background ≥ WCAG AA.
- Visible keyboard focus states on the input, tap button, Done, Reset, and each delete control.
- All interactive elements ≥44×44px hit area; the giant button far exceeds this by design.
- Rep count changes are announced via an `aria-live="polite"` region for screen reader users (see `SRS.md` NFR-3).

## 7. Do / Don't
**Do**
- Make the rep numeral the loudest thing on the screen.
- Give the primary button real tactile weight — depth/shadow that visibly responds to a press.
- Keep history rows legible and scannable at a glance between sets.

**Don't**
- Default purple/indigo gradients.
- Emoji standing in for real icons on primary actions.
- Identical rounded-card styling applied to every element regardless of its function.
- Center-align every block at the same visual weight — flat hierarchy reads as templated.
