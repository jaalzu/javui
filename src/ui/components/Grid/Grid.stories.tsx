import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "./Grid";
import { Card } from "../Card";
import { Text } from "../Text";

const cells = Array.from({ length: 6 }, (_, i) => (
  <Card key={i} size="sm" variant="surface">
    <Text>Cell {i + 1}</Text>
  </Card>
));

const meta = {
  title: "Atoms/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { columns: 3, gap: "4", children: cells },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {};
export const AutoFit: Story = { args: { minColumnWidth: "16rem" } };
export const Responsive: Story = {
  args: { columns: { base: 1, md: 2, lg: 4 }, gap: { base: "3", md: "6" } },
};
export const UnequalColumns: Story = { args: { columns: "2fr 1fr" } };
export const Dark: Story = { globals: { theme: "dark" } };
