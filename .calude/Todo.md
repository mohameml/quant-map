# ProbaCode — TODO List

> App lives at `quant-map/proba-map/`. Build order: setup → content pipeline → exercise page → pattern page → roadmap → landing.

---

## Phase 0 — Project Setup

- [DONE] Initialize Next.js 15 inside `proba-map/` (already exists, init in place)
    ```bash
    cd quant-map/proba-map
    npx create-next-app@latest . --typescript --tailwind --app
    ```
- [DONE] Install core dependencies

    ```bash
    pnpm install @xyflow/react dagre next-mdx-remote gray-matter zod remark-math rehype-katex
    pnpm install -D @types/dagre
    ```

- [DONE] Initialize shadcn/ui

    ```bash
    npx shadcn@latest init
    ```

- [ ] Add placeholder `content/topics/conditional-bayes.mdx` with correct frontmatter

---

## Phase 1 — Content Pipeline

- [ ] `src/lib/schema.ts`
    - Define `TOPIC_SLUGS` const array (all 20 valid slugs)
    - Zod schema for `TopicFrontmatter`
    - Zod schema for `ExerciseFrontmatter`
    - Export TypeScript types `Topic` and `Exercise`

- [ ] Write 6 topic MDX files in `content/topics/`
    - Each needs: `id`, `title`, `description`, `prerequisites`, `order`
    - Start with the 6 core ones: `fundamentals`, `conditional-bayes`, `counting`, `discrete-dist`, `linearity-expectation`, `conditional-expectation`

- [ ] `src/lib/content.ts`
    - `getAllTopics()` — reads all topic MDX, parses frontmatter, validates with Zod
    - `getAllExercises()` — reads all exercise MDX, parses frontmatter, validates with Zod
    - `getExerciseBySlug(slug)` — returns frontmatter + compiled MDX body
    - `getExercisesByPattern(slug)` — returns exercises for a given topic slug

- [ ] Verify build-time validation works:
    - Temporarily add invalid slug to an exercise → `next build` should fail with clear Zod error
    - Fix it → build should pass

---

## Phase 2 — Exercise Page

- [ ] `src/components/mdx/MdxComponents.tsx`
    - Map `<Hint>` JSX tag to the HintAccordion component
    - Pass through standard HTML elements with Tailwind prose styling

- [ ] `src/components/exercise/HintAccordion.tsx`
    - Renders hints progressively (reveal one at a time with a "Next hint" button)
    - Shows hint count (e.g. "Hint 2 / 3")

- [ ] `src/components/exercise/SolutionBlock.tsx`
    - Collapsed by default ("Show solution" button)
    - Expands to reveal full LaTeX solution

- [ ] `src/lib/progress.ts`
    - `markSolved(exerciseId: string): void`
    - `markAttempted(exerciseId: string): void`
    - `isCompleted(exerciseId: string): boolean`
    - `getPatternProgress(topicSlug: string, exercises: Exercise[]): { total, completed, status }`

- [ ] `src/app/exercises/[slug]/page.tsx`
    - Fetch exercise by slug (SSG with `generateStaticParams`)
    - Render: title, difficulty badge, problem statement, hints, solution
    - "Mark as Solved" button (client component, writes to localStorage)

---

## Phase 3 — Pattern Page

- [ ] `src/components/ExerciseCard.tsx`
    - Shows: title, difficulty badge, tags, solved checkmark (from localStorage)
    - Links to `/exercises/[slug]`

- [ ] `src/app/patterns/[slug]/page.tsx`
    - Fetch topic + its exercises (SSG with `generateStaticParams`)
    - Render: topic title, description, prerequisites list, exercise cards sorted by difficulty

---

## Phase 4 — Roadmap Graph

- [ ] `src/lib/graph.ts`
    - `buildGraph()`:
        - nodes from `getAllTopics()`
        - edges derived from `prerequisites` field
        - apply Dagre layout to compute `x, y` positions
    - Return `{ nodes, edges }` typed for React Flow

- [ ] `src/components/graph/TopicNode.tsx`
    - Custom React Flow node
    - Shows: topic title, progress bar (X / Y solved)
    - Color: gray (not started) / yellow (in progress) / green (completed)
    - Click → navigates to `/patterns/[slug]`

- [ ] `src/components/graph/RoadmapGraph.tsx` (`'use client'`)
    - Renders React Flow with custom `TopicNode`
    - Reads progress from localStorage on mount
    - Controls: zoom, pan, fit-to-screen button

- [ ] `src/app/roadmap/page.tsx`
    - Fetches graph data at build time (`buildGraph()`)
    - Passes nodes/edges as props to `RoadmapGraph` client component

---

## Phase 5 — Landing Page & Layout

- [ ] `src/app/layout.tsx` — root layout: font, global styles, navbar
- [ ] `src/components/Navbar.tsx` — logo + links to `/roadmap` and `/patterns`
- [ ] `src/app/page.tsx` — simple landing: headline, tagline, CTA button to `/roadmap`

---

## Phase 6 — Content Sprint

> Goal: 30 quality exercises across 6 core patterns before first publish.

- [ ] `conditional-bayes` — 5 exercises (have 2: biased-coin, two-children)
- [ ] `fundamentals` — 5 exercises
- [ ] `counting` — 5 exercises
- [ ] `linearity-expectation` — 5 exercises
- [ ] `discrete-dist` — 5 exercises
- [ ] `conditional-expectation` — 5 exercises

---

## Phase 7 — Deploy

- [ ] Push `proba-map/` to GitHub
- [ ] Connect repo to Vercel, set root directory to `proba-map/`
- [ ] Verify production build passes
- [ ] Check KaTeX renders correctly in production

---

## Deferred (Post-MVP)

- Auth (Google / GitHub OAuth via Supabase)
- User progress synced to database
- Profile page with stats and heatmap
- SEO: meta tags, sitemap, JSON-LD
- Mobile layout optimization
- Dark mode
- Timed mock quizzes
- Community solutions / comments
