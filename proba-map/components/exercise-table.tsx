"use client";

import Link from "next/link";
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
import { useProgressContext } from "@/components/progress-provider";
import type { Exercise } from "@/lib/schema";

export function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
    const { isSolved, markSolved, unmarkSolved } = useProgressContext();

    function toggleStatus(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        if (isSolved(id)) {
            unmarkSolved(id);
        } else {
            markSolved(id);
        }
    }

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
                {exercises.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="py-8 text-center text-gray-500"
                        >
                            No exercises yet.
                        </TableCell>
                    </TableRow>
                ) : (
                    exercises.map((ex, i) => (
                        <TableRow
                            key={ex.id}
                            className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                        >
                            <TableCell className="py-4 text-gray-400">
                                {i + 1}
                            </TableCell>
                            <TableCell className="py-4 font-medium">
                                <Link
                                    href={`/exercises/${ex.id}`}
                                    className="hover:underline"
                                >
                                    {ex.title}
                                </Link>
                            </TableCell>
                            <TableCell className="py-4 text-center">
                                <DifficultyBadge level={ex.difficulty} />
                            </TableCell>
                            <TableCell className="py-4 text-center">
                                <button
                                    onClick={(e) => toggleStatus(e, ex.id)}
                                    className="cursor-pointer"
                                    aria-label={
                                        isSolved(ex.id)
                                            ? "Mark as unsolved"
                                            : "Mark as solved"
                                    }
                                >
                                    <StatusIcon solved={isSolved(ex.id)} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
