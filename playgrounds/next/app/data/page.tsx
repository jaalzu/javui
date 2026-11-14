import { Avatar, AvatarGroup, DescriptionList, DescriptionListDetails, DescriptionListTerm, EmptyState, Progress, ScrollArea, Skeleton, Stack, Table, Text } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
export default function DataPage() { return <Stack gap="5">
  <Table caption="Miembros" columns={[{ key: "name", header: "Nombre" }, { key: "role", header: "Rol" }]} rows={[{ name: "Ada", role: "Admin" }, { name: "Grace", role: "Editor" }]} />
  <AvatarGroup aria-label="Miembros del equipo"><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" /></AvatarGroup>
  <Progress label="Progreso" value={72} /><Skeleton /><EmptyState title="Sin notificaciones" description="Todo está al día." />
  <ScrollArea label="Actividad"><Text>Área desplazable para contenido largo.</Text></ScrollArea>
  <DescriptionList layout="horizontal"><DescriptionListTerm>Estado</DescriptionListTerm><DescriptionListDetails>Activo</DescriptionListDetails><DescriptionListTerm>Plan</DescriptionListTerm><DescriptionListDetails>Business</DescriptionListDetails></DescriptionList>
  <CodeBlock language="ts" code={'const status = "active";'} />
</Stack>; }
