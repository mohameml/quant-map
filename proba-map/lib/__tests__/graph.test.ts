import { describe, it, expect } from "vitest";
import { buildGraph } from "../graph";
import type { Topic, Exercise } from "../schema";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeTopic(
    slug: string,
    prerequisites: string[] = [],
    order = 1,
): Topic {
    return {
        id: slug as Topic["id"],
        slug,
        title: slug.replace(/-/g, " "),
        description: "",
        prerequisites: prerequisites as Topic["prerequisites"],
        order,
        body: "",
    };
}

function makeExercise(id: string, pattern: string): Exercise {
    return {
        id,
        slug: id,
        title: id,
        difficulty: "Easy",
        patterns: [pattern as Exercise["patterns"][number]],
        primaryPattern: pattern as Exercise["primaryPattern"],
        tags: [],
        body: "",
    };
}

// ─── buildGraph ───────────────────────────────────────────────────────────────

describe("buildGraph", () => {
    it("returns empty nodes and edges for empty topics", () => {
        const { nodes, edges } = buildGraph([], {});
        expect(nodes).toHaveLength(0);
        expect(edges).toHaveLength(0);
    });

    it("creates one node per topic", () => {
        const topics = [makeTopic("combinatorics"), makeTopic("random-variables")];
        const { nodes } = buildGraph(topics, {});
        expect(nodes).toHaveLength(2);
    });

    it("every node has type 'topicNode'", () => {
        const topics = [makeTopic("combinatorics"), makeTopic("random-variables")];
        const { nodes } = buildGraph(topics, {});
        for (const node of nodes) {
            expect(node.type).toBe("topicNode");
        }
    });

    it("node id matches topic slug", () => {
        const topics = [makeTopic("combinatorics"), makeTopic("random-variables")];
        const { nodes } = buildGraph(topics, {});
        const ids = nodes.map((n) => n.id);
        expect(ids).toContain("combinatorics");
        expect(ids).toContain("random-variables");
    });

    it("node positions are finite numbers", () => {
        const topics = [makeTopic("combinatorics"), makeTopic("random-variables")];
        const { nodes } = buildGraph(topics, {});
        for (const node of nodes) {
            expect(Number.isFinite(node.position.x)).toBe(true);
            expect(Number.isFinite(node.position.y)).toBe(true);
        }
    });

    it("creates one edge per prerequisite relationship", () => {
        const topics = [
            makeTopic("combinatorics"),
            makeTopic("random-variables", ["combinatorics"]),
        ];
        const { edges } = buildGraph(topics, {});
        expect(edges).toHaveLength(1);
        expect(edges[0].source).toBe("combinatorics");
        expect(edges[0].target).toBe("random-variables");
    });

    it("edge id encodes source→target", () => {
        const topics = [
            makeTopic("combinatorics"),
            makeTopic("random-variables", ["combinatorics"]),
        ];
        const { edges } = buildGraph(topics, {});
        expect(edges[0].id).toBe("combinatorics->random-variables");
    });

    it("creates multiple edges for multiple prerequisites", () => {
        const topics = [
            makeTopic("combinatorics"),
            makeTopic("random-variables"),
            makeTopic("joint-distributions", [
                "combinatorics",
                "random-variables",
            ]),
        ];
        const { edges } = buildGraph(topics, {});
        expect(edges).toHaveLength(2);
    });

    it("fills exerciseCount from exercisesByTopic", () => {
        const topics = [makeTopic("combinatorics")];
        const exercises = [
            makeExercise("ex1", "combinatorics"),
            makeExercise("ex2", "combinatorics"),
        ];
        const { nodes } = buildGraph(topics, { combinatorics: exercises });
        expect(nodes[0].data.exerciseCount).toBe(2);
    });

    it("exerciseCount is 0 when topic has no exercises", () => {
        const topics = [makeTopic("combinatorics")];
        const { nodes } = buildGraph(topics, {});
        expect(nodes[0].data.exerciseCount).toBe(0);
    });

    it("node data contains label and slug", () => {
        const topics = [makeTopic("combinatorics")];
        const { nodes } = buildGraph(topics, {});
        expect(nodes[0].data.label).toBe("combinatorics");
        expect(nodes[0].data.slug).toBe("combinatorics");
    });
});
