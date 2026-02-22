# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ProbaCode** is an interactive learning platform for probability and statistics interview preparation (quant finance, ML, data science). It features an interactive dependency-graph roadmap, MDX-based content with LaTeX math, and localStorage-based progress tracking.

## Commands

All commands run from the `proba-map/` directory:

```bash
cd proba-map
pnpm install          # Install dependencies
pnpm dev              # Dev server at localhost:3000
pnpm build            # Production build (runs Zod content validation)
pnpm lint             # ESLint
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui** (New York style)
- **@xyflow/react** + **dagre** for the interactive roadmap graph
- **MDX** (next-mdx-remote + gray-matter) with **remark-math + rehype-katex** for LaTeX
- **Zod 4** for build-time frontmatter validation
- Formatting: **4-space indentation** (Prettier configured)

## Architecture

### Content System (`proba-map/content/`)

Content is file-based MDX, validated at build time by Zod schemas in `lib/schema.ts`.

**Topics** (`content/topics/<slug>.mdx`): Frontmatter fields: `id`, `title`, `description`, `prerequisites` (array of topic slugs), `order`. The `id` must match the filename.

**Exercises** (`content/exercises/<primary-pattern>/<slug>.mdx`): Frontmatter fields: `id`, `title`, `difficulty` (Easy|Medium|Hard), `patterns` (array of topic slugs), `tags` (optional). The `id` must match the filename. The directory name is the primary pattern and must appear in the `patterns` array.

**`TOPIC_SLUGS`** in `lib/schema.ts` is the single source of truth for valid topic identifiers. Referencing a non-existent slug in any frontmatter causes a build failure.

### Key Modules (`proba-map/lib/`)

- **`schema.ts`** — Zod schemas, `TOPIC_SLUGS` constant, TypeScript types (`Topic`, `Exercise`, `TopicSlug`)
- **`content.ts`** — Loads and validates all MDX files; `getAllTopics()`, `getAllExercises()`, `getExercisesByPattern(slug)`
- **`graph.ts`** — Converts topics into React Flow nodes/edges using Dagre auto-layout (no hardcoded positions)

### Component Structure (`proba-map/components/`)

- **`roadmap/`** — `roadmap-graph.tsx` (main React Flow graph), `topic-node.tsx` (custom node with progress bar), `topic-sheet.tsx` (right sidebar detail panel)
- **`exercise-table.tsx`** — Sortable exercise list with difficulty badges and status icons
- **`navbar.tsx`** — Top navigation with active route highlighting
- **`ui/`** — shadcn/ui primitives (button, sheet, table, progress)

### Progress Tracking (`proba-map/hooks/use-progress.ts`)

Client-side `useProgress()` hook stores solved exercise IDs in localStorage (key: `"probacode-progress"`). Syncs across tabs via `storage` event. No backend auth in MVP.

### Pages

- **`/roadmap`** — Interactive dependency graph (main page, fully implemented)
- **`/`** — Landing page (minimal)
- **`/patterns/[slug]`** and **`/exercises/[slug]`** — Not yet implemented

## Adding Content

**New topic**: Add slug to `TOPIC_SLUGS` in `lib/schema.ts`, create `content/topics/<slug>.mdx` with required frontmatter.

**New exercise**: Create `content/exercises/<pattern>/<slug>.mdx`. The `patterns` array must reference valid `TOPIC_SLUGS`. Use `<Hint n={1}>` components for progressive hints.

Always run `pnpm build` after content changes to catch validation errors.

## Design Documentation

- `.claude/design/system-design.md` — Authoritative architecture reference
- `docs/MVP.md` — Full product specification
