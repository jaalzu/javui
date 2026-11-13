import { Combobox, Field, MagnifyingGlassIcon, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Combobox.examples.module.css";

const timezones = ["Europe/London", "Europe/Prague", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"].map((value) => ({ value, label: value }));
const people = [{ value: "ada", label: "Ada Lovelace" }, { value: "alan", label: "Alan Turing" }, { value: "grace", label: "Grace Hopper" }];

export const hero = defineHero(
  `import { Combobox, Field } from "@javui/ui";

const timezones = ["Europe/London", "Europe/Prague", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"].map((value) => ({ value, label: value }));

export function TimezoneCombobox() {
  return <div className={styles.hero}><Field label="Timezone"><Combobox defaultValue="Europe/Prague" placeholder="Search timezones" items={timezones} /></Field></div>;
}`,
  <div className={styles.hero}><Field label="Timezone"><Combobox defaultValue="Europe/Prague" placeholder="Search timezones" items={timezones} /></Field></div>,
);

export const examples: Example[] = [
  ex("Multiple", `<Field label="Assignees"><Combobox multiple defaultValue={["ada", "grace"]} items={people} /></Field>`, <Field label="Assignees"><Combobox multiple defaultValue={["ada", "grace"]} items={people} /></Field>),
  ex("Clearable", `<Field label="Assignee"><Combobox clearable defaultValue="ada" items={people} /></Field>`, <Field label="Assignee"><Combobox clearable defaultValue="ada" items={people} /></Field>),
  ex("Custom icon", `<Stack gap="4"><Field label="Search"><Combobox icon={<MagnifyingGlassIcon />} items={people} /></Field><Field label="No end icon"><Combobox icon={null} items={people} /></Field></Stack>`, <Stack gap="4"><Field label="Search"><Combobox icon={<MagnifyingGlassIcon />} items={people} /></Field><Field label="No end icon"><Combobox icon={null} items={people} /></Field></Stack>),
  ex("States", `<Stack gap="4"><Field label="Loading"><Combobox loading items={people} /></Field><Field label="Disabled"><Combobox disabled defaultValue="ada" items={people} /></Field></Stack>`, <Stack gap="4"><Field label="Loading"><Combobox loading items={people} /></Field><Field label="Disabled"><Combobox disabled defaultValue="ada" items={people} /></Field></Stack>),
];
