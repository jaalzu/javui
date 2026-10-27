import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Atoms/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    ratio: 16 / 9,
    children: (
      // eslint-disable-next-line @next/next/no-img-element -- Local fixture for the story.
      <img src="/window.svg" alt="A window" width="640" height="360" />
    ),
  },
  decorators: [(Story) => <div style={{ maxWidth: "28rem" }}><Story /></div>],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Landscape: Story = {};
export const Square: Story = { args: { ratio: 1 } };
export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
    children: (
      // eslint-disable-next-line @next/next/no-img-element -- Local fixture for the story.
      <img src="/window.svg" alt="A window" width="480" height="640" />
    ),
  },
};
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
