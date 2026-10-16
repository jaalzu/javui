import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <>
    <PopoverTrigger>Notifications</PopoverTrigger>
    <PopoverContent title="Notifications" description="You are all caught up. Good job!">
      <PopoverClose>Dismiss</PopoverClose>
    </PopoverContent>
  </>
);

export const Default: Story = { render: () => <Popover>{content}</Popover> };
export const OpenDark: Story = {
  name: "Open (dark)",
  globals: { theme: "dark" },
  decorators: [(Story) => <div style={{ minHeight: "14rem" }}><Story /></div>],
  render: () => <Popover defaultOpen>{content}</Popover>,
};
export const OpenLight: Story = {
  name: "Open (light)",
  globals: { theme: "light" },
  decorators: [(Story) => <div style={{ minHeight: "14rem" }}><Story /></div>],
  render: () => <Popover defaultOpen>{content}</Popover>,
};
