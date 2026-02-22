import { describe, it, expect } from "vitest";
import {
    TopicFrontmatterSchema,
    ExerciseFrontmatterSchema,
    TOPIC_SLUGS,
} from "../schema";

// ─── TopicFrontmatterSchema ───────────────────────────────────────────────────

describe("TopicFrontmatterSchema", () => {
    const valid = {
        id: "combinatorics",
        title: "Combinatorics",
        description: "Counting principles",
        prerequisites: [],
        order: 1,
    };

    it("parses valid frontmatter", () => {
        const result = TopicFrontmatterSchema.parse(valid);
        expect(result.id).toBe("combinatorics");
        expect(result.prerequisites).toEqual([]);
        expect(result.order).toBe(1);
    });

    it("parses with prerequisites", () => {
        const result = TopicFrontmatterSchema.parse({
            ...valid,
            prerequisites: ["combinatorics", "random-variables"],
        });
        expect(result.prerequisites).toHaveLength(2);
    });

    it("rejects an unknown id", () => {
        expect(() =>
            TopicFrontmatterSchema.parse({ ...valid, id: "nonexistent-slug" }),
        ).toThrow();
    });

    it("rejects an unknown prerequisite slug", () => {
        expect(() =>
            TopicFrontmatterSchema.parse({
                ...valid,
                prerequisites: ["not-a-real-topic"],
            }),
        ).toThrow();
    });

    it("rejects order = 0 (must be positive)", () => {
        expect(() =>
            TopicFrontmatterSchema.parse({ ...valid, order: 0 }),
        ).toThrow();
    });

    it("rejects non-integer order", () => {
        expect(() =>
            TopicFrontmatterSchema.parse({ ...valid, order: 1.5 }),
        ).toThrow();
    });

    it("rejects missing title", () => {
        const { title: _, ...rest } = valid;
        expect(() => TopicFrontmatterSchema.parse(rest)).toThrow();
    });
});

// ─── ExerciseFrontmatterSchema ────────────────────────────────────────────────

describe("ExerciseFrontmatterSchema", () => {
    const valid = {
        id: "two-dice-rolls",
        title: "Two Dice Rolls",
        difficulty: "Easy",
        patterns: ["combinatorics"],
        tags: ["counting"],
    };

    it("parses valid frontmatter", () => {
        const result = ExerciseFrontmatterSchema.parse(valid);
        expect(result.id).toBe("two-dice-rolls");
        expect(result.difficulty).toBe("Easy");
        expect(result.patterns).toEqual(["combinatorics"]);
        expect(result.tags).toEqual(["counting"]);
    });

    it("defaults tags to [] when omitted", () => {
        const { tags: _, ...rest } = valid;
        const result = ExerciseFrontmatterSchema.parse(rest);
        expect(result.tags).toEqual([]);
    });

    it("accepts all difficulty levels", () => {
        for (const difficulty of ["Easy", "Medium", "Hard"] as const) {
            const result = ExerciseFrontmatterSchema.parse({
                ...valid,
                difficulty,
            });
            expect(result.difficulty).toBe(difficulty);
        }
    });

    it("rejects invalid difficulty", () => {
        expect(() =>
            ExerciseFrontmatterSchema.parse({ ...valid, difficulty: "Extreme" }),
        ).toThrow();
    });

    it("rejects unknown pattern slug", () => {
        expect(() =>
            ExerciseFrontmatterSchema.parse({
                ...valid,
                patterns: ["not-a-topic"],
            }),
        ).toThrow();
    });

    it("rejects empty patterns array", () => {
        expect(() =>
            ExerciseFrontmatterSchema.parse({ ...valid, patterns: [] }),
        ).toThrow();
    });

    it("accepts multiple valid patterns", () => {
        const result = ExerciseFrontmatterSchema.parse({
            ...valid,
            patterns: ["combinatorics", "random-variables"],
        });
        expect(result.patterns).toHaveLength(2);
    });

    it("rejects empty id", () => {
        expect(() =>
            ExerciseFrontmatterSchema.parse({ ...valid, id: "" }),
        ).toThrow();
    });
});

// ─── TOPIC_SLUGS ──────────────────────────────────────────────────────────────

describe("TOPIC_SLUGS", () => {
    it("contains at least one slug", () => {
        expect(TOPIC_SLUGS.length).toBeGreaterThan(0);
    });

    it("has no duplicates", () => {
        const unique = new Set(TOPIC_SLUGS);
        expect(unique.size).toBe(TOPIC_SLUGS.length);
    });

    it("all slugs are kebab-case strings", () => {
        for (const slug of TOPIC_SLUGS) {
            expect(slug).toMatch(/^[a-z][a-z0-9-]*$/);
        }
    });
});
