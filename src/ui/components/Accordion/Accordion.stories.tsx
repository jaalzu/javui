import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Accordion } from "./Accordion";
import { StateMatrix } from "../../stories/StateMatrix";
import { CaretDownIcon, GearIcon, InfoIcon } from "../../icons/icons.generated";
import styles from "./Accordion.module.css";

const items = [
  { value: "a", title: "Is it accessible?", content: <p>Yes. Behavior comes from Base UI and every component is tested with axe.</p> },
  { value: "b", title: "Is it themeable?", content: <p>Light and dark come from semantic tokens.</p> },
  { value: "c", title: "Can agents use it?", content: <p>There is a manifest, llms.txt and an MCP server.</p> },
];

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, defaultValue: ["a", "b"] } };
export const WithIcons: Story = {
  args: {
    items: [
      { ...items[0], startIcon: <InfoIcon /> },
      { ...items[1], endIcon: <GearIcon /> },
    ],
  },
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
              className={styles.trigger}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              data-panel-open={state === "selected" ? "" : undefined}
              data-disabled={state === "disabled" ? "" : undefined}
              disabled={state === "disabled"}
              aria-expanded={state === "selected"}
            >
              <span>Is it accessible?</span>
              <CaretDownIcon size="sm" className={styles.chevron} />
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
      <Accordion {...args} />
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
