import { Checkbox, CheckboxGroup, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const defaultCode = `<>
  <CheckboxGroup legend="Preferences">
    <Checkbox label="Send me updates" />
    <Checkbox label="Remember my choice" defaultChecked />
    <Checkbox label="Unavailable" disabled />
  </CheckboxGroup>
  <Checkbox label="Product updates" variant="card" />
</>`;

const defaultNode = (
  <Stack align="center" gap="4">
    <CheckboxGroup legend="Preferences">
      <Checkbox label="Send me updates" />
      <Checkbox label="Remember my choice" defaultChecked />
      <Checkbox label="Unavailable" disabled />
    </CheckboxGroup>
    <Checkbox label="Product updates" variant="card" />
  </Stack>
);

export const hero = defineHero(defaultCode, defaultNode);

export const examples: Example[] = [
  ex("Default", `<Checkbox label="Send me updates" />`, <Stack align="center"><Checkbox label="Send me updates" /></Stack>, "A single checkbox uses the default presentation."),
  ex(
    "Group",
    `<CheckboxGroup legend="Notifications" defaultValue={["email"]} allValues={["email", "sms"]}>...</CheckboxGroup>`,
    <Stack align="center"><CheckboxGroup legend="Notifications" defaultValue={["email"]} allValues={["email", "sms"]}><Checkbox label="Select all" parent /><Checkbox label="Email" value="email" /><Checkbox label="SMS" value="sms" /></CheckboxGroup></Stack>,
    "Partial selection shows a dash; all selected shows a check.",
  ),
  ex("Invalid", `<Checkbox label="Accept terms" invalid />`, <Stack align="center"><Checkbox label="Accept terms" invalid /></Stack>, "The label and box turn danger."),
  ex("Description", `<Checkbox label="Email updates" description="Receive occasional product updates, release notes, helpful tips, and important announcements from our team." />`, <Stack align="center"><Checkbox label="Email updates" description="Receive occasional product updates, release notes, helpful tips, and important announcements from our team." /></Stack>, "Description sits below the label."),
  ex("Disabled", `<Checkbox label="Unavailable" disabled />`, <Stack align="center"><Checkbox label="Unavailable" disabled /></Stack>, "Disabled is not interactive."),
  ex("Without label", `<Checkbox aria-label="Select row 3" />`, <Stack align="center"><Checkbox aria-label="Select row 3" /></Stack>, "An unlabeled checkbox needs an accessible name."),
];
