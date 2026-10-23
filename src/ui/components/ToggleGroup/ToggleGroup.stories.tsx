import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleGroup } from "./ToggleGroup";
import { ListIcon, ChartBarIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  args: {
    label: "View",
    defaultValue: "list",
    items: [
      { value: "list", label: "List", startIcon: <ListIcon /> },
      { value: "board", label: "Board", startIcon: <ChartBarIcon /> },
    ],
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };
export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
