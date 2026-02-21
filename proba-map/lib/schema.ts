import { z } from "zod";

// ─── Topic slugs ────────────────────────────────────────────────────────────
// Single source of truth. Any frontmatter reference to a non-existent slug
// will cause a Zod error at build time.

export const TOPIC_SLUGS = [
    "combinatorics",
    "fundamentals",
    "random-variables",
    "conditional-probability",
    "discrete-distributions",
    "continuous-distributions",
    "joint-distributions",
    "convergence",
    "simulation",
    "markov-chains",
    "statistics",
    "time-series",
    "conditional-expectation",
    "brownian-motion",
    "martingales",
    "stopping-times",
    "ito-calculus",
    "sdes",
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];

// ─── Topic frontmatter schema ────────────────────────────────────────────────

export const TopicFrontmatterSchema = z.object({
    id: z.enum(TOPIC_SLUGS),
    title: z.string(),
    description: z.string(),
    prerequisites: z.array(z.enum(TOPIC_SLUGS)),
    order: z.number().int().positive(),
    section: z.enum([
        "fondations",
        "convergence",
        "discrets",
        "continus",
        "stochastique",
    ]),
});

export type TopicFrontmatter = z.infer<typeof TopicFrontmatterSchema>;

// Enriched at runtime with the MDX body
export type Topic = TopicFrontmatter & {
    slug: string; // = id
    body: string; // raw MDX content (compiled separately)
};

// ─── Exercise frontmatter schema ─────────────────────────────────────────────

export const ExerciseFrontmatterSchema = z.object({
    id: z.string().min(1),
    title: z.string(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    patterns: z.array(z.enum(TOPIC_SLUGS)).min(1),
    tags: z.array(z.string()).optional().default([]),
});

export type ExerciseFrontmatter = z.infer<typeof ExerciseFrontmatterSchema>;

// Enriched at runtime with file path info and MDX body
export type Exercise = ExerciseFrontmatter & {
    slug: string; // = id (filename stem)
    primaryPattern: string; // = parent directory name
    body: string; // raw MDX content
};
