import { CodeBlock } from "@javui/ui/server";
import { defineHero, ex, type Example } from "@/docs/example";

const heroCode = `<CodeBlock language="tsx" label="Example" lineNumbers code={'import { Button } from "@javui/ui";\\n\\n<Button>Save</Button>'} />`;
export const hero = defineHero(
  heroCode,
  <CodeBlock
    language="tsx"
    label="Example"
    lineNumbers
    code={'import { Button } from "@javui/ui";\n\n<Button>Save</Button>'}
  />,
);

const scrollCode = `const result = await fetch("https://api.example.com/v1/projects/with-a-deliberately-long-resource-path/that-keeps-scrolling");
const data = await result.json();

export function getProjectName(project: Project) {
  return project.name;
}

const projects = data.projects;
const firstProject = projects[0];
const projectOwner = firstProject.owner;
const projectStatus = firstProject.status;
const projectUpdatedAt = firstProject.updatedAt;`;

export const examples: Example[] = [
  ex(
    "Terminal tabs",
    `<CodeBlock language="bash" label="Install" tabs={[{ label: "bun", code: "bun add --exact @base-ui/react" }, { label: "pnpm", code: "pnpm add --save-exact @base-ui/react" }, { label: "npm", code: "npm install --save-exact @base-ui/react" }]} />`,
    <CodeBlock
      language="bash"
      label="Install"
      tabs={[
        { label: "bun", code: "bun add --exact @base-ui/react" },
        { label: "pnpm", code: "pnpm add --save-exact @base-ui/react" },
        { label: "npm", code: "npm install --save-exact @base-ui/react" },
      ]}
    />,
    "Alternatives share one block; bash shows a terminal icon.",
  ),
  ex(
    "Highlight lines",
    `<CodeBlock language="tsx" lineNumbers highlightLines={[3, 4, 5]} code={'const value = 1;\\nconst next = value + 1;\\nconst label = "Total";\\nreturn <Text>{label}: {next}</Text>;\\nexport default label;'} />`,
    <CodeBlock
      language="tsx"
      lineNumbers
      highlightLines={[3, 4, 5]}
      code={
        'const value = 1;\nconst next = value + 1;\nconst label = "Total";\nreturn <Text>{label}: {next}</Text>;\nexport default label;'
      }
    />,
    "Marks lines by 1-based number.",
  ),
  ex(
    "Scroll",
    `<CodeBlock language="ts" label="Long code" lineNumbers code={scrollCode} />`,
    <CodeBlock language="ts" label="Long code" lineNumbers code={scrollCode} />,
    "Long lines scroll horizontally and the region is focusable.",
  ),
  ex(
    "Diff",
    `<CodeBlock language="diff" label="Changes" code={'+  const next = value + 1;\\n-  const next = value;'} />`,
    <CodeBlock
      language="diff"
      label="Changes"
      code={"+  const next = value + 1;\n-  const next = value;"}
    />,
    "Added and removed lines get a tint.",
  ),
];
