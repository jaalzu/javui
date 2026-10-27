import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { CheckIcon } from "../../icons/icons.generated";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CheckIcon />,
};

export const Decorative: Story = {
  render: () => (
    <Text>
      <CheckIcon /> Saved
    </Text>
  ),
};

export const Labelled: Story = {
  render: () => <CheckIcon label="Success" />,
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <CheckIcon size="xs" />
      <CheckIcon size="sm" />
      <CheckIcon size="md" />
      <CheckIcon size="lg" />
      <CheckIcon size="xl" />
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <CheckIcon />
      <CheckIcon weight="fill" />
    </Stack>
  ),
};

export const Dark: Story = { ...Sizes, globals: { theme: "dark" } };
