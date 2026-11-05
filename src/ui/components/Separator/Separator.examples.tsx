import { Separator, Stack, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Separator.examples.module.css";

export const hero = defineHero(
  `<Stack gap="2" align="start">
  <Text variant="caption" casing="uppercase" tone="muted">Workspace</Text>
  <Text>Team settings and shared resources.</Text>
  <Separator />
  <Text tone="muted">Changes are saved automatically.</Text>
</Stack>`,
  <Stack gap="2" align="start">
    <Text variant="caption" casing="uppercase" tone="muted">Workspace</Text>
    <Text>Team settings and shared resources.</Text>
    <Separator />
    <Text tone="muted">Changes are saved automatically.</Text>
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Vertical",
    `<Stack direction="row" gap="4" align="center" justify="center">
  <Text weight="medium">Draft</Text>
  <Separator orientation="vertical" />
  <Text weight="medium">In review</Text>
  <Separator orientation="vertical" />
  <Text weight="medium">Published</Text>
</Stack>`,
    <Stack direction="row" gap="4" align="center" justify="center">
      <Text weight="medium">Draft</Text>
      <Separator orientation="vertical" />
      <Text weight="medium">In review</Text>
      <Separator orientation="vertical" />
      <Text weight="medium">Published</Text>
    </Stack>,
    "Vertical lines between related groups in a row.",
  ),
  ex(
    "List",
    `<Stack gap="2" className={styles.list}>
  <Text>Profile</Text>
  <Separator />
  <Text>Notifications</Text>
  <Separator />
  <Text>Appearance</Text>
</Stack>`,
    <Stack gap="2" className={styles.list}>
      <Text>Profile</Text>
      <Separator />
      <Text>Notifications</Text>
      <Separator />
      <Text>Appearance</Text>
    </Stack>,
    "Separators between rows of the same list.",
  ),
];
