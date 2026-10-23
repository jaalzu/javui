import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sheet } from "./Sheet";
import { Button } from "../Button";
import { Text } from "../Text";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  args: {
    trigger: "Filters",
    title: "Filters",
    description: "Narrow the results.",
    children: <Text>Filter controls would go here.</Text>,
    footer: <Button size="sm">Apply</Button>,
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Left: Story = { args: { side: "left" } };
export const Open: Story = { args: { defaultOpen: true } };
export const Dark: Story = { ...Open, globals: { theme: "dark" } };
export const Light: Story = { ...Open, globals: { theme: "light" } };
