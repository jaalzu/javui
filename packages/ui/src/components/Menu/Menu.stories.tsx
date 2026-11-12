import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Menu } from "./Menu";
import { StateMatrix } from "../../stories/StateMatrix";
import { ArrowRightIcon, GearIcon } from "../../icons/icons.generated";
import styles from "./Menu.module.css";

const items = [
  { label: "Profile", href: "#profile", startIcon: <GearIcon /> },
  { label: "Settings", href: "#settings", endIcon: <ArrowRightIcon /> },
  { type: "separator" as const },
  { label: "Rename", onSelect: () => {} },
  { label: "Delete", onSelect: () => {}, destructive: true },
];

const meta = {
  title: "Overlays/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Account", items },
  decorators: [(Story) => <div style={{ minHeight: "16rem" }}><Story /></div>],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: (args) => (
    <div data-touch-debug>
      <Menu {...args} />
      <div style={{ display: "grid", gap: "var(--space-1)", marginTop: "var(--space-2)", maxWidth: "16rem" }}>
        {items.flatMap((item) =>
          "label" in item ? (
            <div key={item.label} className={styles.item}>
              {item.label}
            </div>
          ) : [],
        )}
      </div>
    </div>
  ),
};

const rows = [
  { label: "Item", destructive: false },
  { label: "Destructive", destructive: true },
];

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={rows.map((row) => ({
        label: row.label,
        render: (state) => (
          <div
            className={`${styles.item} ${row.destructive ? styles.destructive : ""}`}
            data-force={state === "rest" || state === "disabled" ? undefined : state}
            data-highlighted={state === "selected" ? "" : undefined}
            data-disabled={state === "disabled" ? "" : undefined}
          >
            {row.label}
          </div>
        ),
      }))}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
