import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kbd } from "./Kbd";
import { Text } from "../Text";

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
export const Shortcut: Story = {
  render: () => (
    <Text>
      Open the command menu with <Kbd>⌘</Kbd> + <Kbd>K</Kbd>.
    </Text>
  ),
};
export const Dark: Story = { ...Shortcut, globals: { theme: "dark" } };
