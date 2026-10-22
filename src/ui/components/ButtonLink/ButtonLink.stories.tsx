import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonLink } from "./ButtonLink";
import { Stack } from "../Stack";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import { ArrowRightIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", children: "Get started" },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithIcon: Story = {
  args: { endIcon: <ArrowRightIcon /> },
};
export const IconOnly: Story = {
  render: () => (
    <ButtonLink href="#" aria-label="Next page" startIcon={<ArrowRightIcon />} />
  ),
};
export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap="3" wrap>
      <ButtonLink href="#">Primary</ButtonLink>
      <ButtonLink href="#" variant="secondary">Secondary</ButtonLink>
      <ButtonLink href="#" variant="ghost">Ghost</ButtonLink>
      <ButtonLink href="#" variant="accent">Accent</ButtonLink>
    </Stack>
  ),
};
export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Stack direction="row" gap="3" wrap align="center">
        <ButtonLink href="#" size="sm">Small</ButtonLink>
        <ButtonLink href="#" size="md">Medium</ButtonLink>
        <ButtonLink href="#" size="lg">Large</ButtonLink>
        <ButtonLink href="#" size="sm" variant="secondary">Secondary</ButtonLink>
      </Stack>
    </div>
  ),
};

const variants = ["primary", "secondary", "ghost", "accent", "danger"] as const;

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={variants.map((variant) => ({
        label: variant,
        render: (state) => {
          const { disabled, ...rest } = forceProps(state);
          return (
            <ButtonLink
              href="#"
              variant={variant}
              data-disabled={disabled ? "" : undefined}
              aria-disabled={disabled || undefined}
              {...rest}
            >
              {variant}
            </ButtonLink>
          );
        },
      }))}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
