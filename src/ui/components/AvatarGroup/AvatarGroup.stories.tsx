import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "../Avatar";
import { AvatarGroup } from "./AvatarGroup";

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Margaret Hamilton", "Barbara Liskov"];

const meta = {
  title: "Atoms/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Project members",
    max: 4,
    children: people.map((name) => <Avatar key={name} name={name} />),
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm", children: people.map((name) => <Avatar key={name} name={name} />) },
};

export const AllVisible: Story = {
  args: { max: 6, children: people.map((name) => <Avatar key={name} name={name} />) },
};

export const Dark: Story = { globals: { theme: "dark" } };

export const Light: Story = { globals: { theme: "light" } };
