import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sheet } from "./Sheet";
import { Button } from "../Button";
import { Stack } from "../Stack";
import { Text } from "../Text";

const longBody = (
  <Stack gap="4">
    <Text>
      This sheet explains the defaults for the current workspace. Changes apply to every member
      who has not chosen personal preferences yet, and they can be reviewed at any time.
    </Text>
    <Text>
      Product updates are sent when a feature reaches general availability. Security notices are
      always delivered and cannot be turned off because they affect access to your account.
    </Text>
    <Text>
      Digest emails summarize activity from the last seven days. They arrive on Monday morning in
      the timezone configured for the workspace, and they include only projects you can access.
    </Text>
  </Stack>
);

const richArgs = {
  description: "Review the details before making a change.",
  children: longBody,
  footer: <Button>Save changes</Button>,
};

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    trigger: "Filters",
    closeLabel: "Close filters",
    title: "Filters",
    description: "Narrow the results.",
    children: <Text>Filter controls would go here.</Text>,
    footer: <Button size="sm">Apply</Button>,
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Left: Story = {
  args: { ...richArgs, side: "left", title: "Account settings", closeLabel: "Close account settings" },
};
export const Top: Story = {
  args: { ...richArgs, side: "top", title: "Workspace notifications", closeLabel: "Close notifications" },
};
export const Bottom: Story = {
  args: { ...richArgs, side: "bottom", title: "Export workspace data", closeLabel: "Close export" },
};
export const Right: Story = {
  args: { ...richArgs, side: "right", title: "Project access", closeLabel: "Close project access" },
};
export const WithoutCloseButton: Story = { args: { showCloseButton: false } };
export const LongBody: Story = {
  args: {
    children: <Text>{Array.from({ length: 20 }, (_, index) => `${index + 1}. Long sheet content. `)}</Text>,
  },
};
export const Open: Story = { args: { defaultOpen: true } };
export const Dark: Story = { ...Open, globals: { theme: "dark" } };
export const Light: Story = { ...Open, globals: { theme: "light" } };
