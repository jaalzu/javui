import { GearIcon, ChartLineIcon } from "@/ui/icons/icons.generated";
import { Stack, Tabs, Text, type TabsProps } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Tabs.examples.module.css";

type TabsSize = NonNullable<TabsProps["size"]>;

const panel = (label: string) => (
  <div className={styles.canvas}>
    <Text>{label}</Text>
  </div>
);

const accountItems = [
  { value: "overview", label: "Overview", content: panel("Overview") },
  { value: "settings", label: "Settings", content: panel("Settings") },
  { value: "account", label: "Account", content: panel("Account") },
];

const verticalItems = [
  { value: "overview", label: "Overview", content: panel("Overview") },
  { value: "settings", label: "Settings", content: panel("Settings") },
  { value: "account", label: "Account", content: panel("Account") },
  { value: "billing", label: "Billing", content: panel("Billing") },
  { value: "activity", label: "Activity", content: panel("Activity") },
];

const sizes: { size: TabsSize; label: string }[] = [
  { size: "sm", label: "Small " },
  { size: "md", label: "Medium " },
  { size: "lg", label: "Large " },
  { size: "xl", label: "Extra large " },
  { size: "2xl", label: "2x large " },
];

const itemsFor = (label: string) => [
  { value: "first", label, content: null },
  { value: "second", label: "Tabs", content: null },
];

export const hero = defineHero(
  `<Tabs
  aria-label="Account sections"
  items={[
    { value: "overview", label: "Overview", content: <Placeholder>Overview</Placeholder> },
    { value: "settings", label: "Settings", content: <Placeholder>Settings</Placeholder> },
    { value: "account", label: "Account", content: <Placeholder>Account</Placeholder> },
  ]}
/>`,
  <Tabs aria-label="Account sections" items={accountItems} />,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Tabs aria-label="Small tabs" items={items} />`,
    <Tabs aria-label="Small tabs" items={itemsFor("Small tabs")} />,
    "The default indicator follows the active tab and resizes smoothly between labels.",
  ),
  ex(
    "Line",
    `<Tabs variant="line" aria-label="Small tabs" items={items} />`,
    <Tabs
      variant="line"
      aria-label="Small tabs"
      items={itemsFor("Small tabs")}
    />,
    "The line indicator moves between tabs without appearing or disappearing.",
  ),
  ex(
    "Vertical",
    `<Tabs orientation="vertical" aria-label="Vertical tabs" items={items} />`,
    <Tabs
      orientation="vertical"
      aria-label="Vertical tabs"
      items={verticalItems}
    />,
    "Vertical tabs place the moving indicator beside the active tab.",
  ),
  ex(
    "With icons",
    `<Tabs
  aria-label="Small tabs"
  items={[
    { value: "first", label: "Small tabs", startIcon: <ChartLineIcon />, content: null },
    { value: "second", label: "Underline", startIcon: <GearIcon />, content: null },
  ]}
/>`,
    <Tabs
      aria-label="Small tabs"
      items={[
        {
          value: "first",
          label: "Small tabs",
          startIcon: <ChartLineIcon />,
          content: null,
        },
        {
          value: "second",
          label: "Underline",
          startIcon: <GearIcon />,
          content: null,
        },
      ]}
    />,
  ),
  ex(
    "Sizes",
    `<Stack gap="6">
  <Stack gap="3">
    <Tabs size="sm" aria-label="Small tabs" items={items} />
    <Tabs variant="line" size="sm" aria-label="Small tabs underline" items={items} />
  </Stack>
  {/* md, lg, xl and 2xl follow the same pattern */}
</Stack>`,
    <Stack gap="6">
      {sizes.map(({ size, label }) => (
        <Stack gap="3" key={size}>
          <Tabs size={size} aria-label={label} items={itemsFor(label)} />
          <Tabs
            variant="line"
            size={size}
            aria-label={`${label} underline`}
            items={itemsFor(label)}
          />
        </Stack>
      ))}
    </Stack>,
  ),
];
