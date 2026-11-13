import { Field, Select, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];

const longListCountries = [
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
    "Consecutive items with the same group render under a heading, with a little extra space between groups instead of a rule.",
  ),
  ex(
    "Long list",
    `<Select
  aria-label="Country"
  placeholder="Choose a country"
  items={longListCountries}
/>`,
    <Stack align="center" justify="center">
      <Select
        aria-label="Country"
        placeholder="Choose a country"
        items={longListCountries}
      />
    </Stack>,
    "Countries grouped by region, each with its timezone.",
    "lg",
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
