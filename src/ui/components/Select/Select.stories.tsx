import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";
import { Field } from "../Field";
import { StateMatrix } from "../../stories/StateMatrix";
import { CaretDownIcon, MagnifyingGlassIcon } from "../../icons/icons.generated";
import styles from "./Select.module.css";

const items = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
  { value: "py", label: "Paraguay", disabled: true },
];

const meta = {
  title: "Controls/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Country", placeholder: "Choose one", items },
  decorators: [(Story) => <div style={{ maxWidth: "20rem", minHeight: "16rem" }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDefaultValue: Story = { args: { defaultValue: "uy" } };
export const InsideField: Story = {
  args: { label: undefined },
  render: (args) => (
    <Field label="Country" description="Where you live.">
      <Select {...args} />
    </Field>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
export const WithIcons: Story = {
  args: { startIcon: <MagnifyingGlassIcon />, endIcon: <CaretDownIcon /> },
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: (args) => (
    <div data-touch-debug>
      <Select {...args} />
      <div style={{ display: "grid", gap: "var(--space-1)", marginTop: "var(--space-2)" }}>
        {items.map((item) => (
          <div key={item.value} className={styles.item}>
            <span className={styles.itemText}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Trigger",
          render: (state) => (
            <button
              type="button"
              className={`${styles.trigger} ${styles.md}`}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              data-disabled={state === "disabled" ? "" : undefined}
              disabled={state === "disabled"}
            >
              <span className={styles.value}>Argentina</span>
              <span className={styles.icon}>
                <CaretDownIcon size="sm" />
              </span>
            </button>
          ),
        },
        {
          label: "Option",
          render: (state) => (
            <div
              className={styles.item}
              data-force={state === "rest" ? undefined : state}
              data-highlighted={state === "selected" ? "" : undefined}
              data-disabled={state === "disabled" ? "" : undefined}
            >
              <span className={styles.itemIndicator} />
              <span className={styles.itemText}>Argentina</span>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
