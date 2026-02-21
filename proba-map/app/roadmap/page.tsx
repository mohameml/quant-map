import { getAllTopics, getExercisesByPattern } from "@/lib/content";
import { buildGraph } from "@/lib/graph";
import { RoadmapGraph } from "@/components/roadmap/roadmap-graph";
import type { Exercise, TopicSlug } from "@/lib/schema";

export default function RoadmapPage() {
    const topics = getAllTopics();
    const { nodes, edges } = buildGraph(topics);

    // Pre-load exercises grouped by topic slug
    const exercisesByTopic: Record<string, Exercise[]> = {};
    for (const topic of topics) {
        exercisesByTopic[topic.slug] = getExercisesByPattern(
            topic.slug as TopicSlug,
        );
    }

    return (
        <main>
            <RoadmapGraph
                initialNodes={nodes}
                initialEdges={edges}
                topics={topics}
                exercisesByTopic={exercisesByTopic}
            />
        </main>
    );
}
