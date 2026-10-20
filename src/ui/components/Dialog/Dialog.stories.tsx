import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./Dialog";
import { Button, type ButtonVariant } from "../Button";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger variant="secondary">Open dialog</DialogTrigger>
      <DialogContent title="Notifications" description="You are all caught up. Good job!">
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Dialog defaultOpen>
        <DialogTrigger variant="secondary">Open dialog</DialogTrigger>
        <DialogContent title="Notifications" description="You are all caught up. Good job!">
          <div data-touch-debug>
            <DialogClose>Close</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const Confirm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger variant="danger">Delete project</DialogTrigger>
      <DialogContent title="Delete project?" description="This permanently removes the project and its data. This cannot be undone.">
        <DialogClose>Cancel</DialogClose>
        <DialogClose variant="danger">Delete</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const OpenOnLoadDark: Story = {
  name: "Open (dark)",
  globals: { theme: "dark" },
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger variant="secondary">Open dialog</DialogTrigger>
      <DialogContent title="Notifications" description="You are all caught up. Good job!">
        <Button variant="secondary">Action</Button>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const OpenOnLoadLight: Story = {
  name: "Open (light)",
  globals: { theme: "light" },
  render: OpenOnLoadDark.render,
};

const triggerVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "accent",
  "danger",
];

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={triggerVariants.map((variant) => ({
        label: variant,
        render: (state) => (
          <Dialog>
            <DialogTrigger variant={variant} {...forceProps(state)}>
              Open dialog
            </DialogTrigger>
          </Dialog>
        ),
      }))}
    />
  ),
};

export const StatesDark: Story = {
  name: "States (dark)",
  ...States,
  globals: { theme: "dark" },
};

export const StatesLight: Story = {
  name: "States (light)",
  ...States,
  globals: { theme: "light" },
};
