import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";
import { ChartLineIcon } from "../../icons/icons.generated";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No reports yet",
    description: "Connect a data source to see your first report.",
    icon: <ChartLineIcon />,
    action: <Button size="sm">Connect source</Button>,
  },
  decorators: [(Story) => <div style={{ maxWidth: "28rem" }}><Story /></div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = {
  args: { description: undefined, icon: undefined, action: undefined },
};
export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
