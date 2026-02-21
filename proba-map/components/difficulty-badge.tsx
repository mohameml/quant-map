import { cn } from "@/lib/utils";

const COLORS = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
} as const;

export function DifficultyBadge({
    level,
    className,
}: {
    level: "Easy" | "Medium" | "Hard";
    className?: string;
}) {
    return (
        <span className={cn("text-sm font-medium", COLORS[level], className)}>
            {level}
        </span>
    );
}
