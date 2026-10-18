import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";
import { Heading } from "../Heading";
import { Stack } from "../Stack";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    as: "article",
    children: (
      <Stack gap="2">
        <Heading as="h3" size={6}>Quiet by default</Heading>
        <Text tone="muted">A card groups related content without adding noise.</Text>
      </Stack>
    ),
  },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};
export const Surface: Story = { args: { variant: "surface" } };
export const Dark: Story = { args: { variant: "surface" }, globals: { theme: "dark" } };
export const Light: Story = { args: { variant: "surface" }, globals: { theme: "light" } };
