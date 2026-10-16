import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "./Box";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { padding: "6", surface: true, bordered: true, radius: "lg", children: <Text>Content inside a box</Text> },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AsSection: Story = { args: { as: "section", "aria-label": "Details" } };
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
