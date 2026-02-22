"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useProgress } from "@/hooks/use-progress";

type ProgressContextValue = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
    const progress = useProgress();
    return (
        <ProgressContext.Provider value={progress}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgressContext(): ProgressContextValue {
    const ctx = useContext(ProgressContext);
    if (!ctx) {
        throw new Error("useProgressContext must be used inside <ProgressProvider>");
    }
    return ctx;
}
