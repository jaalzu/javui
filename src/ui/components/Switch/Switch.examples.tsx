import { Switch } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Switch label="Notifications" defaultChecked />`,
  <Switch label="Notifications" defaultChecked />,
);

export const examples: Example[] = [
    ex("Default", `<Switch label="Notifications" />`, <Switch label="Notifications" />),
    ex("On", `<Switch label="Notifications" defaultChecked />`, <Switch label="Notifications" defaultChecked />),
    ex("Disabled", `<Switch label="Notifications" disabled />`, <Switch label="Notifications" disabled />),
];
