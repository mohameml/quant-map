# Session 01 — Roadmap Page Design & Build + Taxonomy Refactor

**Date:** 2026-02-22

---

## Part 1: Roadmap Page Design

Discussed and finalized the design for the `/roadmap` page through 3 rounds of Q&A:

**Design decisions:**
- Lock system: All topics accessible (no locks)
- Node colors: Progress-based (gray → yellow → green)
- Side panel: V2 style with progress focus
- Exercise rows: Title only (no subtitle)
- Node shape: Rounded rectangle (220px wide)
- Edge style: Smooth bezier curves
- Hover effect: Highlight only (border intensifies + shadow)
- Background: Dot grid pattern
- Controls: Mini controls (bottom-right)
- Navbar: V2 style (logo left, tabs center, user icon right)
- Panning: Click-and-drag to pan, grab/pointer cursors
- Side panel button: "Review {Topic Name}" instead of generic text
- State management: Custom `useProgress()` hook (no Zustand)
- Exercise table: shadcn Table component (reusable)

**Output:** Full design spec saved to `.claude/design/roadmap-page.md`

---

## Part 2: Roadmap Page Build

Built all components from scratch:

**Files created:**
- `components/navbar.tsx` — Shared navbar with green "P" logo, centered tabs
- `components/difficulty-badge.tsx` — Colored difficulty text (green/yellow/red)
- `components/status-icon.tsx` — Check/circle icons for solved/unsolved
- `components/exercise-table.tsx` — Reusable shadcn Table for exercise lists
- `components/roadmap/topic-node.tsx` — Custom React Flow node with progress bar
- `components/roadmap/topic-sheet.tsx` — Right-side sheet panel with topic details
- `components/roadmap/roadmap-graph.tsx` — Main React Flow graph component
- `hooks/use-progress.ts` — localStorage persistence hook
- `lib/graph.ts` — Dagre auto-layout graph builder
- `app/roadmap/page.tsx` — Server component assembling the roadmap

**shadcn components installed:** button, sheet, table, progress

**Issues resolved during build:**
- Node.js v12 too old → used `nvm use 20` for all operations
- `BackgroundVariant` type error → imported enum instead of string
- Tailwind v4 syntax: `!cursor-grab` → `cursor-grab!`
- React Flow v12 controlled mode → switched to `useNodesState`/`useEdgesState`
- Node titles truncating → increased width from 180px to 220px
- Sheet too narrow → increased to `sm:max-w-lg`

---

## Part 3: Design Feedback & Refinements (v4)

Applied user feedback on the roadmap build:

- Centered topic node title text
- Reduced gap between title and progress bar in nodes
- Updated edges to thicker bezier curves (matching `assets/inspiration/edge.png`)
- Made side panel title smaller (`text-2xl` → `text-lg`)
- Styled table header distinctly (gray background, bold labels, border)
- Increased row padding for breathing room
- Pinned "Continue Practice" button to bottom of panel with play icon (matching `assets/inspiration/side-panel.png`)

**Screenshots:** `assets/ui/roadmap/roadmap-build-v4.png`, `assets/ui/roadmap/roadmap-sheet-v4.png`

---

## Part 4: Taxonomy Refactor (18 → 14 topics)

Simplified the topic structure by merging related topics:

| Removed Topic | Merged Into | Exercises Moved |
|---|---|---|
| `fundamentals` | `random-variables` | 4 exercises |
| `conditional-expectation` | `conditional-probability` | 2 exercises |
| `convergence` | removed (0 exercises) | — |
| `ito-calculus` + `sdes` | `calcul-sto` | 0 exercises |

**Changes made:**
- Updated `lib/schema.ts` — 14 TOPIC_SLUGS, removed `section` field from schema
- Moved exercise MDX files to new parent directories
- Updated `patterns` field in 6 exercise MDX files
- Removed 5 old topic MDX files, created `calcul-sto.mdx`
- Removed `section` field from all remaining topic MDX files
- Updated prerequisites for affected topics:
  - `random-variables` → `["combinatorics"]`
  - `conditional-probability` → `["random-variables"]`
  - `martingales` → `["brownian-motion"]`
  - `statistics` → `["continuous-distributions", "discrete-distributions"]`
  - `calcul-sto` → `["brownian-motion"]`
- Renumbered topic orders to 1–14
- Updated `.claude/design/system-design.md` with new topology
- Build passes clean with 0 errors

---

## Key Technical Notes

- **Node.js:** Must use `nvm use 20` (system Node is v12)
- **Playwright** kept as devDependency for future screenshot testing
- **Tailwind v4** uses canonical class syntax: `cursor-grab!` not `!cursor-grab`
- **React Flow v12** requires `useNodesState`/`useEdgesState` for controlled mode
- **No `src/` directory** — app uses root-level `app/`, `lib/`, `components/`
