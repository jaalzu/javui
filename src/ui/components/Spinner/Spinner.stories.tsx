import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./Spinner";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Stack } from "../Stack";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "color" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Spinner size="xs" label="" />
      <Spinner size="sm" label="" />
      <Spinner size="md" label="" />
      <Spinner size="lg" label="" />
      <Spinner size="xl" label="" />
    </Stack>
  ),
};

export const OnText: Story = {
  render: () => (
    <Text>
      Saving changes <Spinner size="md" label="Saving changes" />
    </Text>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(55% 0.2 300) 75%, var(--color-primary-foreground))"
      />
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(60% 0.22 350) 75%, var(--color-primary-foreground))"
      />
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(65% 0.18 55) 75%, var(--color-primary-foreground))"
      />
    </Stack>
  ),
};

export const InButton: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Button loading>Saving</Button>
      <Button variant="secondary" loading>
        Publishing
      </Button>
    </Stack>
  ),
};

export const InBadge: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Badge loading>Pending</Badge>
      <Badge variant="brand" loading>
        Syncing
      </Badge>
    </Stack>
  ),
};

export const Dark: Story = { globals: { theme: "dark" } };
