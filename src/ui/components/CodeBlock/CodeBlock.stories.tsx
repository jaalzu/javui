import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeBlock } from "./CodeBlock";
import { StateMatrix } from "../../stories/StateMatrix";
import { CopyIcon } from "../../icons/icons.generated";
import styles from "./CodeBlock.module.css";

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
export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Tab",
          render: (state) => (
            <button
              type="button"
              className={styles.tab}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              data-active={state === "selected" ? "" : undefined}
              data-disabled={state === "disabled" ? "" : undefined}
              disabled={state === "disabled"}
            >
              bun
            </button>
          ),
        },
        {
          label: "Copy",
          render: (state) => (
            <button
              type="button"
              className={styles.copy}
              aria-label="Copy code"
              data-force={state === "rest" || state === "disabled" ? undefined : state}
            >
              <CopyIcon size="sm" />
            </button>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
