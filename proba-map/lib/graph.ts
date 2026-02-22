import dagre from "dagre";
import type { Node, Edge } from "@xyflow/react";
import type { Topic, Exercise, TopicSlug } from "./schema";

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_W = 220;
const NODE_H = 60;

const LAYOUT_CONFIG = {
    rankdir: "TB",
    nodesep: 60,
    ranksep: 80,
    marginx: 40,
    marginy: 40,
} as const;

const EDGE_CONFIG = {
    stroke: "var(--edge-color)",
    strokeWidth: 2.5,
    markerWidth: 15,
    markerHeight: 15,
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopicNodeData = {
    label: string;
    slug: string;
    exerciseCount: number;
};

// ─── buildGraph ───────────────────────────────────────────────────────────────

/**
 * Builds React Flow nodes and edges from topic data using dagre auto-layout.
 * Accepts a pre-grouped exercise map so exerciseCount is filled at build time.
 */
export function buildGraph(
    topics: Topic[],
    exercisesByTopic: Record<string, Exercise[]>,
): {
    nodes: Node<TopicNodeData>[];
    edges: Edge[];
} {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph(LAYOUT_CONFIG);

    for (const topic of topics) {
        g.setNode(topic.slug, { width: NODE_W, height: NODE_H });
    }

    const edges: Edge[] = [];
    for (const topic of topics) {
        for (const prereq of topic.prerequisites) {
            const edgeId = `${prereq}->${topic.slug}`;
            g.setEdge(prereq, topic.slug);
            edges.push({
                id: edgeId,
                source: prereq,
                target: topic.slug,
                type: "default",
                style: {
                    stroke: EDGE_CONFIG.stroke,
                    strokeWidth: EDGE_CONFIG.strokeWidth,
                },
                markerEnd: {
                    type: "arrowclosed" as const,
                    color: EDGE_CONFIG.stroke,
                    width: EDGE_CONFIG.markerWidth,
                    height: EDGE_CONFIG.markerHeight,
                },
            });
        }
    }

    dagre.layout(g);

    const nodes: Node<TopicNodeData>[] = topics.map((topic) => {
        const pos = g.node(topic.slug);
        const exercises = exercisesByTopic[topic.slug as TopicSlug] ?? [];
        return {
            id: topic.slug,
            type: "topicNode",
            position: { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 },
            data: {
                label: topic.title,
                slug: topic.slug,
                exerciseCount: exercises.length,
            },
        };
    });

    return { nodes, edges };
}
