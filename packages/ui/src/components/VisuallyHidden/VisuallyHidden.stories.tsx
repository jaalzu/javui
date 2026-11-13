import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VisuallyHidden } from "./VisuallyHidden";
import { Text } from "../Text";

const meta = {
  title: "Atoms/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Text>
      There is text here that only screen readers announce:<VisuallyHidden> (you cannot see this)</VisuallyHidden>
    </Text>
  ),
};
