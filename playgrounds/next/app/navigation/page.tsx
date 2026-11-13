import { Accordion, Breadcrumb, Collapsible, Pagination, Stack, Tabs, ToggleGroup } from "@javui/ui";
export default function NavigationPage() { return <Stack gap="5">
  <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Navigation" }]} />
  <Tabs defaultValue="one" items={[{ value: "one", label: "Overview" }, { value: "two", label: "Details" }]} />
  <Accordion items={[{ value: "one", title: "¿Qué incluye?", content: "Componentes publicados." }]} />
  <Collapsible><Collapsible.Trigger>Mostrar detalles</Collapsible.Trigger><Collapsible.Panel>Detalles adicionales.</Collapsible.Panel></Collapsible>
  <Pagination count={3} page={1} />
  <ToggleGroup aria-label="Vista" defaultValue="grid" items={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }]} />
</Stack>; }
