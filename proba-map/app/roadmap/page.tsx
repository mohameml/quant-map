import { getAllTopics, getExercisesByTopic } from "@/lib/content";
import { buildGraph } from "@/lib/graph";
import { RoadmapGraph } from "@/components/roadmap/roadmap-graph";

export default function RoadmapPage() {
    const topics = getAllTopics();
    const exercisesByTopic = getExercisesByTopic();
    const { nodes, edges } = buildGraph(topics, exercisesByTopic);

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
