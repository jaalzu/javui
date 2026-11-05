import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";
import { Field } from "../Field";
import { StateMatrix } from "../../stories/StateMatrix";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";
import { CaretDownIcon, MagnifyingGlassIcon } from "../../icons/icons.generated";
import styles from "./Select.module.css";

const items = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
  { value: "py", label: "Paraguay", disabled: true },
];

const longListItems = [
  { value: "ar", label: "Argentina · GMT-3", group: "South America" },
  { value: "bo", label: "Bolivia · GMT-4", group: "South America" },
  { value: "br", label: "Brazil · GMT-3", group: "South America" },
  { value: "cl", label: "Chile · GMT-4", group: "South America" },
  { value: "co", label: "Colombia · GMT-5", group: "South America" },
  { value: "ec", label: "Ecuador · GMT-5", group: "South America" },
  { value: "py", label: "Paraguay · GMT-4", group: "South America" },
  { value: "pe", label: "Peru · GMT-5", group: "South America" },
  { value: "uy", label: "Uruguay · GMT-3", group: "South America" },
  { value: "ve", label: "Venezuela · GMT-4", group: "South America" },
  { value: "ca", label: "Canada · GMT-5", group: "North America" },
  { value: "cr", label: "Costa Rica · GMT-6", group: "North America" },
  { value: "cu", label: "Cuba · GMT-5", group: "North America" },
  { value: "do", label: "Dominican Republic · GMT-4", group: "North America" },
  { value: "gt", label: "Guatemala · GMT-6", group: "North America" },
  { value: "mx", label: "Mexico · GMT-6", group: "North America" },
  { value: "pa", label: "Panama · GMT-5", group: "North America" },
  { value: "us", label: "United States · GMT-5", group: "North America" },
  { value: "at", label: "Austria · GMT+1", group: "Europe" },
  { value: "be", label: "Belgium · GMT+1", group: "Europe" },
  { value: "dk", label: "Denmark · GMT+1", group: "Europe" },
  { value: "fr", label: "France · GMT+1", group: "Europe" },
  { value: "de", label: "Germany · GMT+1", group: "Europe" },
  { value: "it", label: "Italy · GMT+1", group: "Europe" },
  { value: "nl", label: "Netherlands · GMT+1", group: "Europe" },
  { value: "no", label: "Norway · GMT+1", group: "Europe" },
  { value: "pt", label: "Portugal · GMT+0", group: "Europe" },
  { value: "es", label: "Spain · GMT+1", group: "Europe" },
  { value: "se", label: "Sweden · GMT+1", group: "Europe" },
  { value: "ch", label: "Switzerland · GMT+1", group: "Europe" },
  { value: "eg", label: "Egypt · GMT+2", group: "Africa" },
  { value: "ke", label: "Kenya · GMT+3", group: "Africa" },
  { value: "ma", label: "Morocco · GMT+1", group: "Africa" },
  { value: "ng", label: "Nigeria · GMT+1", group: "Africa" },
  { value: "za", label: "South Africa · GMT+2", group: "Africa" },
  { value: "au", label: "Australia · GMT+10", group: "Oceania" },
  { value: "nz", label: "New Zealand · GMT+12", group: "Oceania" },
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
export const Grouped: Story = {
  args: {
    label: "Workspace",
    placeholder: "Choose a workspace",
    items: [
      { value: "design", label: "Design", group: "Teams" },
      { value: "engineering", label: "Engineering", group: "Teams" },
      { value: "personal", label: "Personal", group: "Other" },
    ],
  },
};
export const LongList: Story = {
  name: "Long list (scroll)",
  args: {
    label: "Country",
    placeholder: "Choose a country",
    items: longListItems,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "20rem", minHeight: "36rem" }}>
        <Story />
      </div>
    ),
  ],
};
export const ItemDescriptions: Story = {
  args: {
    label: "Environment",
    placeholder: "Choose an environment",
    items: [
      { value: "production", label: "Production", description: "Live customer traffic." },
      { value: "staging", label: "Staging", description: "Pre-release testing." },
    ],
  },
};
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

export const IconSizes: Story = {
  name: "Icon sizes",
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select
          key={size}
          {...args}
          size={size}
          startIcon={<MagnifyingGlassIcon />}
          endIcon={<CaretDownIcon />}
        />
      ))}
    </div>
  ),
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

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[
        {
          label: "Select",
          render: (state) => (
            <Field label="Country" {...validationFieldProps(state)}>
              <Select
                items={items}
                defaultValue="ar"
                {...validationControlProps(state)}
              />
            </Field>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
