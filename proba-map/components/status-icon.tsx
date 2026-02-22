import { CircleCheckBig, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusIcon({
    solved,
    className,
}: {
    solved: boolean;
    className?: string;
}) {
    if (solved) {
        return <CircleCheckBig className={cn("h-4 w-4 text-green-500", className)} />;
    }
    return <Circle className={cn("h-4 w-4 text-gray-300", className)} />;
}
