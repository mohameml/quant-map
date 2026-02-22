"use client";

import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { StatusIcon } from "@/components/status-icon";
import type { Exercise } from "@/lib/schema";

export function ExerciseTable({
    exercises,
    isSolved,
}: {
    exercises: Exercise[];
    isSolved: (id: string) => boolean;
}) {
    const router = useRouter();

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-gray-200 bg-gray-50/80">
                    <TableHead className="w-8 py-3 text-xs font-semibold text-gray-500">
                        #
                    </TableHead>
                    <TableHead className="py-3 text-xs font-semibold text-gray-500">
                        Title
                    </TableHead>
                    <TableHead className="w-20 py-3 text-center text-xs font-semibold text-gray-500">
                        Difficulty
                    </TableHead>
                    <TableHead className="w-14 py-3 text-center text-xs font-semibold text-gray-500">
                        Status
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {exercises.map((ex, i) => (
                    <TableRow
                        key={ex.id}
                        className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
                        onClick={() => router.push(`/exercises/${ex.id}`)}
                    >
                        <TableCell className="py-4 text-gray-400">
                            {i + 1}
                        </TableCell>
                        <TableCell className="py-4 font-medium">
                            {ex.title}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                            <DifficultyBadge level={ex.difficulty} />
                        </TableCell>
                        <TableCell className="py-4 text-center">
                            <StatusIcon solved={isSolved(ex.id)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
