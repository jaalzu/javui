import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Menu } from "./Menu";

const items = [
  { label: "Profile", href: "#profile" },
  { label: "Settings", href: "#settings" },
  { type: "separator" as const },
  { label: "Rename", onSelect: () => {} },
  { label: "Delete", onSelect: () => {}, destructive: true },
];

const meta = {
  title: "Overlays/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Account", items },
  decorators: [(Story) => <div style={{ minHeight: "16rem" }}><Story /></div>],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
