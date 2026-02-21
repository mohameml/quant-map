---
name: frontend-design
description: Use when discussing UI/UX design decisions, creating component specs, reviewing mockups, or planning page layouts for ProbaCode. Helps maintain design consistency across the app.
---

# ProbaCode — Frontend Design Skill

You are a frontend design consultant for **ProbaCode**, a NeetCode-style probability interview prep platform. When helping with design, always follow these established decisions and principles.

## Design Philosophy

- **Clean and minimal** — black/white base, green accent for progress
- **Desktop-first** — MVP targets desktop users (quant traders, ML researchers)
- **Content-focused** — UI should not compete with LaTeX-rendered math content
- **NeetCode-inspired** — dependency graph roadmap as the core navigation

## Tech Stack (Design-Relevant)

| Tool | Purpose |
|------|---------|
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible component primitives (Sheet, Accordion, Button, etc.) |
| @xyflow/react | Interactive graph (roadmap) |
| KaTeX | LaTeX math rendering |

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#ffffff` | Page background |
| Text primary | `#111827` (gray-900) | Headings, body |
| Text secondary | `#6b7280` (gray-500) | Labels, meta text |
| Border default | `#e5e7eb` (gray-200) | Cards, dividers |
| Accent green | `#16a34a` (green-600) | Buttons, active tabs, CTA |
| Progress green | `#22c55e` (green-500) | Completed state, full bars |
| Progress yellow | `#facc15` (yellow-400) | In-progress state |
| Progress gray | `#e5e7eb` (gray-200) | Not-started state, empty bars |
| Easy | `#22c55e` (green-500) | Easy difficulty text |
| Medium | `#eab308` (yellow-500) | Medium difficulty text |
| Hard | `#ef4444` (red-500) | Hard difficulty text |

## Typography

- Font: System font stack (Inter if available via Tailwind default)
- Headings: `font-bold`, sizes vary by context
- Body: `text-sm` (14px) or `text-base` (16px)
- Code/math: KaTeX handles math rendering, monospace for inline code
- No custom fonts for MVP

## Spacing & Layout

- Page max-width: none for roadmap (full viewport), `max-w-4xl` for content pages
- Consistent padding: `p-6` for cards, `p-4` for compact sections
- Gap between elements: `gap-4` (16px) default, `gap-6` (24px) for sections

## Navbar (Shared)

```
┌───────────────────────────────────────────────────────────┐
│  [P] Proba-Map       [Roadmap]  [Topics]  [Exercises]  👤 │
└───────────────────────────────────────────────────────────┘
```

- Height: 56px, sticky top, white bg + `border-b`
- Logo: green circle "P" + "Proba-Map" text → links to `/`
- Tabs: centered, green underline on active
- User icon: far right (placeholder, no auth in MVP)

## Established Page Designs

### Roadmap Page (`/roadmap`)
- Full spec: `.calude/design/roadmap-page.md`
- Interactive React Flow graph, dot grid background, mini controls
- 18 topic nodes: rounded rectangle ~180×60px, progress bar inside
- Progress colors: gray (not started) → yellow (in progress) → green (completed)
- Smooth bezier edges, gray arrows
- Click node → Sheet slides from right with exercise list

### Exercise Page (`/exercises/[slug]`) — TBD
### Topic Page (`/patterns/[slug]`) — TBD
### Landing Page (`/`) — TBD

## Design Principles When Creating New Components

1. **Use shadcn/ui primitives** — don't reinvent buttons, sheets, accordions
2. **Tailwind only** — no CSS modules, no styled-components
3. **Progress is always green** — this is the primary visual language
4. **Difficulty colors are consistent** — green/yellow/red everywhere
5. **No emojis in UI** unless explicitly requested
6. **Hover states on all interactive elements** — subtle bg change or border highlight
7. **Transitions** — `transition-all duration-200` for smooth interactions

## Reference Files

- Design specs: `.calude/design/` directory
- Existing mockups: `assets/ui/` directory
- Inspiration: `assets/inspiration/` directory
- System design: `.calude/design/system-design.md`
- Frontend decisions: `.calude/design/frontend-design.md`
- Feature priorities: `.calude/Features.md`

## When Discussing Design

1. Always reference existing mockups in `assets/ui/` if relevant
2. Present options with ASCII mockups or markdown previews when possible
3. Save finalized design specs to `.calude/design/<page-name>.md`
4. Keep decisions concise — table format preferred over prose
5. Consider accessibility (keyboard nav, screen readers, ARIA) in every component
