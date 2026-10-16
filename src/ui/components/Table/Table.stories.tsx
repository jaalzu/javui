import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table } from "./Table";

const meta = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    caption: "Plans",
    columns: [
      { key: "name", header: "Plan" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "price", header: "Price per month", align: "end" },
    ],
    rows: [
      { name: "Free", seats: "1", price: "$0" },
      { name: "Team", seats: "10", price: "$12" },
      { name: "Company", seats: "Unlimited", price: "$48" },
    ],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HiddenCaption: Story = { args: { hideCaption: true } };
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
