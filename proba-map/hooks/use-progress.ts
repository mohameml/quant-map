"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "probacode-progress"

function loadSolved(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function saveSolved(solved: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]))
}

export function useProgress() {
  const [solved, setSolved] = useState<Set<string>>(new Set)

  // Hydrate from localStorage after mount
  useEffect(() => {
    setSolved(loadSolved())
  }, [])

  const markSolved = useCallback((id: string) => {
    setSolved((prev) => {
      const next = new Set(prev)
      next.add(id)
      saveSolved(next)
      return next
    })
  }, [])

  const unmarkSolved = useCallback((id: string) => {
    setSolved((prev) => {
      const next = new Set(prev)
      next.delete(id)
      saveSolved(next)
      return next
    })
  }, [])

  const isSolved = useCallback(
    (id: string) => solved.has(id),
    [solved]
  )

  const getProgress = useCallback(
    (exerciseIds: string[]) => {
      const total = exerciseIds.length
      const done = exerciseIds.filter((id) => solved.has(id)).length
      return { solved: done, total }
    },
    [solved]
  )

  return { markSolved, unmarkSolved, isSolved, getProgress }
}
