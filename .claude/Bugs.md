# UI/UX bugs :

- chnage the yellow to green light may be ???
- first the progress in TopicSheet sholud be green not black ???
- fix the fleche edges it look wrong for some topics
- fix the zoom in the first entring in roadmap page (fit view ) and make the graph in the center

- fix error hydration :

    ```md
    ## Error Type

    Recoverable Error

    ## Error Message

    Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

    - A server/client branch `if (typeof window !== 'undefined')`.
    - Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
    - Date formatting in a user's locale which doesn't match the server.
    - External changing data without sending a snapshot of it along with the HTML.
    - Invalid HTML tag nesting.

    It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

    https://react.dev/link/hydration-mismatch

    ...
    <GraphView onInit={undefined} onNodeClick={function GraphInner.useCallback[onNodeClick]} onEdgeClick={undefined} ...>
    <FlowRenderer onPaneClick={undefined} onPaneMouseEnter={undefined} onPaneMouseMove={undefined} ...>
    <ZoomPane onPaneContextMenu={undefined} elementsSelectable={undefined} zoomOnScroll={true} zoomOnPinch={true} ...>

    <div className="react-flow..." ref={{current:null}} style={{position:"...", ...}}>
    <Pane onSelectionStart={undefined} onSelectionEnd={undefined} onPaneClick={undefined} ...>
    <div className="react-flow..." onClick={function} onContextMenu={function} onWheel={function} ...>
    <Viewport>
    <div className="react-flow..." style={{...}}>
    <EdgeRenderer>
    <ConnectionLineWrapper>
    <div>
    <NodeRenderer nodeTypes={{...}} onNodeClick={function GraphInner.useCallback[onNodeClick]} ...>
    <div className="react-flow..." style={{position:"...", ...}}>
    <NodeWrapper id="combinatorics" nodeTypes={{...}} nodeExtent={undefined} ...>
    <div className="react-flow..." ref={{current:null}} style={{zIndex:0, ...}} ...>
    <TopicNode id="combinatorics" data={{label:"Com...", ...}} type="topicNode" ...>
    <HandleComponent>
    <div

    -                               className="flex w-55 cursor-pointer flex-col gap-1 rounded-lg border-2 bg-white px-3 p..."

    *                               className="flex w-55 cursor-pointer flex-col gap-1 rounded-lg border-2 bg-white px-3 p..."
                                >
                                    <span>
                                    <div className="flex items...">
                                    ...
                                        <ProgressProvider scope={undefined} value={null} max={100}>
                                        <Primitive.div aria-valuemax={100} aria-valuemin={0} aria-valuenow={undefined} ...>
                                            <div
                                            aria-valuemax={100}
                                            aria-valuemin={0}
                                            aria-valuenow={undefined}
                                            aria-valuetext={undefined}
                                            role="progressbar"
                                            data-state="indeterminate"
                                            data-value={undefined}
                                            data-max={100}
                                            data-slot="progress"

    -                                         className={"bg-primary/20 relative w-full overflow-hidden rounded-full h-1 ..."}

    *                                         className={"bg-primary/20 relative w-full overflow-hidden rounded-full h-1 ..."}
                                            ref={null}
                                            >
                                            <ProgressIndicator data-slot="progress-i..." className="bg-primary..." ...>
                                                <Primitive.div data-state="indeterminate" data-value={undefined} ...>
                                                <div
                                                    data-state="indeterminate"
                                                    data-value={undefined}
                                                    data-max={100}
                                                    data-slot="progress-indicator"
                                                    className="bg-primary h-full w-full flex-1 transition-all"
                                                    style={{

    -                                                 transform: "translateX(-33.33333333333334%)"

    *                                                 transform: "translateX(-100%)"
                                                    }}
                                                    ref={null}
                                                >
                                    <span className="text-[11px...">

    -                                   2

    *                                   0
                                        ...
                                ...
                            ...
                        ...
                    ...

        at span (<anonymous>:null:null)
        at TopicNode (components/roadmap/topic-node.tsx:68:21)
        at GraphInner (components/roadmap/roadmap-graph.tsx:76:13)
        at RoadmapGraph (components/roadmap/roadmap-graph.tsx:127:13)
        at RoadmapPage (app/roadmap/page.tsx:12:13)

    ## Code Frame

    66 | )}
    67 | />

    > 68 | <span className="text-[11px] text-gray-500">

        |                     ^

    69 | {solvedCount}/{exerciseCount}
    70 | </span>
    71 | </div>

    Next.js version: 16.1.6 (Turbopack)
    ```

- remove the React Flow in the bottom
- fix : if there is no exercices we do not show header of the table
- fix when hover in the "Review topic" it look odd ?? :
    - pb : when hover in it the text look black ????

- fix the hard coded color that is in any palce :
    - topic-sheet
    - topic-node
      ... etc

- fix the branding color :
    - whihc variant of green ????

- fix the progress when it zero
