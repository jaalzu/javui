import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";
import { Stack } from "../Stack";
import { ArrowRightIcon, CheckIcon } from "../../icons/icons.generated";
import { Link } from "../Link";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap align="center">
      <Badge>Default</Badge>
      <Badge variant="inverted">Inverted</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap align="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </Stack>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap align="center">
      <Badge shape="pill">Pill</Badge>
      <Badge shape="rounded">Rounded</Badge>
      <Badge variant="outline" shape="rounded">Outline</Badge>
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap align="center">
      <Badge variant="success" startIcon={<CheckIcon />}>
        Verified
      </Badge>
      <Badge variant="brand" endIcon={<ArrowRightIcon />}>
        Beta
      </Badge>
    </Stack>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap align="center">
      <Badge>Syncing</Badge>
      <Badge variant="inverted">Syncing</Badge>
      <Badge variant="brand" loading>Saving</Badge>
      <Badge variant="outline" spinnerPosition="end" loading>Pending</Badge>
    </Stack>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Badge variant="outline" render={<Link href="/docs" />}>Docs</Badge>
  ),
};

export const Dark: Story = { ...Variants, globals: { theme: "dark" } };
export const Light: Story = { ...Variants, globals: { theme: "light" } };
