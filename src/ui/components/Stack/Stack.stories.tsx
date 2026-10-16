import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "./Stack";
import { Box } from "../Box";
import { Text } from "../Text";

const items = ["One", "Two", "Three"].map((t) => (
  <Box key={t} padding="3" surface bordered radius="md">
    <Text>{t}</Text>
  </Box>
));

const meta = {
  title: "Atoms/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { gap: "3", children: items },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {};
export const Row: Story = { args: { direction: "row", align: "center" } };
export const AsList: Story = {
  args: {
    as: "ul",
    children: ["One", "Two", "Three"].map((t) => (
      <li key={t}>
        <Text>{t}</Text>
      </li>
    )),
  },
};
export const Dark: Story = { globals: { theme: "dark" } };
