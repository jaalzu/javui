import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";
import { Stack } from "../Stack";
import { Text } from "../Text";

const check = <path d="M5 12l5 5L20 7" />;

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: check },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {
  render: (args) => (
    <Text>
      <Icon {...args} /> Saved
    </Text>
  ),
};

export const Labelled: Story = { args: { label: "Success" } };

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="4" align="center">
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
    </Stack>
  ),
};

export const Dark: Story = { ...Sizes, globals: { theme: "dark" } };
