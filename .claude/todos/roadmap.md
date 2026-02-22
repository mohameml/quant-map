# Roadmap Page — Implementation Todo

> Reference: `.claude/design/roadmap-page.md`

---

## Phase 1: Foundation (completed)

- [x] Install shadcn/ui components: `button`, `sheet`, `table`, `progress`
- [x] Create `components/navbar.tsx` — shared navbar with logo + tabs
- [x] Create `components/difficulty-badge.tsx` — colored Easy/Medium/Hard text
- [x] Create `components/status-icon.tsx` — circle / checkmark icon
- [x] Create `lib/graph.ts` — `buildGraph()` using dagre for auto-layout
- [x] Create `hooks/use-progress.ts` — localStorage progress hook
- [x] Create all roadmap components (topic-node, topic-sheet, exercise-table, roadmap-graph)
- [x] Create `app/roadmap/page.tsx` — roadmap page wiring everything together

---

## Phase 2: Roadmap Refinements

### 2.1 — ProgressContext (remove prop drilling) ✅

- [x] Create `components/progress-provider.tsx` — React context wrapping `useProgress()`
- [x] Move `ProgressProvider` to `app/layout.tsx` (available on all pages, not just roadmap)
- [x] Update `ExerciseTable` — remove `isSolved` prop, use `useProgressContext()` directly
- [x] Update `TopicSheet` — remove `isSolved` prop, use `useProgressContext()` directly
- [x] Update `RoadmapGraph` — single component, uses `useProgressContext()` directly
- [x] Remove `GraphInner`/`RoadmapGraph` split — simplified to single component

### 2.2 — Fix data loading (performance) ✅

- [x] Add `getExercisesByTopic()` to `content.ts` — single-pass, returns `Record<TopicSlug, Exercise[]>`
- [x] Fix `roadmap/page.tsx` — calls `getExercisesByTopic()` once (not 14 separate calls)
- [x] Fix `content.ts` — `getExercisesByPattern()` uses dual in-memory index (`_index` + `_byPattern`)
- [x] Update `buildGraph()` — accepts `exercisesByTopic` param, fills `exerciseCount` directly

### 2.3 — Type safety ✅

- [x] Change `primaryPattern` type from `string` to `TopicSlug` in `schema.ts`
- [x] Add validation in `content.ts` — verify exercise directory name is a valid `TopicSlug`

### 2.4 — Edge arrows fix ✅ (partial)

- [x] Edge config extracted to `EDGE_CONFIG` in `graph.ts` with `markerEnd` arrow
- [ ] Arrow clipping/alignment issue not fully resolved (linter reverted type to `"default"`)

### 2.5 — CSS variables for progress colors ✅

- [x] Define CSS custom properties in `globals.css` for all 3 progress states (border, hover-border, bar)
- [x] Update `topic-node.tsx` — uses `border-[var(--progress-*)]` classes
- [x] Update edge colors in `graph.ts` — uses `var(--edge-color)`

### 2.6 — StatusIcon update ✅

- [x] Change solved icon from bare `Check` to `CircleCheckBig` (circle with check inside)

### 2.7 — ExerciseTable improvements ✅

- [x] Click status cell to toggle solved/unsolved (with `stopPropagation`)
- [x] Wrap exercise title in `<Link href={/exercises/${ex.id}}>` for accessibility
- [x] Add empty state: "No exercises yet." when `exercises.length === 0`

### 2.8 — buildGraph cleanup ✅

- [x] Extract `NODE_W = 220`, `NODE_H = 60` constants
- [x] Extract `LAYOUT_CONFIG` and `EDGE_CONFIG` objects (remove magic numbers)

### 2.9 — Use shadcn Progress in TopicNode ✅

- [x] Replace custom progress bar div with shadcn `<Progress>` component
- [ ] Disabled/not-started opacity state was commented out by linter

### 2.10 — Loading state ✅

- [x] Create `app/roadmap/loading.tsx` — dotted background + `animate-pulse` skeleton nodes approximating DAG layout

### 2.11 — Tests for lib/ ✅

- [x] Install `vitest` + `vite-tsconfig-paths`; add `vitest.config.mts`; add `test` / `test:run` scripts
- [x] `lib/__tests__/schema.test.ts` — 18 tests: valid/invalid topic & exercise frontmatter, TOPIC_SLUGS invariants
- [x] `lib/__tests__/graph.test.ts` — 11 tests: empty input, node/edge counts, positions, exerciseCount
- [x] `lib/__tests__/content.test.ts` — 16 tests: integration against real content (ordering, field presence, index consistency)
- [x] All 45 tests pass (`pnpm test:run`)

---

## Files Reference

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
