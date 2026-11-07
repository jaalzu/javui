import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "../Card";
import { Text } from "../Text";
import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { size: "md", gutter: "4", children: <Card variant="surface"><Text>Constrained content</Text></Card> },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Responsive: Story = { args: { size: { base: "sm", md: "lg" }, gutter: { base: "4", md: "8" } } };
export const Dark: Story = { globals: { theme: "dark" } };
