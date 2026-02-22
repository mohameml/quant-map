"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Progress } from "@/components/ui/progress";
import type { TopicNodeData } from "@/lib/graph";
import { cn } from "@/lib/utils";

type ProgressState = "not-started" | "in-progress" | "completed";

function getProgressState(solved: number, total: number): ProgressState {
    if (total === 0 || solved === 0) return "not-started";
    if (solved >= total) return "completed";
    return "in-progress";
}

// These reference the CSS variables defined in globals.css
const BORDER_CLASSES: Record<ProgressState, string> = {
    "not-started":
        "border-[var(--progress-not-started-border)] hover:border-[var(--progress-not-started-border-hover)]",
    "in-progress":
        "border-[var(--progress-in-progress-border)] hover:border-[var(--progress-in-progress-border-hover)]",
    completed:
        "border-[var(--progress-completed-border)] hover:border-[var(--progress-completed-border-hover)]",
};

const PROGRESS_INDICATOR_CLASS: Record<ProgressState, string> = {
    "not-started": "[&>div]:bg-[var(--progress-not-started-bar)]",
    "in-progress": "[&>div]:bg-[var(--progress-in-progress-bar)]",
    completed: "[&>div]:bg-[var(--progress-completed-bar)]",
};

type TopicNodeProps = NodeProps & {
    data: TopicNodeData & { solvedCount: number };
};

export const TopicNode = memo(function TopicNode({ data }: TopicNodeProps) {
    const { label, exerciseCount, solvedCount } = data;
    const state = getProgressState(solvedCount, exerciseCount);
    const pct = exerciseCount > 0 ? (solvedCount / exerciseCount) * 100 : 0;
    // const isEmpty = exerciseCount === 0;

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                className="!invisible"
            />
            <div
                className={cn(
                    "flex w-55 cursor-pointer flex-col gap-1 rounded-lg border-2 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md",
                    BORDER_CLASSES[state],
                    // isEmpty && "opacity-50",
                )}
            >
                <span className="truncate text-center text-[13px] font-medium text-gray-900">
                    {label}
                </span>
                <div className="flex items-center gap-2">
                    <Progress
                        value={pct}
                        className={cn(
                            "h-1 flex-1",
                            PROGRESS_INDICATOR_CLASS[state],
                        )}
                    />
                    <span className="text-[11px] text-gray-500">
                        {solvedCount}/{exerciseCount}
                    </span>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="!invisible"
            />
        </>
    );
});
