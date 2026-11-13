import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeBlockView } from "./CodeBlockView";
import { codeFixtures } from "./CodeBlock.fixtures";
import { Stack } from "../Stack";
import { StateMatrix } from "../../stories/StateMatrix";
import { CopyIcon } from "../../icons/icons.generated";
import styles from "./CodeBlock.module.css";

const meta = {
  title: "Content/CodeBlock",
  component: CodeBlockView,
  tags: ["autodocs"],
  args: {
    language: "tsx",
    label: "Example",
    code: codeFixtures.tsx.code,
    html: codeFixtures.tsx.html,
  },
} satisfies Meta<typeof CodeBlockView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighlightedLines: Story = {
  args: { highlightLines: [2, 3] },
};

export const TypeScript: Story = {
  args: { ...codeFixtures.ts, language: "ts", label: "TypeScript" },
};

export const Css: Story = {
  args: { ...codeFixtures.css, language: "css", label: "CSS" },
};

export const Bash: Story = {
  args: { ...codeFixtures.bash, language: "bash", label: "Bash" },
};

export const Json: Story = {
  args: { ...codeFixtures.json, language: "json", label: "JSON" },
};

export const Diff: Story = {
  args: { ...codeFixtures.diff, language: "diff", label: "Diff" },
};

export const Install: Story = {
  args: {
    language: "bash",
    label: "Install",
    code: undefined,
    html: undefined,
    tabs: [
      { label: "bun", code: "bun add @base-ui/react" },
      { label: "pnpm", code: "pnpm add @base-ui/react" },
      { label: "npm", code: "npm install @base-ui/react" },
    ],
    tabHtml: {
      bun: codeFixtures.bash.html,
      pnpm: codeFixtures.bash.html,
      npm: codeFixtures.bash.html,
    },
  },
};

const gallery = ["ts", "tsx", "css", "bash", "json", "diff"] as const;

function Gallery() {
  return (
    <Stack gap="6">
      {gallery.map((language) => (
        <CodeBlockView
          key={language}
          language={language}
          label={language}
          code={codeFixtures[language].code}
          html={codeFixtures[language].html}
        />
      ))}
    </Stack>
  );
}

export const Light: Story = {
  render: () => <Gallery />,
  globals: { theme: "light" },
};

export const Dark: Story = {
  render: () => <Gallery />,
  globals: { theme: "dark" },
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
