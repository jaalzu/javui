import { Field, Stack, Switch } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const rowWidth = {
  width: "25rem",
  maxWidth: "100%",
  marginInline: "auto",
} as const;

const exampleStage = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
} as const;

const fieldRow = {
  width: "fit-content",
  maxWidth: "100%",
  gridTemplateColumns: "minmax(0, auto) auto",
  columnGap: "var(--space-6)",
} as const;

const invalidRow = {
  ...fieldRow,
  maxWidth: "26rem",
} as const;

export const hero = defineHero(
  `<Switch label="Notifications" defaultChecked />`,
  <Switch label="Notifications" defaultChecked />,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Switch label="Notifications" />`,
    <Switch label="Notifications" />,
  ),
  ex(
    "With description",
    `<Field
  label="Product updates"
  description="Get updates when available."
  orientation="horizontal"
>
  <Switch size="sm" aria-label="Product updates" />
</Field>`,
    <div style={exampleStage}>
      <Field
        label="Product updates"
        description="Get updates when available."
        orientation="horizontal"
        style={fieldRow}
      >
        <Switch size="sm" aria-label="Product updates" />
      </Field>
    </div>,
    "The switch sits at the label height on the right, and clicking the label toggles it.",
  ),
  ex(
    "Choice card",
    `<Switch
  label="Product updates"
  description="Get an email when something ships."
  variant="card"
/>`,
    <div style={rowWidth}>
      <Switch
        label="Product updates"
        description="Get an email when something ships."
        variant="card"
      />
    </div>,
    '`variant="card"` turns the whole label into a clickable card: title and subtitle on the left, switch on the right.',
  ),
  ex(
    "Disabled",
    `<Switch label="Notifications" disabled />`,
    <Switch label="Notifications" disabled />,
  ),
  ex(
    "Invalid",
    `<Field
  orientation="horizontal"
  data-invalid
  label="Accept terms and conditions"
  description="You must accept the terms and conditions to continue."
>
  <Switch size="sm" aria-label="Accept terms and conditions" aria-invalid />
</Field>`,
    <div style={exampleStage}>
      <Field
        orientation="horizontal"
        data-invalid
        label="Accept terms and conditions"
        description="You must accept the terms and conditions to continue."
        style={invalidRow}
      >
        <Switch
          size="sm"
          aria-label="Accept terms and conditions"
          aria-invalid
        />
      </Field>
    </div>,
    "Add `data-invalid` to the Field for styling and `aria-invalid` to the switch. Use `error` instead when there is a message to announce.",
  ),
  ex(
    "Sizes",
    `<Stack gap="3">
  <Switch size="sm" label="Small" />
  <Switch size="md" label="Default" />
</Stack>`,
    <Stack gap="3">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Default" />
    </Stack>,
  ),
];
