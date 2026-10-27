import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";
import { Stack } from "../Stack";
import { CheckIcon } from "../../icons/icons.generated";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Ada Lovelace" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" size="md" />
      <Avatar name="Alan Turing" size="lg" />
    </Stack>
  ),
};
export const Status: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" status="online" size="sm" />
      <Avatar name="Grace Hopper" status="away" />
      <Avatar name="Alan Turing" status="busy" size="lg" />
      <Avatar name="Katherine Johnson" status="offline" />
    </Stack>
  ),
};
export const AvatarBadge: Story = {
  name: "Avatar badge",
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" size="sm" />
      <Avatar name="Grace Hopper" badge={<CheckIcon />} badgeLabel="Verified" />
      <Avatar name="Alan Turing" badge={<CheckIcon />} badgeLabel="Verified" size="lg" />
    </Stack>
  ),
};
export const Dark: Story = { ...Sizes, globals: { theme: "dark" } };
export const Light: Story = { ...Sizes, globals: { theme: "light" } };
