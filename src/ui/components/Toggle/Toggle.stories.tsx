import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "../Stack";
import { Toggle } from "./Toggle";
import { ChartBarIcon, ListIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { children: "Toggle" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" gap="3">
      <Toggle startIcon={<ListIcon />}>List</Toggle>
      <Toggle startIcon={<ChartBarIcon />}>Board</Toggle>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center" wrap>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Toggle key={size} size={size}>{size.toUpperCase()}</Toggle>
      ))}
    </Stack>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <Stack direction="row" gap="3">
      <Toggle aria-label="List view" startIcon={<ListIcon />} />
      <Toggle aria-label="Board view" startIcon={<ChartBarIcon />} />
    </Stack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
export const Dark: Story = { ...Outline, globals: { theme: "dark" } };
export const Light: Story = { ...Outline, globals: { theme: "light" } };
