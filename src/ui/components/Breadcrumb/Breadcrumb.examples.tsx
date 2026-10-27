import { Breadcrumb, FileTextIcon, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Breadcrumb items={[
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb" },
]} />`,
  <Breadcrumb
    items={[
      { label: "Docs", href: "/docs" },
      { label: "Components", href: "/docs/components" },
      { label: "Breadcrumb" },
    ]}
  />,
);

const trail = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb" },
];

export const examples: Example[] = [
  ex(
    "Default",
    `<Breadcrumb items={[
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb" },
]} />`,
    <Breadcrumb items={trail} />,
  ),
  ex(
    "Custom separator",
    `<Breadcrumb separator="/" items={...} />
<Breadcrumb separator="·" items={...} />`,
    <Stack gap="3">
      <Breadcrumb separator="/" items={trail} />
      <Breadcrumb separator="·" items={trail} />
    </Stack>,
  ),
  ex(
    "With icons",
    `<Breadcrumb items={[
  { label: "Docs", href: "/docs", startIcon: <FileTextIcon /> },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb" },
]} />`,
    <Breadcrumb
      items={[
        { label: "Docs", href: "/docs", startIcon: <FileTextIcon /> },
        { label: "Components", href: "/docs/components" },
        { label: "Breadcrumb" },
      ]}
    />,
  ),
  ex(
    "Collapsed",
    `<Breadcrumb maxItems={4} items={[
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Navigation", href: "/docs/components/navigation" },
  { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
  { label: "Examples", href: "/docs/components/breadcrumb#examples" },
  { label: "Collapsed" },
]} />`,
    <Breadcrumb
      maxItems={4}
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Navigation", href: "/docs/components/navigation" },
        { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
        { label: "Examples", href: "/docs/components/breadcrumb#examples" },
        { label: "Collapsed" },
      ]}
    />,
    "The hidden middle items open in a menu, and every entry navigates.",
  ),
];
