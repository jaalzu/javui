import { Accordion, Breadcrumb, Collapsible, CollapsibleContent, CollapsibleTrigger, Pagination, Stack, Tabs, Text, ToggleGroup, ToggleGroupItem } from "@javui/ui";
export default function NavigationPage() { return <Stack gap="5">
  <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Navigation" }]} />
  <Tabs aria-label="Secciones" items={[{ value: "one", label: "Overview", content: <Text>Vista general.</Text> }, { value: "two", label: "Details", content: <Text>Detalles.</Text> }]} />
  <Accordion items={[{ value: "one", title: "¿Qué incluye?", content: "Componentes publicados." }]} />
  <Collapsible><CollapsibleTrigger>Mostrar detalles</CollapsibleTrigger><CollapsibleContent><Text>Detalles adicionales.</Text></CollapsibleContent></Collapsible>
  <Pagination page={1} pageCount={3} hrefTemplate="/navigation?page={page}" />
  <ToggleGroup aria-label="Vista" defaultValue={["grid"]}><ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem></ToggleGroup>
</Stack>; }
