import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: [undefined, 1, 2, 3, 4, 5, 6] },
    weight: { control: "select", options: ["regular", "medium", "semibold"] },
  },
  args: { children: "A heading that explains the section" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <Heading as="h1">h1 page title</Heading>
      <Heading as="h2">h2 section title</Heading>
      <Heading as="h3">h3 subsection</Heading>
      <Heading as="h4">h4 group</Heading>
    </div>
  ),
};

export const SemanticsVsLook: Story = {
  name: "Level and look are independent",
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <Heading as="h1" size={1}>h1 element, size 1 look</Heading>
      <Heading as="h2" size={6}>h2 element, size 6 look</Heading>
    </div>
  ),
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: Levels.render,
};

export const Light: Story = {
  globals: { theme: "light" },
  render: Levels.render,
};
