import { CodeBlockView } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<CodeBlock
  language="tsx"
  label="Example"
  code={'import { Button } from "@/ui";\\n\\n<Button>Save</Button>'}
/>`,
  <CodeBlockView
    language="tsx"
    label="Example"
    code={'import { Button } from "@/ui";\n\n<Button>Save</Button>'}
  />,
);

export const examples: Example[] = [];
