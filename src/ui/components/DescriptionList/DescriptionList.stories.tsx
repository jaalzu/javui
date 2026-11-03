import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DescriptionList, DescriptionListDetails, DescriptionListTerm } from "./DescriptionList";

const meta = {
  title: "Patterns/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { layout: "horizontal", children: null },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDetails>Shipped</DescriptionListDetails>
      <DescriptionListTerm>Updated</DescriptionListTerm>
      <DescriptionListDetails>Today</DescriptionListDetails>
    </DescriptionList>
  ),
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { layout: "horizontal", children: null },
};
export const Stacked: Story = { args: { layout: "stacked", children: null } };
export const Dark: Story = { args: { children: null }, globals: { theme: "dark" } };
