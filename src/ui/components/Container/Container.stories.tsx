import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "./Container";
import { Box } from "../Box";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    size: "md",
    children: (
      <Box padding="6" surface bordered radius="lg">
        <Text>Centered content with a maximum width.</Text>
      </Box>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Dark: Story = { globals: { theme: "dark" } };
