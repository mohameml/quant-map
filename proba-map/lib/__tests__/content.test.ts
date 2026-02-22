import { describe, it, expect } from "vitest";
import {
    getAllTopics,
    getAllExercises,
    getExercisesByPattern,
    getExercisesByTopic,
    getExerciseBySlug,
} from "../content";
import { TOPIC_SLUGS } from "../schema";

// Integration tests — read actual content from content/
// Run from proba-map/ so process.cwd() resolves correctly.

describe("getAllTopics", () => {
    it("returns a non-empty array", () => {
        const topics = getAllTopics();
        expect(topics.length).toBeGreaterThan(0);
    });

    it("is sorted by order (ascending)", () => {
        const topics = getAllTopics();
        for (let i = 1; i < topics.length; i++) {
            expect(topics[i].order).toBeGreaterThanOrEqual(topics[i - 1].order);
        }
    });

    it("every topic has required fields", () => {
        const topics = getAllTopics();
        for (const topic of topics) {
            expect(typeof topic.id).toBe("string");
            expect(typeof topic.title).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(Array.isArray(topic.prerequisites)).toBe(true);
            expect(typeof topic.order).toBe("number");
            expect(typeof topic.body).toBe("string");
            expect(typeof topic.slug).toBe("string");
        }
    });

    it("topic slugs match their id", () => {
        const topics = getAllTopics();
        for (const topic of topics) {
            expect(topic.slug).toBe(topic.id);
        }
    });

    it("all topic ids are valid TOPIC_SLUGS", () => {
        const topics = getAllTopics();
        const validSlugs: readonly string[] = TOPIC_SLUGS;
        for (const topic of topics) {
            expect(validSlugs).toContain(topic.id);
        }
    });
});

describe("getAllExercises", () => {
    it("returns an array (may be empty if no exercises exist)", () => {
        const exercises = getAllExercises();
        expect(Array.isArray(exercises)).toBe(true);
    });

    it("is sorted by difficulty (Easy → Medium → Hard)", () => {
        const ORDER = { Easy: 0, Medium: 1, Hard: 2 } as const;
        const exercises = getAllExercises();
        for (let i = 1; i < exercises.length; i++) {
            expect(ORDER[exercises[i].difficulty]).toBeGreaterThanOrEqual(
                ORDER[exercises[i - 1].difficulty],
            );
        }
    });

    it("every exercise has required fields", () => {
        const exercises = getAllExercises();
        for (const ex of exercises) {
            expect(typeof ex.id).toBe("string");
            expect(ex.id.length).toBeGreaterThan(0);
            expect(typeof ex.title).toBe("string");
            expect(["Easy", "Medium", "Hard"]).toContain(ex.difficulty);
            expect(ex.patterns.length).toBeGreaterThan(0);
            expect(typeof ex.primaryPattern).toBe("string");
            expect(typeof ex.slug).toBe("string");
            expect(typeof ex.body).toBe("string");
        }
    });

    it("every exercise primaryPattern is a valid TopicSlug", () => {
        const exercises = getAllExercises();
        const validSlugs: readonly string[] = TOPIC_SLUGS;
        for (const ex of exercises) {
            expect(validSlugs).toContain(ex.primaryPattern);
        }
    });

    it("exercise slug matches its id", () => {
        const exercises = getAllExercises();
        for (const ex of exercises) {
            expect(ex.slug).toBe(ex.id);
        }
    });
});

describe("getExercisesByTopic", () => {
    it("returns all TOPIC_SLUGS as keys", () => {
        const byTopic = getExercisesByTopic();
        for (const slug of TOPIC_SLUGS) {
            expect(slug in byTopic).toBe(true);
        }
    });

    it("each value is an array", () => {
        const byTopic = getExercisesByTopic();
        for (const exercises of Object.values(byTopic)) {
            expect(Array.isArray(exercises)).toBe(true);
        }
    });

    it("an exercise appears under each of its patterns", () => {
        const byTopic = getExercisesByTopic();
        const allExercises = getAllExercises();
        for (const ex of allExercises) {
            for (const pattern of ex.patterns) {
                const group = byTopic[pattern] ?? [];
                expect(group.some((e) => e.id === ex.id)).toBe(true);
            }
        }
    });
});

describe("getExercisesByPattern", () => {
    it("returns the same exercises as getExercisesByTopic for a given slug", () => {
        const byTopic = getExercisesByTopic();
        for (const slug of TOPIC_SLUGS) {
            const fromPattern = getExercisesByPattern(slug);
            const fromTopic = byTopic[slug] ?? [];
            expect(fromPattern.map((e) => e.id).sort()).toEqual(
                fromTopic.map((e) => e.id).sort(),
            );
        }
    });
});

describe("getExerciseBySlug", () => {
    it("returns null for an unknown slug", () => {
        expect(getExerciseBySlug("does-not-exist")).toBeNull();
    });

    it("returns the correct exercise for a known slug", () => {
        const exercises = getAllExercises();
        if (exercises.length === 0) return; // skip if no content yet
        const first = exercises[0];
        const found = getExerciseBySlug(first.id);
        expect(found).not.toBeNull();
        expect(found!.id).toBe(first.id);
    });
});
