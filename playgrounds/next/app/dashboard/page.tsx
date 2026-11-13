import { Avatar, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Grid, Progress, Stack, Table, Text } from "@javui/ui";

export default function DashboardPage() {
  return <Stack gap="6">
    <Stack direction="row" justify="between" align="center"><Stack gap="1"><Text variant="label">Resumen</Text><Text variant="body" weight="medium">Dashboard del producto</Text></Stack><Badge variant="success">En línea</Badge></Stack>
    <Grid minColumnWidth="14rem" gap="4">
      {[{ title: "Usuarios activos", value: "1,284" }, { title: "Conversión", value: "12.4%" }, { title: "Disponibilidad", value: "99.98%" }].map((metric) => <Card key={metric.title} variant="surface"><CardHeader><CardTitle>{metric.title}</CardTitle><CardDescription>Últimos 30 días</CardDescription></CardHeader><CardContent><Text variant="body" weight="medium">{metric.value}</Text></CardContent></Card>)}
    </Grid>
    <Grid minColumnWidth="20rem" gap="4"><Card variant="surface"><CardHeader><CardTitle>Objetivo mensual</CardTitle><CardDescription>Progreso de adopción</CardDescription></CardHeader><CardContent><Stack gap="3"><Progress label="Progreso mensual" value={72} /><Text size="sm">72% del objetivo completado</Text></Stack></CardContent></Card><Card variant="surface"><CardHeader><CardTitle>Actividad reciente</CardTitle></CardHeader><CardContent><Table caption="Actividad" columns={[{ key: "person", header: "Persona" }, { key: "action", header: "Acción" }]} rows={[{ person: <Stack direction="row" gap="2" align="center"><Avatar name="Ada Lovelace" size="sm" />Ada</Stack>, action: "Publicó un informe" }, { person: <Stack direction="row" gap="2" align="center"><Avatar name="Grace Hopper" size="sm" />Grace</Stack>, action: "Actualizó ajustes" }]} /></CardContent></Card></Grid>
  </Stack>;
}
