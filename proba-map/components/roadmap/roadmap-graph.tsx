"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { TopicNode } from "./topic-node"
import { TopicSheet } from "./topic-sheet"
import { useProgress } from "@/hooks/use-progress"
import type { Topic, Exercise } from "@/lib/schema"
import type { TopicNodeData } from "@/lib/graph"

const nodeTypes = { topicNode: TopicNode }

export function RoadmapGraph({
  initialNodes,
  initialEdges,
  topics,
  exercisesByTopic,
}: {
  initialNodes: Node<TopicNodeData>[]
  initialEdges: Edge[]
  topics: Topic[]
  exercisesByTopic: Record<string, Exercise[]>
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const { isSolved, getProgress } = useProgress()

  // Enrich nodes with progress data
  const enrichedNodes = useMemo(() => {
    return initialNodes.map((node) => {
      const exercises = exercisesByTopic[node.data.slug] ?? []
      const exerciseIds = exercises.map((ex) => ex.id)
      const { solved } = getProgress(exerciseIds)
      return {
        ...node,
        data: {
          ...node.data,
          exerciseCount: exercises.length,
          solvedCount: solved,
        },
      }
    })
  }, [initialNodes, exercisesByTopic, getProgress])

  const [nodes, setNodes, onNodesChange] = useNodesState(enrichedNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  // Sync enriched nodes when progress changes
  useEffect(() => {
    setNodes(enrichedNodes)
  }, [enrichedNodes, setNodes])

  const selectedTopic = useMemo(
    () => topics.find((t) => t.slug === selectedSlug) ?? null,
    [topics, selectedSlug]
  )

  const selectedExercises = useMemo(
    () => (selectedSlug ? exercisesByTopic[selectedSlug] ?? [] : []),
    [selectedSlug, exercisesByTopic]
  )

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedSlug(node.id)
  }, [])

  return (
    <div className="h-[calc(100vh-56px)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        className="cursor-grab! active:cursor-grabbing! [&_.react-flow__node]:cursor-pointer!"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.5} color="#e5e7eb" />
        <Controls
          showInteractive={false}
          position="bottom-right"
        />
      </ReactFlow>

      <TopicSheet
        open={selectedSlug !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSlug(null)
        }}
        topic={selectedTopic}
        exercises={selectedExercises}
        isSolved={isSolved}
      />
    </div>
  )
}
