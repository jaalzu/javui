import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "./Divider";
import { Stack } from "../Stack";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <Stack gap="3">
      <Text>Above</Text>
      <Divider {...args} />
      <Text>Below</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Stack direction="row" gap="3" align="stretch">
      <Text>Left</Text>
      <Divider {...args} />
      <Text>Right</Text>
    </Stack>
  ),
};

export const Dark: Story = { ...Horizontal, globals: { theme: "dark" } };
