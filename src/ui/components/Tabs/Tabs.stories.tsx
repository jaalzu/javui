import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";
import { Text } from "../Text";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Account sections",
    items: [
      { value: "profile", label: "Profile", content: <Text>Your name, photo and public details.</Text> },
      { value: "billing", label: "Billing", content: <Text>Plan, invoices and payment methods.</Text> },
      { value: "team", label: "Team", content: <Text>Members and their roles.</Text> },
      { value: "danger", label: "Danger zone", content: <Text>Delete the account.</Text>, disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StartingOnSecond: Story = { args: { defaultValue: "billing" } };
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
