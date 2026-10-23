import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "./Sidebar";
import { Text } from "../Text";
import { ChartLineIcon, GearIcon } from "../../icons/icons.generated";

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    label: "Workspace",
    header: <Text weight="medium">Acme</Text>,
    items: [
      { label: "Overview", href: "/docs", startIcon: <ChartLineIcon />, active: true },
      { label: "Settings", href: "/docs/components", startIcon: <GearIcon /> },
      { label: "Disabled item", onSelect: () => {}, disabled: true },
    ],
    footer: <Text variant="caption" size="lg" tone="muted">v1.0</Text>,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
