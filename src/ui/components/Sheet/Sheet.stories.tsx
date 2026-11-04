import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sheet } from "./Sheet";
import { Button } from "../Button";
import { Text } from "../Text";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    trigger: "Filters",
    closeLabel: "Close filters",
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
export const Top: Story = { args: { side: "top" } };
export const Bottom: Story = { args: { side: "bottom" } };
export const Right: Story = { args: { side: "right" } };
export const WithoutCloseButton: Story = { args: { showCloseButton: false } };
export const LongBody: Story = {
  args: {
    children: <Text>{Array.from({ length: 20 }, (_, index) => `${index + 1}. Long sheet content. `)}</Text>,
  },
};
export const Open: Story = { args: { defaultOpen: true } };
export const Dark: Story = { ...Open, globals: { theme: "dark" } };
export const Light: Story = { ...Open, globals: { theme: "light" } };
