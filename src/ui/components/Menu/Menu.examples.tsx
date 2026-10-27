import { Menu } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Menu
  label="Account"
  variant="secondary"
  items={[
    { label: "Profile", href: "/docs" },
    { label: "Settings", href: "/docs/components" },
    { type: "separator" },
    { label: "Sign out", destructive: true, href: "/docs" },
  ]}
/>`,
  <Menu
    label="Account"
    variant="secondary"
    items={[
      { label: "Profile", href: "/docs" },
      { label: "Settings", href: "/docs/components" },
      { type: "separator" },
      { label: "Sign out", destructive: true, href: "/docs" },
    ]}
  />,
);

export const examples: Example[] = [];
