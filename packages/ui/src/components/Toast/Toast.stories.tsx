import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";
import { Stack } from "../Stack";
import { StateMatrix } from "../../stories/StateMatrix";
import { CheckCircleIcon, WarningIcon, XIcon } from "../../icons/icons.generated";
import styles from "./Toast.module.css";

function Buttons() {
  const { show } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button variant="secondary" onClick={() => show({ title: "Copied to clipboard" })}>Neutral</Button>
      <Button variant="secondary" onClick={() => show({ title: "Saved", description: "Your changes are safe.", tone: "success", startIcon: <CheckCircleIcon /> })}>Success</Button>
      <Button variant="secondary" onClick={() => show({ title: "Could not save", description: "Check your connection.", tone: "danger", startIcon: <WarningIcon /> })}>Danger</Button>
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

export const Default: Story = { render: () => <Buttons /> };

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
