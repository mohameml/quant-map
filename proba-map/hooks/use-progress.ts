"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "probacode-progress";

type ProgressStats = {
    solved: number;
    total: number;
    ratio: number;
};

function loadSolved(): Set<string> {
    if (typeof window === "undefined") return new Set();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return new Set();
        return new Set(JSON.parse(raw) as string[]);
    } catch {
        return new Set();
    }
}

function saveSolved(solved: Set<string>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
    } catch {
        // ignore quota / private mode errors
    }
}

export function useProgress() {
    const [solved, setSolved] = useState<Set<string>>(() => loadSolved());

    useEffect(() => {
        saveSolved(solved);
    }, [solved]);

    // keep multiple tabs in sync
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) setSolved(loadSolved());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const markSolved = useCallback((id: string) => {
        setSolved((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    }, []);

    const unmarkSolved = useCallback((id: string) => {
        setSolved((prev) => {
            if (!prev.has(id)) return prev;
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, []);

    const isSolved = useCallback((id: string) => solved.has(id), [solved]);

    const getProgress = useCallback(
        (exerciseIds: string[]): ProgressStats => {
            const total = exerciseIds.length;

            if (total === 0) {
                return { solved: 0, total: 0, ratio: 0 };
            }

            let done = 0;
            for (const id of exerciseIds) {
                if (solved.has(id)) done++;
            }

            return {
                solved: done,
                total,
                ratio: done / total,
            };
        },
        [solved],
    );
    return { solved, markSolved, unmarkSolved, isSolved, getProgress };
}
