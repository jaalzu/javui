import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";
import { Text } from "../Text";
import { StateMatrix } from "../../stories/StateMatrix";
import { GearIcon, WalletIcon } from "../../icons/icons.generated";
import styles from "./Tabs.module.css";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Account sections",
    items: [
      { value: "profile", label: "Profile", content: <Text>Your name, photo and public details.</Text> },
      { value: "billing", label: "Billing", content: <Text>Plan, invoices and payment methods.</Text> },
      { value: "team", label: "Team", content: <Text>Members and their roles.</Text> },
      { value: "danger", label: "Danger zone", content: <Text>Delete the account.</Text>, disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StartingOnSecond: Story = { args: { defaultValue: "billing" } };
export const WithIcons: Story = {
  args: {
    items: [
      { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text>, startIcon: <GearIcon /> },
      { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text>, endIcon: <WalletIcon /> },
    ],
  },
};

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Tab",
          render: (state) => (
            <button
              type="button"
              className={styles.tab}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              data-active={state === "selected" ? "" : undefined}
              data-disabled={state === "disabled" ? "" : undefined}
              disabled={state === "disabled"}
            >
              Profile
            </button>
          ),
        },
      ]}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: (args) => (
    <div data-touch-debug>
      <Tabs {...args} />
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
