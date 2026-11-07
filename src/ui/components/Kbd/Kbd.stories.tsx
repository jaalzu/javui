import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kbd } from "./Kbd";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { Tooltip, TooltipProvider } from "../Tooltip";

const meta = {
  title: "Atoms/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Enter: Story = { render: () => <Stack align="center"><Kbd>Enter</Kbd></Stack> };
export const Shortcut: Story = {
  render: () => (
    <Stack align="center"><Text>Open the command menu with <Kbd>⌘</Kbd> + <Kbd>K</Kbd>.</Text></Stack>
  ),
};
export const Sizes: Story = { render: () => <Stack direction="row" gap="3" align="center" justify="center"><Kbd size="sm">K</Kbd><Kbd size="md">K</Kbd><Kbd size="lg">K</Kbd></Stack> };
export const SpecialKeys: Story = { render: () => <Stack direction="row" gap="3" align="center" justify="center"><Kbd>Shift</Kbd><Kbd>Enter</Kbd><Kbd>Space</Kbd></Stack> };
export const InTooltip: Story = { render: () => <TooltipProvider delay={0}><Tooltip content="Submit"><button type="button" aria-label="Submit with Enter"><Kbd>Enter</Kbd></button></Tooltip></TooltipProvider> };
export const Disabled: Story = { render: () => <Stack direction="row" gap="3" align="center" justify="center"><Kbd size="lg" aria-disabled="true">Enter</Kbd><Kbd size="lg" aria-disabled="true">⌘</Kbd></Stack> };
export const Dark: Story = { ...Shortcut, globals: { theme: "dark" } };
