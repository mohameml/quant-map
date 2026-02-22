// Next.js automatically shows this file while roadmap/page.tsx is rendering.
// It doubles as a Suspense boundary fallback for the server component.

function SkeletonNode({ style }: { style: React.CSSProperties }) {
    return (
        <div
            className="absolute w-[220px] animate-pulse rounded-lg border-2 border-gray-200 bg-white px-3 py-2 shadow-sm"
            style={style}
        >
            <div className="mb-2 h-3 rounded bg-gray-200" />
            <div className="h-1.5 rounded bg-gray-100" />
        </div>
    );
}

// Approximate positions of dagre TB layout rows for 14 topics
const SKELETON_NODES: React.CSSProperties[] = [
    // row 1
    { top: "7%", left: "35%" },
    { top: "7%", left: "57%" },
    // row 2
    { top: "22%", left: "18%" },
    { top: "22%", left: "41%" },
    { top: "22%", left: "63%" },
    // row 3
    { top: "38%", left: "27%" },
    { top: "38%", left: "50%" },
    { top: "38%", left: "71%" },
    // row 4
    { top: "55%", left: "33%" },
    { top: "55%", left: "56%" },
    // row 5
    { top: "72%", left: "43%" },
];

export default function LoadingRoadmap() {
    return (
        <div
            className="relative h-[calc(100vh-56px)] w-full overflow-hidden bg-white"
            style={{
                backgroundImage:
                    "radial-gradient(circle, #e5e7eb 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
            }}
        >
            {SKELETON_NODES.map((style, i) => (
                <SkeletonNode key={i} style={style} />
            ))}
        </div>
    );
}
