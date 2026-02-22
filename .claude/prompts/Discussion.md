- and the edges i want to be like this see image in assets/inspiration/edge.png :
  ok i like what have done but therse is a little bit probleme in the arrow some times it look like wrong we can see what i mean
  in the img : wrong-edge.png

- the colors of desing (gray/yellow/green) are hard coded we should add a varibales of this becuase we maybe change our bradbnibng color of new desing

- if the exercice is solve the statsu i want a **clirce inside it a check**

- in the exerice-type the name of dir of exerice is must be a **TopicSlug** or what you think :
  so what you think if we make `primaryPattern : TopicSlug`

```ts
export type Exercise = ExerciseFrontmatter & {
	slug: string; // = id (filename stem)
	primaryPattern: string; // = parent directory name
	body: string; // raw MDX content
};
```

- pb in id of exerice can we make a exercice-slug in build time what you think of this idea :
  Buildtime slug (généré)

    Tu fais un script qui scanne content/exercises/\*.mdx et génère un fichier TypeScript :

    generated/exercise-slugs.ts qui exporte :

    export const EXERCISE_SLUGS = [...] as const

    export type ExerciseSlug = (typeof EXERCISE_SLUGS)[number]

- and for the \_index map can we make it generated i'm not sure for this so can you give the pros and cors and your suggestion :

```json
{
	"exo-001": { "id": "exo-001", "title": "...", "patterns": "arrays" },
	"exo-002": { "id": "exo-002", "title": "...", "patterns": "arrays" }
}
```

- scripts/build-content-index.ts
- rolling deploy to update the \_index for exerices :
  commit nouveau .mdx

    ton CI/CD rebuild

    redeploy (nouvelle version)

    la plateforme remplace l’ancienne

- ce qoui CMS

- est ce que on besion de getTopicBySlug ???

- est ce que j'ai ce comporentemt :
  dans page roadmap (pour mon projet meetproba) à chaque request j'ai appelle getAllTopics donc je lire files , parse with matter validation with zod i think this is a lot pouqoui pas l'instancer une seulle fois apres on peut l'appler une seull fois : export default function RoadmapPage() {
  const topics = getAllTopics();
  const { nodes, edges } = buildGraph(topics);

- dans buildGraph il faut :
    - Éviter les magic numbers (110, 30) il faut utiliser const NODE_W = 220;const NODE_H = 60;
    - Séparer “data layer” et “UI layer” : garder buildGraph pure “structure/layout” , avoir une config UI ailleurs (thème, styles)
      sur tout pour la dark mode
    - exerciseCount: 0, // filled by the page component ??? : pourouqi pas le rempli direct ici ??

- for the Table component i want to update this :
    - when user click in the statsu : thee status toggled (on solved <-> solved) and when click in other TableRow he should
      navigato to exercicse
    - add acccesibilty : add Link to click
          <Link className="hover:underline" href={`/exercises/${ex.id}`}>
          {ex.title}
          </Link>
    - add the case if exercices.lengt equals 0 :

    ```jsx
    {exercises.length === 0 ? (
      <TableRow>
        <TableCell colSpan={4} className="py-8 text-center text-gray-500">
          No exercises yet.
        </TableCell>
      </TableRow>
    ) : (
      exercises.map(...)
    )}

    ```

- and we prop drilling : we pass isSolved -> topic-sheet -> exercieTbale ..etc we shoudl use context (ProgressProvider) provider to solve that :
  and useProgress directly in the ExericesTable

- wehn we fetch the graph first secondes there no graph (beacuse we compute the edges ..etc) so we shoudl add loading ??

- il faut utiliser Progress du shadcn ui donc il faut corriger ceci dans topic-node et topic sheet :
  add new component Progress (si pas encore commancer add a block effect (like when can not clikc that color of effect i don't konw the name exactly : Disabled state : Inactive / Disabled state
  Element looks:

    greyed out

    faded

    low opacity

    Gives a “not started yet” feeling
    ))

- dans topic-sheet we pass exercices and topic but with topic we can filter the exercices so i think we should just pass the topic :
  and yes isSolved shoudl be removed from the props and use the context useProgress

```tsx
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
});
```

- and for this copute in `topic-sheet.tsx` i tink we can use also getProgress in useProgress context , waht you think ? :

    ```tsx
    const solvedCount = exercises.filter((ex) => isSolved(ex.id)).length;
    const total = exercises.length;
    const pct = total > 0 ? (solvedCount / total) * 100 : 0;
    ```

- and for the component `RoadmapGraph` it look complex for me do you have a purposition to simplify it :
    - i'm not sure for what is enrichiNodes ???
    - and is it a good idea to make the same a \_index_topic_exercices like the \_idex ??? so we donot need to exercisesByTopic ??
    - and why "init" initialNodes: Node<TopicNodeData>[];
      initialEdges: Edge[]; because i think the contenu is fix may not the corrdontes but the data .mdx is fixe ??
    - and we use `TopicNode` for what ??? and can we organize more profossienlle ?

- should we add tests for lib ??
