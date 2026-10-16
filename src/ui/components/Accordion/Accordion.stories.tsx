import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Accordion } from "./Accordion";

const items = [
  { value: "a", title: "Is it accessible?", content: <p>Yes. Behavior comes from Base UI and every component is tested with axe.</p> },
  { value: "b", title: "Is it themeable?", content: <p>Light and dark come from semantic tokens.</p> },
  { value: "c", title: "Can agents use it?", content: <p>There is a manifest, llms.txt and an MCP server.</p> },
];

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, defaultValue: ["a", "b"] } };
export const Dark: Story = { globals: { theme: "dark" }, args: { defaultValue: ["a"] } };
export const Light: Story = { globals: { theme: "light" }, args: { defaultValue: ["a"] } };
