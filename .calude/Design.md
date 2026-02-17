# ProbaCode — System Design

> Agreed design as of February 2026. Reference this before making any architectural decisions.

---

## 1. Repo Structure

```
quant-map/
├── docs/          ← MVP spec, patterns reference (read-only)
├── design/        ← Excalidraw diagrams
├── .calude/       ← discussion & design notes
└── proba-map/     ← the Next.js app (everything lives here)
    ├── content/
    │   ├── topics/      ← 20 MDX files, one per pattern
    │   └── exercises/   ← 90+ MDX files, one per problem
    └── src/
        ├── lib/
        ├── app/
        └── components/
```

---

## 2. Content Schema (MDX frontmatter)

### Topic file — `content/topics/<slug>.mdx`

```yaml
---
id: "conditional-bayes"           # = filename slug, keep stable
title: "Conditional Probability & Bayes"
description: "Short intro shown on pattern page"
prerequisites: ["fundamentals"]   # array of topic slugs → auto-generates graph edges
order: 2                          # display order in lists
---
<!-- optional: course/theory content -->
```

### Exercise file — `content/exercises/<slug>.mdx`

```yaml
---
id: "biased-coin"                 # = filename slug, keep stable
title: "Biased Coin"
difficulty: "Medium"              # "Easy" | "Medium" | "Hard" (Zod-validated)
patterns: ["conditional-bayes"]   # must match a valid topic slug (Zod-validated at build)
tags: ["bayes", "classic"]        # optional, free-form
order: 1                          # ordering within the pattern
---
## Problem

...LaTeX problem statement...

<Hint n={1}>First hint text</Hint>
<Hint n={2}>Second hint text</Hint>

## Solution

...LaTeX step-by-step solution...
```

> **Rule**: `id` field must match the filename (e.g. `biased-coin.mdx` → `id: "biased-coin"`).

---

## 3. Library Layer — `src/lib/`

| File | Responsibility |
|------|----------------|
| `schema.ts` | Zod schemas, `TOPIC_SLUGS` const, TypeScript types `Topic` and `Exercise` |
| `content.ts` | `getAllTopics()`, `getAllExercises()`, `getExerciseBySlug()` |
| `graph.ts` | `buildGraph()` — derives edges from `prerequisites`, applies Dagre auto-layout |
| `progress.ts` | `markSolved(id)`, `isCompleted(id)`, `getPatternProgress(slug)` — all localStorage |

### Type Safety via Zod

`schema.ts` defines `TOPIC_SLUGS` as a const array of all valid topic slugs.
Any exercise with an invalid `patterns` value causes **build failure**:

```
ZodError: patterns[0] — Invalid enum value.
Expected 'fundamentals' | 'conditional-bayes' | ..., received 'ccambinatory'
```

---

## 4. Pages — `src/app/`

| Route | Description | Data |
|-------|-------------|------|
| `/` | Landing page | Static |
| `/roadmap` | Interactive graph (React Flow) | `buildGraph()` + localStorage |
| `/patterns/[slug]` | Topic page + exercise list | `getAllExercises()` filtered by slug |
| `/exercises/[slug]` | Problem + hints + solution | `getExerciseBySlug()` → full MDX render |

---

## 5. Graph Design

```
topics/*.mdx frontmatter  →  lib/graph.ts  →  React Flow (client component)

edges  = derived from prerequisites field (no separate storage)
layout = Dagre auto-layout (no hardcoded x/y positions)
colors = read from localStorage via progress.ts:
           gray   → not started
           yellow → in progress (some solved)
           green  → all exercises solved
```

---

## 6. Component Design

```
/roadmap
  └── RoadmapGraph.tsx  ('use client')
        └── TopicNode.tsx   (custom React Flow node)
              ├── title
              └── progress bar (X / Y solved)

/exercises/[slug]
  ├── Problem statement  (KaTeX rendered via MDX)
  ├── HintAccordion.tsx  (reveals hints one by one)
  ├── SolutionBlock.tsx  (collapsed by default)
  └── "Mark as Solved" button → progress.ts → localStorage
```

---

## 7. Tech Stack

| Layer | Tool | Reason |
|-------|------|--------|
| Framework | Next.js 15 (App Router) | SSG/SSR, MDX support, routing |
| Language | TypeScript | Type safety end-to-end |
| Styling | Tailwind CSS + shadcn/ui | Fast iteration, accessible components |
| Graph | `@xyflow/react` + `dagre` | Best React graph lib + auto-layout |
| Math | `remark-math` + `rehype-katex` | LaTeX rendering (10x faster than MathJax) |
| Content | `next-mdx-remote` + `gray-matter` | MDX render + frontmatter parsing |
| Validation | `zod` | Build-time frontmatter validation |
| Progress | `localStorage` | No backend needed for MVP |
| Deployment | Vercel | Zero-config Next.js hosting |

> No Supabase, no database, no auth for MVP.

---

## 8. Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Content storage | MDX files | Native LaTeX + JSX, version-controlled, no backend |
| Graph edges | `prerequisites` in topic frontmatter | Co-located with content, derived at build time |
| Graph layout | Dagre auto-layout | No hardcoded coordinates ever |
| Type safety | Zod validation | Build fails on typo, never ships broken refs |
| Progress | localStorage | No DB/auth complexity for MVP |
| Auth | Deferred to Phase 2 | Validate content value first |

---

## 9. What is NOT in MVP

- Authentication / user accounts
- Supabase / any database
- Profile page / dashboard
- SEO optimization (add after content is stable)
- Mobile-first layout (desktop first)
- Community features (comments, submissions)
