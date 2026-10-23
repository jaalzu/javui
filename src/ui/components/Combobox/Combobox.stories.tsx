import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Combobox } from "./Combobox";
import { Field } from "../Field";
import { MagnifyingGlassIcon } from "../../icons/icons.generated";
import { ValidationMatrix, validationControlProps, validationFieldProps } from "../../stories/ValidationMatrix";

const items = [
  { value: "ada", label: "Ada Lovelace", description: "Engineering" },
  { value: "grace", label: "Grace Hopper", description: "Research" },
  { value: "alan", label: "Alan Turing", description: "Engineering" },
  { value: "katherine", label: "Katherine Johnson", description: "Mathematics" },
];

const meta = {
  title: "Controls/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Assignee", placeholder: "Search people", items },
  decorators: [(Story) => <div style={{ maxWidth: "20rem", minHeight: "16rem" }}><Story /></div>],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "grace" } };
export const InsideField: Story = {
  args: { label: undefined },
  render: (args) => (
    <Field label="Assignee" description="The person responsible for this task.">
      <Combobox {...args} />
    </Field>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, defaultValue: "ada" } };
export const WithIcon: Story = { args: { startIcon: <MagnifyingGlassIcon /> } };
export const ValidationStates: Story = {
  name: "Validation states",
  render: (args) => (
    <ValidationMatrix
      rows={[
        {
          label: "Combobox",
          render: (state) => (
            <Field label="Assignee" {...validationFieldProps(state)}>
              <Combobox {...args} items={items} defaultValue="ada" label={undefined} {...validationControlProps(state)} />
            </Field>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
