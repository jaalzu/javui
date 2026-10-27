import { Switch } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex("Default", `<Switch label="Notifications" />`, <Switch label="Notifications" />),
    ex("On", `<Switch label="Notifications" defaultChecked />`, <Switch label="Notifications" defaultChecked />),
    ex("Disabled", `<Switch label="Notifications" disabled />`, <Switch label="Notifications" disabled />),
];
