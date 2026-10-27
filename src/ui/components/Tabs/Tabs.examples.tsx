import { Tabs, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Tabs
  aria-label="Account sections"
  items={[
    { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text> },
    { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text> },
  ]}
/>`,
  <Tabs
    aria-label="Account sections"
    items={[
      { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text> },
      { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text> },
    ]}
  />,
);

export const examples: Example[] = [
    ex(
      "Vertical",
      `<Tabs\n  orientation="vertical"\n  aria-label="Account sections"\n  items={[\n    { value: "profile", label: "Profile", content: <p>Your name and photo.</p> },\n    { value: "billing", label: "Billing", content: <p>Plan and invoices.</p> },\n    { value: "team", label: "Team", content: <p>Members and roles.</p> },\n  ]}\n/>`,
      <Tabs
        orientation="vertical"
        aria-label="Account sections"
        items={[
          { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text> },
          { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text> },
          { value: "team", label: "Team", content: <Text>Members and roles.</Text> },
        ]}
      />,
      "Vertical tabs sit in a column next to their panel, for settings and compact spaces.",
    ),
];
