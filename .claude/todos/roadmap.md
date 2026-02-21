# Roadmap Page — Implementation Todo

> Reference: `.claude/design/roadmap-page.md`

---

## Phase 1: Foundation (shadcn/ui + shared components)

- [x] Install shadcn/ui components: `button`, `sheet`, `table`, `progress`
- [x] Create `components/navbar.tsx` — shared navbar with logo + tabs
- [x] Create `components/difficulty-badge.tsx` — colored Easy/Medium/Hard text
- [x] Create `components/status-icon.tsx` — circle (unsolved) / checkmark (solved) icon

## Phase 2: Data Layer

- [x] Create `lib/graph.ts` — `buildGraph()` using dagre for auto-layout
- [x] Create `hooks/use-progress.ts` — localStorage progress hook

## Phase 3: Roadmap Components

- [x] Create `components/roadmap/topic-node.tsx` — custom React Flow node (title + progress bar)
- [x] Create `components/exercise-table.tsx` — shadcn Table of exercises (reusable)
- [x] Create `components/roadmap/topic-sheet.tsx` — side panel (Sheet) with exercise list
- [x] Create `components/roadmap/roadmap-graph.tsx` — React Flow graph (`'use client'`)

## Phase 4: Page Assembly

- [x] Update `app/layout.tsx` — add Navbar, clean up defaults
- [x] Create `app/roadmap/page.tsx` — roadmap page wiring everything together

## Phase 5: Verification

- [x] Run dev server and take screenshot
- [x] Verify: 18 nodes render with correct shapes and dagre layout
- [x] Verify: dot grid background + mini controls visible
- [x] Verify: clicking a node opens the Sheet with exercise list
- [x] Verify: exercise table shows #, Problem, Difficulty (colored), Status
- [x] Verify: "Review {Topic Name}" button + "Continue Practice" CTA

## Screenshots

| Screenshot | Description |
|------------|-------------|
| `assets/ui/roadmap/roadmap-build-v3.png` | Full graph with 18 nodes, dot grid, mini controls |
| `assets/ui/roadmap/roadmap-sheet-v3.png` | Side panel open on "Conditional Probability" with 11 exercises |

## Files Created

| File | Purpose |
|------|---------|
| `components/ui/button.tsx` | shadcn/ui Button |
| `components/ui/sheet.tsx` | shadcn/ui Sheet |
| `components/ui/table.tsx` | shadcn/ui Table |
| `components/ui/progress.tsx` | shadcn/ui Progress |
| `components/navbar.tsx` | Shared navbar (logo + tabs + user icon) |
| `components/difficulty-badge.tsx` | Colored Easy/Medium/Hard text |
| `components/status-icon.tsx` | Circle or checkmark icon |
| `components/exercise-table.tsx` | Reusable shadcn Table of exercises |
| `components/roadmap/topic-node.tsx` | Custom React Flow node |
| `components/roadmap/topic-sheet.tsx` | Side panel with topic details |
| `components/roadmap/roadmap-graph.tsx` | React Flow graph (client component) |
| `lib/graph.ts` | buildGraph() with dagre auto-layout |
| `hooks/use-progress.ts` | localStorage progress hook |
| `app/roadmap/page.tsx` | Roadmap page |
