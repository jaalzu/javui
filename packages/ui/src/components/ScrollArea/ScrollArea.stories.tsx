import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollArea } from "./ScrollArea";
import { Stack } from "../Stack";
import { Text } from "../Text";

const entries = Array.from({ length: 12 }, (_, index) => `Activity entry ${index + 1}: a change was saved.`);

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  args: {
    label: "Activity",
    children: (
      <Stack gap="3">
        {entries.map((entry) => <Text key={entry}>{entry}</Text>)}
      </Stack>
    ),
  },
  decorators: [(Story) => <div style={{ maxWidth: "28rem" }}><Story /></div>],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Horizontal: Story = {
  args: {
    children: (
      <div style={{ display: "flex", gap: "var(--space-3)", width: "max-content" }}>
        {entries.map((entry) => (
          <div key={entry} style={{ width: "16rem" }}><Text>{entry}</Text></div>
        ))}
      </div>
    ),
  },
};
export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
