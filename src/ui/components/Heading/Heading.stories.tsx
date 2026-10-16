import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: [undefined, "display", "h1", "h2", "h3", "h4"] },
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
      <Heading as="h1" size="display">h1 element, display look</Heading>
      <Heading as="h2" size="h4">h2 element, h4 look</Heading>
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
