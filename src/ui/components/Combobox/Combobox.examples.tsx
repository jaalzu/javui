import { Combobox, Field, MagnifyingGlassIcon, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const timezones = ["Europe/London", "Europe/Prague", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"].map((value) => ({ value, label: value }));
const people = [{ value: "ada", label: "Ada Lovelace" }, { value: "alan", label: "Alan Turing" }, { value: "grace", label: "Grace Hopper" }];

export const hero = defineHero(
  `import { Combobox, Field } from "@/ui";

const timezones = ["Europe/London", "Europe/Prague", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"].map((value) => ({ value, label: value }));

export function TimezoneCombobox() {
  return <div style={{ width: "100%", maxWidth: "var(--container-sm)" }}><Field label="Timezone"><Combobox defaultValue="Europe/Prague" placeholder="Search timezones" items={timezones} /></Field></div>;
}`,
  <div style={{ width: "100%", maxWidth: "var(--container-sm)" }}><Field label="Timezone"><Combobox defaultValue="Europe/Prague" placeholder="Search timezones" items={timezones} /></Field></div>,
);

export const examples: Example[] = [
  ex("Multiple", `<Field label="Assignees"><Combobox multiple defaultValue={["ada", "grace"]} items={people} /></Field>`, <Field label="Assignees"><Combobox multiple defaultValue={["ada", "grace"]} items={people} /></Field>),
  ex("Clearable", `<Field label="Assignee"><Combobox clearable defaultValue="ada" items={people} /></Field>`, <Field label="Assignee"><Combobox clearable defaultValue="ada" items={people} /></Field>),
  ex("Custom icon", `<Stack gap="4"><Field label="Search"><Combobox icon={<MagnifyingGlassIcon />} items={people} /></Field><Field label="No end icon"><Combobox icon={null} items={people} /></Field></Stack>`, <Stack gap="4"><Field label="Search"><Combobox icon={<MagnifyingGlassIcon />} items={people} /></Field><Field label="No end icon"><Combobox icon={null} items={people} /></Field></Stack>),
  ex("States", `<Stack gap="4"><Field label="Loading"><Combobox loading items={people} /></Field><Field label="Disabled"><Combobox disabled defaultValue="ada" items={people} /></Field></Stack>`, <Stack gap="4"><Field label="Loading"><Combobox loading items={people} /></Field><Field label="Disabled"><Combobox disabled defaultValue="ada" items={people} /></Field></Stack>),
];
