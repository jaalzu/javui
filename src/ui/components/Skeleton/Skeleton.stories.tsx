import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";
import { Stack } from "../Stack";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <Stack as="section" aria-busy="true" aria-label="Loading profile" gap="3">
      <Stack direction="row" gap="3" align="center">
        <Skeleton shape="circle" />
        <Stack gap="2" style={{ flex: 1 }}>
          <Skeleton width="40%" />
          <Skeleton width="25%" />
        </Stack>
      </Stack>
      <Skeleton shape="rect" />
    </Stack>
  ),
};
export const Dark: Story = { ...Card, globals: { theme: "dark" } };
