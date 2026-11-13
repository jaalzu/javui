import { Avatar, AvatarGroup, DescriptionList, EmptyState, Progress, ScrollArea, Skeleton, Stack, Table, Text } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
export default function DataPage() { return <Stack gap="5">
  <Table caption="Miembros" columns={[{ key: "name", header: "Nombre" }, { key: "role", header: "Rol" }]} rows={[{ name: "Ada", role: "Admin" }, { name: "Grace", role: "Editor" }]} />
  <AvatarGroup><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" /></AvatarGroup>
  <Progress value={72} aria-label="Progreso" /><Skeleton /><EmptyState title="Sin notificaciones" description="Todo está al día." />
  <ScrollArea><Text>Área desplazable para contenido largo.</Text></ScrollArea>
  <DescriptionList items={[{ term: "Estado", description: "Activo" }, { term: "Plan", description: "Business" }]} />
  <CodeBlock language="ts" code={'const status = "active";'} />
</Stack>; }
