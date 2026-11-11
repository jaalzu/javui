import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "../Stack";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { ChartBarIcon, GearIcon, ListIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  args: {
    "aria-label": "View",
    defaultValue: ["list"],
    children: (
      <>
        <ToggleGroupItem value="list" startIcon={<ListIcon />}>List</ToggleGroupItem>
        <ToggleGroupItem value="board" startIcon={<ChartBarIcon />}>Board</ToggleGroupItem>
      </>
    ),
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center" wrap>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <ToggleGroup key={size} size={size} aria-label={`${size} view`} defaultValue={["list"]}>
          <ToggleGroupItem value="list">{size.toUpperCase()}</ToggleGroupItem>
          <ToggleGroupItem value="board">Board</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stack direction="row" gap="6" align="center" wrap>
      <ToggleGroup aria-label="Connected formatting" spacing="none">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Spaced formatting" spacing="md">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup aria-label="View" orientation="vertical" defaultValue={["list"]}>
      <ToggleGroupItem value="list" startIcon={<ListIcon />}>List</ToggleGroupItem>
      <ToggleGroupItem value="board" startIcon={<ChartBarIcon />}>Board</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ToggleGroup aria-label="View" defaultValue={["list"]}>
      <ToggleGroupItem value="list" startIcon={<ListIcon />} aria-label="List view" />
      <ToggleGroupItem value="board" startIcon={<ChartBarIcon />} aria-label="Board view" />
      <ToggleGroupItem value="settings" startIcon={<GearIcon />} aria-label="View settings" />
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup aria-label="View" variant="default" disabled>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="board">Board</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Dark: Story = { ...Outline, globals: { theme: "dark" } };
export const Light: Story = { ...Outline, globals: { theme: "light" } };
