import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "../Text";
import { Box } from "./Box";

const meta = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: <Text>Content region</Text>, surface: "card" },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Sunken: Story = { args: { surface: "sunken" } };
export const Dark: Story = { globals: { theme: "dark" } };
