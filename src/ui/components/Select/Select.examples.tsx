import { Field, Select, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];

export const hero = defineHero(
  `<Field label="Country">
  <Select items={countries} placeholder="Choose one" />
</Field>`,
  <Field label="Country">
    <Select items={countries} placeholder="Choose one" />
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Field label="Country">
  <Select items={countries} placeholder="Choose one" />
</Field>`,
    <Stack align="center" justify="center">
      <Field label="Country">
        <Select items={countries} placeholder="Choose one" />
      </Field>
    </Stack>,
    "A compact select for a short list of options.",
  ),
  ex(
    "Description",
    `<Field label="Country" description="Used for regional settings and billing.">
  <Select items={countries} placeholder="Choose one" />
</Field>`,
    <Stack align="center" justify="center">
      <Field label="Country" description="Used for regional settings and billing.">
        <Select items={countries} placeholder="Choose one" />
      </Field>
    </Stack>,
    "Use Field when the select needs helper text or validation messaging.",
  ),
  ex(
    "Grouped",
    `<Select
  aria-label="Workspace"
  placeholder="Choose a workspace"
  items={[
    { value: "design", label: "Design", group: "Teams" },
    { value: "engineering", label: "Engineering", group: "Teams" },
    { value: "personal", label: "Personal", group: "Other" },
  ]}
/>`,
    <Stack align="center" justify="center">
      <Select
        aria-label="Workspace"
        placeholder="Choose a workspace"
        items={[
          { value: "design", label: "Design", group: "Teams" },
          { value: "engineering", label: "Engineering", group: "Teams" },
          { value: "personal", label: "Personal", group: "Other" },
        ]}
      />
    </Stack>,
    "Consecutive items with a group are shown under a heading with a separator between sections.",
  ),
  ex(
    "Item descriptions",
    `<Select
  aria-label="Environment"
  placeholder="Choose an environment"
  items={[
    { value: "production", label: "Production", description: "Live customer traffic." },
    { value: "staging", label: "Staging", description: "Pre-release testing." },
  ]}
/>`,
    <Stack align="center" justify="center">
      <Select
        aria-label="Environment"
        placeholder="Choose an environment"
        items={[
          { value: "production", label: "Production", description: "Live customer traffic." },
          { value: "staging", label: "Staging", description: "Pre-release testing." },
        ]}
      />
    </Stack>,
    "Add supporting text to an option when the label alone is ambiguous.",
  ),
  ex(
    "Disabled",
    `<Field label="Country">
  <Select
    items={[
      { value: "ar", label: "Argentina" },
      { value: "uy", label: "Uruguay", disabled: true },
      { value: "cl", label: "Chile" },
    ]}
    defaultValue="ar"
  />
</Field>`,
    <Stack align="center" justify="center">
      <Field label="Country">
        <Select
          items={[
            { value: "ar", label: "Argentina" },
            { value: "uy", label: "Uruguay", disabled: true },
            { value: "cl", label: "Chile" },
          ]}
          defaultValue="ar"
        />
      </Field>
    </Stack>,
    "Disable the entire select or an individual option when it is unavailable.",
  ),
  ex(
    "Invalid",
    `<Field label="Country" error="Choose a country">
  <Select items={countries} placeholder="Choose one" />
</Field>`,
    <Stack align="center" justify="center">
      <Field label="Country" error="Choose a country">
        <Select items={countries} placeholder="Choose one" />
      </Field>
    </Stack>,
    "Field wires the invalid state, error message and accessible description to the trigger.",
  ),
];
