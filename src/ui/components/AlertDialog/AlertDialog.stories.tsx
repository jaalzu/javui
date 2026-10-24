import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogTrigger } from "./AlertDialog";
import type { ButtonVariant } from "../Button";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";

const meta = {
  title: "Overlays/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger variant="secondary">Leave without saving?</AlertDialogTrigger>
      <AlertDialogContent
        title="Leave without saving?"
        description="Your unsaved changes will be lost."
      >
        <AlertDialogClose>Stay</AlertDialogClose>
        <AlertDialogClose variant="danger">Leave</AlertDialogClose>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>
      <AlertDialogContent
        title="Delete project?"
        description="This permanently removes the project and its data. This cannot be undone."
      >
        <AlertDialogClose>Cancel</AlertDialogClose>
        <AlertDialogClose variant="danger">Delete</AlertDialogClose>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <AlertDialog defaultOpen>
        <AlertDialogTrigger variant="secondary">Delete project</AlertDialogTrigger>
        <AlertDialogContent
          title="Delete project?"
          description="This permanently removes the project and its data."
        >
          <div data-touch-debug>
            <AlertDialogClose>Cancel</AlertDialogClose>
          </div>
          <AlertDialogClose variant="danger">Delete</AlertDialogClose>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
};

export const OpenOnLoadDark: Story = {
  name: "Open (dark)",
  globals: { theme: "dark" },
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>
      <AlertDialogContent
        title="Delete project?"
        description="This permanently removes the project and its data. This cannot be undone."
      >
        <AlertDialogClose>Cancel</AlertDialogClose>
        <AlertDialogClose variant="danger">Delete</AlertDialogClose>
      </AlertDialogContent>
    </AlertDialog>
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
          <AlertDialog>
            <AlertDialogTrigger variant={variant} {...forceProps(state)}>
              Open alert dialog
            </AlertDialogTrigger>
          </AlertDialog>
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
