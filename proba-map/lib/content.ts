import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
    TOPIC_SLUGS,
    TopicFrontmatterSchema,
    ExerciseFrontmatterSchema,
    type Topic,
    type Exercise,
    type TopicSlug,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TOPICS_DIR = path.join(CONTENT_DIR, "topics");
const EXERCISES_DIR = path.join(CONTENT_DIR, "exercises");

// ─── Topics ──────────────────────────────────────────────────────────────────

export function getAllTopics(): Topic[] {
    const files = fs.readdirSync(TOPICS_DIR).filter((f) => f.endsWith(".mdx"));

    return files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const raw = fs.readFileSync(path.join(TOPICS_DIR, file), "utf8");
            const { data, content } = matter(raw);

            const frontmatter = TopicFrontmatterSchema.parse(data);

            return { ...frontmatter, slug, body: content };
        })
        .sort((a, b) => a.order - b.order);
}

// ─── Exercises ────────────────────────────────────────────────────────────────

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 } as const;

export function getAllExercises(): Exercise[] {
    const patternDirs = fs
        .readdirSync(EXERCISES_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

    const exercises: Exercise[] = [];

    for (const patternDir of patternDirs) {
        // Validate that the directory name is a known TopicSlug
        if (!(TOPIC_SLUGS as readonly string[]).includes(patternDir)) {
            throw new Error(
                `exercises/${patternDir} is not a valid topic slug. ` +
                    `Expected one of: ${TOPIC_SLUGS.join(", ")}`,
            );
        }

        const primaryPattern = patternDir as TopicSlug;
        const dirPath = path.join(EXERCISES_DIR, patternDir);
        const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));

        for (const file of files) {
            const slug = file.replace(/\.mdx$/, "");
            const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
            const { data, content } = matter(raw);

            const frontmatter = ExerciseFrontmatterSchema.parse(data);

            exercises.push({
                ...frontmatter,
                slug,
                primaryPattern,
                body: content,
            });
        }
    }

    return exercises.sort(
        (a, b) =>
            DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
    );
}

// ─── In-memory index (built once per process) ─────────────────────────────────

let _index: Map<string, Exercise> | null = null;
let _byPattern: Map<TopicSlug, Exercise[]> | null = null;

function buildIndex(): void {
    const all = getAllExercises();
    _index = new Map(all.map((ex) => [ex.id, ex]));

    _byPattern = new Map();
    for (const slug of TOPIC_SLUGS) {
        _byPattern.set(slug, []);
    }
    for (const ex of all) {
        for (const pattern of ex.patterns) {
            _byPattern.get(pattern)!.push(ex);
        }
    }
}

function ensureIndex(): void {
    if (!_index || !_byPattern) buildIndex();
}

export function getExerciseBySlug(slug: string): Exercise | null {
    ensureIndex();
    return _index!.get(slug) ?? null;
}

export function getExercisesByPattern(patternSlug: TopicSlug): Exercise[] {
    ensureIndex();
    return _byPattern!.get(patternSlug) ?? [];
}

/**
 * Returns all exercises grouped by topic slug.
 * Reads files only once — use this in page components instead of
 * calling getExercisesByPattern() in a loop.
 */
export function getExercisesByTopic(): Record<TopicSlug, Exercise[]> {
    ensureIndex();
    return Object.fromEntries(_byPattern!) as Record<TopicSlug, Exercise[]>;
}
