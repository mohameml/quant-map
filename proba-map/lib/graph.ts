import dagre from "dagre";
import type { Node, Edge } from "@xyflow/react";
import type { Topic } from "./schema";

export type TopicNodeData = {
	label: string;
	slug: string;
	exerciseCount: number;
};

/**
 * Builds React Flow nodes and edges from topic data using dagre auto-layout.
 */
export function buildGraph(topics: Topic[]): {
	nodes: Node<TopicNodeData>[];
	edges: Edge[];
} {
	const g = new dagre.graphlib.Graph();
	g.setDefaultEdgeLabel(() => ({}));
	g.setGraph({
		rankdir: "TB",
		nodesep: 60,
		ranksep: 80,
		marginx: 40,
		marginy: 40,
	});

	// Add nodes
	for (const topic of topics) {
		g.setNode(topic.slug, { width: 220, height: 60 });
	}

	// Add edges from prerequisites
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
				style: { stroke: "#c8ccd2", strokeWidth: 2.5 },
				markerEnd: {
					type: "arrowclosed" as const,
					color: "#c8ccd2",
					width: 18,
					height: 18,
				},
			});
		}
	}

	// Run dagre layout
	dagre.layout(g);

	// Convert to React Flow nodes
	const nodes: Node<TopicNodeData>[] = topics.map((topic) => {
		const pos = g.node(topic.slug);
		return {
			id: topic.slug,
			type: "topicNode",
			position: { x: pos.x - 110, y: pos.y - 30 },
			data: {
				label: topic.title,
				slug: topic.slug,
				exerciseCount: 0, // filled by the page component
			},
		};
	});

	return { nodes, edges };
}
