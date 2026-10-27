import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";
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

const sizes: ButtonSize[] = ["xs", "sm", "md", "lg"];

function AllSizes() {
  return (
    <Stack gap="4" align="start">
      {sizes.map((size) => (
        <Stack key={size} direction="row" gap="3" align="center" wrap>
          <Button size={size}>{size.toUpperCase()}</Button>
          <Button size={size} variant="secondary" startIcon={<PlusIcon />}>
            {size.toUpperCase()}
          </Button>
          <Button size={size} aria-label={`Add ${size}`} startIcon={<PlusIcon />} />
          <Button size={size} pill aria-label={`Pill ${size}`} startIcon={<PlusIcon />} />
        </Stack>
      ))}
    </Stack>
  );
}

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
  render: () => <AllSizes />,
};

export const Pill: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center" wrap>
      <Button pill>Save</Button>
      <Button pill size="sm" aria-label="Add" startIcon={<PlusIcon />} />
      <Button pill variant="secondary" size="xs">
        Filter
      </Button>
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

export const IconSizes: Story = {
  name: "Icon sizes",
  render: () => (
    <Stack gap="3" align="start">
      {sizes.map((size) => (
        <Stack key={size} direction="row" gap="3" align="center">
          <Button size={size} startIcon={<PlusIcon />}>New</Button>
          <Button size={size} endIcon={<ArrowRightIcon />}>Next</Button>
          <Button size={size} aria-label={`New ${size}`} startIcon={<PlusIcon />} />
        </Stack>
      ))}
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
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xs" variant="secondary">Secondary</Button>
        <Button size="xs" variant="ghost">Ghost</Button>
      </Stack>
    </div>
  ),
};

export const Dark: Story = { render: () => <AllSizes />, globals: { theme: "dark" } };
export const Light: Story = { render: () => <AllSizes />, globals: { theme: "light" } };
