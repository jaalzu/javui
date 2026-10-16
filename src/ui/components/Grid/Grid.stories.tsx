import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "./Grid";
import { Box } from "../Box";
import { Text } from "../Text";

const cells = Array.from({ length: 6 }, (_, i) => (
  <Box key={i} padding="4" surface bordered radius="md">
    <Text>Cell {i + 1}</Text>
  </Box>
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
export const Responsive: Story = { args: { columns: "repeat(auto-fit, minmax(10rem, 1fr))" } };
export const Dark: Story = { globals: { theme: "dark" } };
