"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import type { TopicNodeData } from "@/lib/graph"
import { cn } from "@/lib/utils"

type ProgressState = "not-started" | "in-progress" | "completed"

function getProgressState(solved: number, total: number): ProgressState {
  if (total === 0 || solved === 0) return "not-started"
  if (solved >= total) return "completed"
  return "in-progress"
}

const BORDER_COLORS: Record<ProgressState, string> = {
  "not-started": "border-gray-300 hover:border-gray-400",
  "in-progress": "border-yellow-400 hover:border-yellow-500",
  completed: "border-green-500 hover:border-green-600",
}

const BAR_COLORS: Record<ProgressState, string> = {
  "not-started": "bg-gray-200",
  "in-progress": "bg-yellow-400",
  completed: "bg-green-500",
}

type TopicNodeProps = NodeProps & {
  data: TopicNodeData & { solvedCount: number }
}

export const TopicNode = memo(function TopicNode({ data }: TopicNodeProps) {
  const { label, exerciseCount, solvedCount } = data
  const state = getProgressState(solvedCount, exerciseCount)
  const pct = exerciseCount > 0 ? (solvedCount / exerciseCount) * 100 : 0

  return (
    <>
      <Handle type="target" position={Position.Top} className="!invisible" />
      <div
        className={cn(
          "flex w-55 cursor-pointer flex-col gap-1 rounded-lg border-2 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md",
          BORDER_COLORS[state]
        )}
      >
        <span className="truncate text-center text-[13px] font-medium text-gray-900">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className={cn("h-full rounded-full transition-all", BAR_COLORS[state])}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-500">
            {solvedCount}/{exerciseCount}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!invisible" />
    </>
  )
})
