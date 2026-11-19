import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";
import { Stack } from "../Stack";
import { StateMatrix } from "../../stories/StateMatrix";
import { XIcon } from "../../icons/icons.generated";
import styles from "./Toast.module.css";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Types() {
  const { show } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button variant="secondary" onClick={() => show({ title: "Copied to clipboard" })}>Neutral</Button>
      <Button variant="secondary" onClick={() => show({ title: "Saved", description: "Your changes are safe.", type: "success" })}>Success</Button>
      <Button variant="secondary" onClick={() => show({ title: "Heads up", description: "Your trial ends in 3 days.", type: "info" })}>Info</Button>
      <Button variant="secondary" onClick={() => show({ title: "Storage almost full", description: "You have used 90% of your plan.", type: "warning" })}>Warning</Button>
      <Button variant="secondary" onClick={() => show({ title: "Could not save", description: "Check your connection.", type: "danger" })}>Danger</Button>
      <Button variant="secondary" onClick={() => show({ title: "Uploading…", description: "This stays until it is dismissed.", type: "loading" })}>Loading</Button>
    </Stack>
  );
}

function Action() {
  const { show, close } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        const id = show({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
          actionProps: { children: "Undo", onClick: () => close(id) },
        });
      }}
    >
      Create event
    </Button>
  );
}

function PromiseToast() {
  const { promise } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button
        variant="secondary"
        onClick={() =>
          promise(wait(1500), {
            loading: "Saving changes…",
            success: "Changes saved",
            error: "Could not save",
          })
        }
      >
        Save successfully
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          promise(
            wait(1500).then(() => {
              throw new Error("Network error");
            }),
            {
              loading: "Saving changes…",
              success: "Changes saved",
              error: "Could not save. Try again.",
            },
          )
        }
      >
        Save with an error
      </Button>
    </Stack>
  );
}

const meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Types /> };
export const ActionToast: Story = { name: "Action", render: () => <Action /> };
export const PromiseToastStory: Story = { name: "Promise", render: () => <PromiseToast /> };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Close",
          render: (state) => (
            <button
              type="button"
              className={styles.close}
              aria-label="Dismiss"
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              disabled={state === "disabled"}
            >
              <XIcon size="sm" />
            </button>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
