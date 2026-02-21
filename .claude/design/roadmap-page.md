# Roadmap Page — Design Specification

> Finalized: February 2026. All decisions confirmed with the user.

---

## Overview

The roadmap page is the **core navigation** of ProbaCode. It displays an interactive dependency graph of 18 probability/statistics topics. Each node represents a topic (pattern), and edges represent prerequisite relationships. Users click a node to open a side panel showing exercises for that topic.

**Route:** `/roadmap`

---

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [P] Proba-Map      [Roadmap] [Topics] [Exercises]      👤  │  ← Navbar
├──────────────────────────────────────────────────────────────┤
│                                                              │
│     · · · · · · · · · · · · · · · · · · · · · · · · · ·     │
│     ·  ┌──────────────────┐                            ·     │
│     ·  │ Combinatorics    │                            ·     │
│     ·  │ ████████░░  8/10 │                            ·     │
│     ·  └────────┬─────────┘                            ·     │
│     ·           │                                      ·     │
│     ·  ┌────────▼─────────┐                            ·     │
│     ·  │ Fundamentals     │                            ·     │
│     ·  │ ██████░░░░  6/10 │                            ·     │
│     ·  └───┬──────────┬───┘                            ·     │
│     ·      │          │                                ·     │
│     ·  ┌───▼───┐  ┌───▼───┐                           ·     │  ← React Flow
│     ·  │Random │  │Cond.  │                            ·     │     graph area
│     ·  │Vars   │  │Prob.  │                            ·     │     (dot grid bg)
│     ·  └───────┘  └───────┘                            ·     │
│     ·                                                  ·     │
│     · · · · · · · · · · · · · · · · · · · · · · · · · ·     │
│                                                              │
│                                               [+][-][⊞]     │  ← Mini controls
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Navbar

**Component:** `Navbar.tsx` (shared across all pages)

```
┌───────────────────────────────────────────────────────────┐
│  [P] Proba-Map       [Roadmap]  [Topics]  [Exercises]  👤 │
└───────────────────────────────────────────────────────────┘
```

| Element              | Detail                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Logo**             | Green circle with "P" + "Proba-Map" text, links to `/`           |
| **Tabs**             | `Roadmap` · `Topics` · `Exercises` — centered                    |
| **Active indicator** | Green underline on active tab                                    |
| **User icon**        | Far right, placeholder for future auth (no functionality in MVP) |
| **Height**           | ~56px                                                            |
| **Background**       | White with subtle bottom border (`border-b`)                     |
| **Position**         | Sticky top                                                       |

---

## Graph Area

**Component:** `RoadmapGraph.tsx` (`'use client'`)

| Property            | Value                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| **Library**         | `@xyflow/react`                                                                   |
| **Layout engine**   | `dagre` (auto-layout, top-to-bottom direction)                                    |
| **Background**      | Dot grid pattern (React Flow `<Background variant="dots" />`)                     |
| **Dot color**       | `#e5e7eb` (gray-200) on white                                                     |
| **Interactions**    | Pan (drag anywhere on canvas), Zoom (scroll/pinch), Click node (opens side panel) |
| **Panning**         | Click + drag on empty canvas to move the graph. `panOnDrag={true}`                |
| **Fit on load**     | Yes — `fitView` on initial render                                                 |
| **Controls**        | Mini controls in bottom-right: zoom +/−, fit view                                 |
| **Cursor (canvas)** | `cursor: grab` by default, `cursor: grabbing` while dragging                      |
| **Cursor (nodes)**  | `cursor: pointer` on hover over any node                                          |
| **Node dragging**   | Disabled — nodes are fixed in dagre layout (`nodesDraggable={false}`)             |

---

## Node Design

**Component:** `TopicNode.tsx` (custom React Flow node)

### Shape & Size

```
┌──────────────────────┐
│  Combinatorics       │
│  ████████░░  8/10    │
└──────────────────────┘
```

| Property          | Value                                      |
| ----------------- | ------------------------------------------ |
| **Width**         | ~180px                                     |
| **Height**        | ~60px                                      |
| **Border radius** | 8px (`rounded-lg`)                         |
| **Border**        | 2px solid, color depends on progress state |
| **Background**    | White (`bg-white`)                         |
| **Shadow**        | Subtle: `shadow-sm`                        |
| **Padding**       | 12px                                       |

### Content Inside Node

1. **Topic title** — 13px, `font-medium`, `text-gray-900`, truncated if too long
2. **Progress bar** — 4px height, rounded, below title
3. **Progress text** — 11px, `text-gray-500`, right-aligned (e.g., "8/10")

### Progress-Based Colors

| State           | Condition            | Border              | Progress bar fill            | Text          |
| --------------- | -------------------- | ------------------- | ---------------------------- | ------------- |
| **Not started** | 0 exercises solved   | `border-gray-300`   | Empty (gray-200 bg)          | `0/N` gray    |
| **In progress** | 1+ but not all       | `border-yellow-400` | `bg-yellow-400` partial fill | `X/N` yellow  |
| **Completed**   | All exercises solved | `border-green-500`  | `bg-green-500` full          | `N/N` green ✓ |

### Hover Effect

| Property          | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| **Trigger**       | Mouse enter                                             |
| **Effect**        | Border color intensifies + subtle `shadow-md` elevation |
| **Cursor**        | `pointer` (overrides the canvas `grab` cursor)          |
| **Transition**    | `transition-all duration-200`                           |
| Not started hover | `border-gray-400` + shadow                              |
| In progress hover | `border-yellow-500` + shadow                            |
| Completed hover   | `border-green-600` + shadow                             |

### Click Action

Opens the **Side Panel** (Sheet) for that topic.

---

## Edge Design

| Property     | Value                                          |
| ------------ | ---------------------------------------------- |
| **Type**     | `smoothstep` or `bezier` (React Flow built-in) |
| **Color**    | `#d1d5db` (gray-300)                           |
| **Width**    | 2px                                            |
| **Arrow**    | Small arrowhead at target end                  |
| **Animated** | No                                             |

---

## Side Panel (Sheet)

**Component:** `TopicSheet.tsx` — uses shadcn/ui `<Sheet>` (right side)

Opens when a graph node is clicked. Shows topic details and exercise list.

### Layout

```
┌──────────────────────────────────┐
│  TOPIC DETAILS              [✕]  │
│                                  │
│  Combinatorics                   │
│                                  │
│  Progress              3/12      │
│  ████████░░░░░░░░░░░░░░░░░░░░   │
│                                  │
│  ┌──────────────────────────┐    │
│  │  📖 Review Combinatorics │    │
│  └──────────────────────────┘    │
│                                  │
│  #  Problem Name    Diff  Status │
│  ─────────────────────────────── │
│  1  Ship Destroyer  Easy    ○    │
│  2  Stars and Bars  Easy    ✓    │
│  3  Birthday Paradox Med    ○    │
│  ─────────────────────────────── │
│                                  │
│                                  │
│  ┌──────────────────────────┐    │
│  │  → Continue Practice     │    │
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

### Panel Specs

| Property      | Value                              |
| ------------- | ---------------------------------- |
| **Position**  | Right side (Sheet `side="right"`)  |
| **Width**     | ~400px (or `w-[400px]`)            |
| **Overlay**   | Semi-transparent backdrop          |
| **Animation** | Slide in from right                |
| **Close**     | ✕ button top-right + click outside |

### Panel Content (top to bottom)

1. **Header label** — "TOPIC DETAILS" in `text-xs uppercase tracking-wide text-gray-500`
2. **Topic title** — `text-2xl font-bold`
3. **Progress section**
    - Label "Progress" + fraction "3/12 Completed" right-aligned
    - Full-width progress bar (8px height, same color logic as node)
4. **"Review {Topic Name}" button** — outlined green button (e.g., "Review Combinatorics"), links to `/patterns/[slug]`
5. **Exercise table**

### Exercise Table

| Column           | Width | Content                                                 |
| ---------------- | ----- | ------------------------------------------------------- |
| **#**            | 30px  | Row number (1, 2, 3...)                                 |
| **Problem Name** | flex  | Exercise title, clickable → `/exercises/[slug]`         |
| **Difficulty**   | 70px  | Colored text: green "Easy", yellow "Medium", red "Hard" |
| **Status**       | 30px  | ○ (unsolved) or ✓ green checkmark (solved)              |

- **Sort order:** Easy → Medium → Hard (fixed)
- **Row hover:** Light gray background `hover:bg-gray-50`
- **Row click:** Navigates to `/exercises/[slug]`

### Difficulty Badge Colors

| Level  | Text color        |
| ------ | ----------------- |
| Easy   | `text-green-500`  |
| Medium | `text-yellow-500` |
| Hard   | `text-red-500`    |

### CTA Button

- **"Continue Practice"** — solid green button at bottom
- Links to the **first unsolved exercise** in this topic
- If all solved: changes to "Review Exercises" (links to pattern page)

---

## Responsive Behavior

| Breakpoint              | Behavior                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| **Desktop (≥1024px)**   | Full graph + side panel overlays right portion                     |
| **Tablet (768-1023px)** | Graph scales down, side panel becomes full-width bottom sheet      |
| **Mobile (<768px)**     | Simplified: list view of topics instead of graph (future, not MVP) |

> **MVP:** Desktop-first. Tablet/mobile can be basic but functional.

---

## State Management

No Zustand. Simple React state + custom hook.

```
Local state (useState in RoadmapPage):
├── selectedTopic: string | null   ← which node is clicked (opens sheet)
└── sheetOpen: boolean             ← derived from selectedTopic !== null

Shared state (custom hook):
└── useProgress()                  ← reads/writes localStorage
    ├── markSolved(id: string)     ← mark exercise as solved
    ├── isSolved(id: string)       ← check if exercise is solved
    └── getProgress(slug: string)  ← returns { solved: number, total: number }
```

No server state. All progress is localStorage via `useProgress()` hook.

---

## Exercise Table (shadcn/ui Table)

Uses `<Table>` from shadcn/ui for proper semantics and styling.

```tsx
<Table>
	<TableHeader>
		<TableRow>
			<TableHead className="w-10">#</TableHead>
			<TableHead>Problem</TableHead>
			<TableHead className="w-20">Difficulty</TableHead>
			<TableHead className="w-10">Status</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{exercises.map((ex, i) => (
			<TableRow
				key={ex.id}
				className="cursor-pointer hover:bg-gray-50"
				onClick={() => router.push(`/exercises/${ex.id}`)}
			>
				<TableCell>{i + 1}</TableCell>
				<TableCell className="font-medium">{ex.title}</TableCell>
				<TableCell>
					<DifficultyBadge level={ex.difficulty} />
				</TableCell>
				<TableCell>
					<StatusIcon solved={isSolved(ex.id)} />
				</TableCell>
			</TableRow>
		))}
	</TableBody>
</Table>
```

Reused in both `TopicSheet` (side panel) and `/patterns/[slug]` (topic page).

---

## File Architecture

```
proba-map/src/
├── app/
│   ├── layout.tsx                  ← RootLayout: Navbar + fonts + global styles
│   ├── page.tsx                    ← Landing page (/)
│   ├── roadmap/
│   │   └── page.tsx                ← Roadmap page (/roadmap)
│   ├── patterns/
│   │   └── [slug]/
│   │       └── page.tsx            ← Topic detail page (/patterns/[slug])
│   └── exercises/
│       └── [slug]/
│           └── page.tsx            ← Exercise page (/exercises/[slug])
│
├── components/
│   ├── ui/                         ← shadcn/ui primitives (auto-generated)
│   │   ├── button.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── accordion.tsx
│   │   └── progress.tsx
│   ├── navbar.tsx                  ← Shared navbar (all pages)
│   ├── difficulty-badge.tsx        ← Colored Easy/Medium/Hard text
│   ├── status-icon.tsx             ← ○ or ✓ checkmark
│   ├── exercise-table.tsx          ← shadcn Table of exercises (reused)
│   ├── roadmap/
│   │   ├── roadmap-graph.tsx       ← React Flow graph ('use client')
│   │   ├── topic-node.tsx          ← Custom node: title + progress bar
│   │   └── topic-sheet.tsx         ← Side panel (Sheet) with exercise list
│   └── exercise/
│       ├── hint-accordion.tsx      ← Expandable hints (Accordion)
│       ├── solution-block.tsx      ← Collapsible solution
│       └── mark-solved-button.tsx  ← "Mark as Solved" button
│
├── hooks/
│   └── use-progress.ts            ← localStorage progress (markSolved, isSolved, getProgress)
│
└── lib/
    ├── schema.ts                   ← Zod schemas, TOPIC_SLUGS, types
    ├── content.ts                  ← getAllTopics(), getAllExercises(), getExerciseBySlug()
    ├── graph.ts                    ← buildGraph() — dagre layout from prerequisites
    └── types.ts                    ← Shared TypeScript types (Topic, Exercise)
```

---

## Accessibility

- Graph nodes are keyboard-focusable (Tab) and activatable (Enter/Space)
- Side panel traps focus when open
- Close on Escape key
- Progress bar has `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Exercise table rows are clickable links with proper `<a>` tags

---

## Color Palette Summary (Roadmap Page)

| Token               | Value     | Usage                      |
| ------------------- | --------- | -------------------------- |
| `--bg`              | `#ffffff` | Page background            |
| `--dot-grid`        | `#e5e7eb` | Dot pattern                |
| `--node-bg`         | `#ffffff` | Node background            |
| `--border-gray`     | `#d1d5db` | Not started border + edges |
| `--border-yellow`   | `#facc15` | In progress border         |
| `--border-green`    | `#22c55e` | Completed border           |
| `--progress-gray`   | `#e5e7eb` | Empty progress bar         |
| `--progress-yellow` | `#facc15` | Partial progress bar       |
| `--progress-green`  | `#22c55e` | Full progress bar          |
| `--text-primary`    | `#111827` | Titles                     |
| `--text-secondary`  | `#6b7280` | Labels, secondary text     |
| `--accent-green`    | `#16a34a` | Buttons, active tab        |
| `--easy`            | `#22c55e` | Easy difficulty            |
| `--medium`          | `#eab308` | Medium difficulty          |
| `--hard`            | `#ef4444` | Hard difficulty            |
