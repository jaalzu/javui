import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonLink } from "./ButtonLink";
import { Stack } from "../Stack";

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
export const Dark: Story = { ...Variants, globals: { theme: "dark" } };
export const Light: Story = { ...Variants, globals: { theme: "light" } };
