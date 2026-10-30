import { CheckIcon, Combobox, Field, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { ComboboxControlledExample } from "./ComboboxControlledExample";

const items = [
  { value: "ada", label: "Ada Lovelace", description: "Engineering", group: "Engineering", startIcon: <CheckIcon /> },
  { value: "alan", label: "Alan Turing", description: "Research", group: "Engineering", startIcon: <CheckIcon /> },
  { value: "grace", label: "Grace Hopper", description: "Platform", group: "Research", startIcon: <CheckIcon /> },
];

export const hero = defineHero(
  `<Combobox label="Assignee" placeholder="Search people" items={items} />`,
  <Combobox label="Assignee" placeholder="Search people" items={items} />,
);

export const examples: Example[] = [
  ex("Icons and groups", `<Combobox label="Assignee" items={items} />`, <Combobox label="Assignee" items={items} />, "Icons and group labels organize the options."),
  ex("Controlled", `<Combobox value={value} onValueChange={setValue} items={items} />`, <ComboboxControlledExample />, "The selected value and clear action are controlled by the parent."),
  ex("Multiple", `<Combobox multiple defaultValue={["ada", "grace"]} items={items} />`, <Combobox multiple defaultValue={["ada", "grace"]} items={items} />, "Multiple selection renders removable chips."),
  ex("Sizes", `<Stack gap="3"><Combobox size="sm" ... /><Combobox size="md" ... /><Combobox size="lg" ... /></Stack>`, <Stack gap="3"><Combobox size="sm" label="Small" items={items} /><Combobox size="md" label="Medium" items={items} /><Combobox size="lg" label="Large" items={items} /></Stack>, "Small, medium and large controls use the same API."),
  ex("States", `<Field label="Assignee" description="Helper text" error="Choose an assignee" required><Combobox items={items} /></Field>`, <Stack gap="4"><Field label="Assignee" description="Helper text, error and required come from Field." error="Choose an assignee" required><Combobox items={items} /></Field><Combobox label="Read only" items={items} readOnly defaultValue="ada" /><Combobox label="Loading" items={items} loading /><Combobox label="Disabled" items={items} disabled /></Stack>, "Helper text, error and required come from Field."),
];
