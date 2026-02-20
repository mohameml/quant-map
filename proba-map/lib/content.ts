import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {
  TopicFrontmatterSchema,
  ExerciseFrontmatterSchema,
  type Topic,
  type Exercise,
  type TopicSlug,
} from "./schema"

const CONTENT_DIR = path.join(process.cwd(), "content")
const TOPICS_DIR = path.join(CONTENT_DIR, "topics")
const EXERCISES_DIR = path.join(CONTENT_DIR, "exercises")

// ─── Topics ──────────────────────────────────────────────────────────────────

export function getAllTopics(): Topic[] {
  const files = fs.readdirSync(TOPICS_DIR).filter((f) => f.endsWith(".mdx"))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(TOPICS_DIR, file), "utf8")
      const { data, content } = matter(raw)

      const frontmatter = TopicFrontmatterSchema.parse(data)

      return { ...frontmatter, slug, body: content }
    })
    .sort((a, b) => a.order - b.order)
}

// ─── Exercises ────────────────────────────────────────────────────────────────

export function getAllExercises(): Exercise[] {
  const patternDirs = fs
    .readdirSync(EXERCISES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const exercises: Exercise[] = []

  for (const patternDir of patternDirs) {
    const dirPath = path.join(EXERCISES_DIR, patternDir)
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(dirPath, file), "utf8")
      const { data, content } = matter(raw)

      const frontmatter = ExerciseFrontmatterSchema.parse(data)

      exercises.push({
        ...frontmatter,
        slug,
        primaryPattern: patternDir,
        body: content,
      })
    }
  }

  // Sort by difficulty within each call site (Easy → Medium → Hard)
  const ORDER = { Easy: 0, Medium: 1, Hard: 2 } as const
  return exercises.sort((a, b) => ORDER[a.difficulty] - ORDER[b.difficulty])
}

// ─── In-memory index (built once per process) ─────────────────────────────────

let _index: Map<string, Exercise> | null = null

function getExerciseIndex(): Map<string, Exercise> {
  if (_index) return _index
  const all = getAllExercises()
  _index = new Map(all.map((ex) => [ex.id, ex]))
  return _index
}

export function getExerciseBySlug(slug: string): Exercise | null {
  return getExerciseIndex().get(slug) ?? null
}

export function getExercisesByPattern(patternSlug: TopicSlug): Exercise[] {
  return getAllExercises().filter((ex) => ex.patterns.includes(patternSlug))
}
