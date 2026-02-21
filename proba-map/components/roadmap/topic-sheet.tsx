"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExerciseTable } from "@/components/exercise-table";
import type { Topic, Exercise } from "@/lib/schema";

export function TopicSheet({
    open,
    onOpenChange,
    topic,
    exercises,
    isSolved,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    topic: Topic | null;
    exercises: Exercise[];
    isSolved: (id: string) => boolean;
}) {
    if (!topic) return null;

    const solvedCount = exercises.filter((ex) => isSolved(ex.id)).length;
    const total = exercises.length;
    const pct = total > 0 ? (solvedCount / total) * 100 : 0;

    // Find first unsolved exercise for "Continue Practice"
    const firstUnsolved = exercises.find((ex) => !isSolved(ex.id));

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="flex w-full flex-col sm:max-w-lg"
            >
                <SheetHeader>
                    <SheetDescription className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Topic Details
                    </SheetDescription>
                    <SheetTitle className="text-lg font-bold">
                        {topic.title}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 space-y-5 overflow-y-auto px-4">
                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">
                                {solvedCount}/{total} Completed
                            </span>
                        </div>
                        <Progress value={pct} className="h-2" />
                    </div>

                    {/* Review Topic button */}
                    <Button
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50"
                        asChild
                    >
                        <Link href={`/patterns/${topic.slug}`}>
                            Review {topic.title}
                        </Link>
                    </Button>

                    {/* Exercise list */}
                    <ExerciseTable exercises={exercises} isSolved={isSolved} />
                </div>

                {/* Continue Practice — pinned to bottom */}
                <SheetFooter className="border-t border-gray-100 px-4 py-4">
                    {firstUnsolved ? (
                        <Button
                            className="w-full bg-green-600 text-base hover:bg-green-700"
                            asChild
                        >
                            <Link href={`/exercises/${firstUnsolved.id}`}>
                                <Play className="mr-2 size-4 fill-current" />
                                Continue Practice
                            </Link>
                        </Button>
                    ) : (
                        <Button
                            className="w-full bg-green-600 text-base hover:bg-green-700"
                            asChild
                        >
                            <Link href={`/patterns/${topic.slug}`}>
                                <Play className="mr-2 size-4 fill-current" />
                                Review Exercises
                            </Link>
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
