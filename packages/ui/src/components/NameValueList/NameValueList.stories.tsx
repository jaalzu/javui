import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NameValueList } from "./NameValueList";

const meta = {
  title: "Patterns/NameValueList",
  component: NameValueList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    layout: "horizontal",
    items: [
      { label: "Status", value: "Shipped" },
      { label: "Owner", value: "Ada Lovelace" },
    ],
  },
} satisfies Meta<typeof NameValueList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Stacked: Story = { args: { layout: "stacked" } };
export const Dark: Story = { globals: { theme: "dark" } };
