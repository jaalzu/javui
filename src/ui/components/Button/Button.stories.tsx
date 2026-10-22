import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, type ButtonVariant } from "./Button";
import { Stack } from "../Stack";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap="3" wrap>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="danger">Danger</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
};

export const Loading: Story = { args: { loading: true, children: "Saving" } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" gap="3" wrap align="center">
      <Button variant="secondary" startIcon={<CheckIcon />}>Done</Button>
      <Button variant="secondary" endIcon={<ArrowRightIcon />}>Continue</Button>
      <Button variant="secondary" startIcon={<PlusIcon />} endIcon={<ArrowRightIcon />}>New</Button>
      <Button variant="ghost" size="sm" aria-label="New" startIcon={<PlusIcon />} />
      <Button loading startIcon={<CheckIcon />}>Saving</Button>
    </Stack>
  ),
};

const variants: { label: string; variant: ButtonVariant }[] = [
  { label: "Primary", variant: "primary" },
  { label: "Secondary", variant: "secondary" },
  { label: "Ghost", variant: "ghost" },
  { label: "Accent", variant: "accent" },
  { label: "Danger", variant: "danger" },
];

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={variants.map(({ label, variant }) => ({
        label,
        render: (state) => (
          <Button variant={variant} {...forceProps(state)}>
            {label}
          </Button>
        ),
      }))}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Stack direction="row" gap="3" wrap align="center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="ghost">Ghost</Button>
      </Stack>
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
