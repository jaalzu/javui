import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Content/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  args: {
    language: "tsx",
    label: "Example",
    code: `import { Button } from "@/ui";\n\nexport default function Page() {\n  return <Button>Save</Button>;\n}`,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Install: Story = {
  args: {
    language: "bash",
    label: "Install",
    code: undefined,
    tabs: [
      { label: "bun", code: "bun add @base-ui/react" },
      { label: "pnpm", code: "pnpm add @base-ui/react" },
      { label: "npm", code: "npm install @base-ui/react" },
    ],
  },
};
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
