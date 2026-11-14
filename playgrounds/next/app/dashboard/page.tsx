import { Alert, Avatar, AvatarGroup, Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DescriptionList, DescriptionListDetails, DescriptionListTerm, Grid, Heading, Progress, Separator, Stack, Tabs, Text } from "@javui/ui";

const metrics = [
  { label: "Usuarios activos", value: "1,284", change: "+12.8%", detail: "vs. período anterior", tone: "success" as const },
  { label: "Conversión", value: "12.4%", change: "+2.4%", detail: "objetivo: 10%", tone: "success" as const },
  { label: "Ingresos", value: "$48,290", change: "+8.6%", detail: "últimos 30 días", tone: "brand" as const },
  { label: "Disponibilidad", value: "99.98%", change: "Estable", detail: "sin incidentes", tone: "default" as const },
];
const activity = [
  { name: "Ada Lovelace", action: "Publicó un informe", time: "Hace 8 min" },
  { name: "Grace Hopper", action: "Actualizó ajustes", time: "Hace 32 min" },
  { name: "Linus Torvalds", action: "Invitó a 3 miembros", time: "Hace 1 h" },
];

function MetricCard({ label, value, change, detail, tone }: (typeof metrics)[number]) {
  return <Card as="article" variant="surface" size="sm"><CardHeader><CardDescription>{label}</CardDescription><CardAction><Badge variant={tone}>{change}</Badge></CardAction></CardHeader><CardContent><Stack gap="1"><Text size="lg" weight="medium">{value}</Text><Text size="sm" tone="muted">{detail}</Text></Stack></CardContent></Card>;
}

export default function DashboardPage() {
  return <Stack gap="6">
    <Stack direction="row" justify="between" align="end" gap="4" wrap><Stack gap="1"><Text variant="label">Resumen del producto</Text><Heading as="h1" size={1}>Buenos días, equipo</Heading><Text tone="muted">Una vista rápida de la actividad y el rendimiento de tu espacio.</Text></Stack><Stack direction="row" align="center" gap="3"><Badge variant="success">Todos los sistemas operativos</Badge><Button variant="secondary" size="sm">Exportar reporte</Button></Stack></Stack>
    <Alert tone="info" title="Tu resumen semanal está listo">El rendimiento mejoró un 14% respecto de la semana pasada. Revisa las métricas para ver qué cambió.</Alert>
    <Grid minColumnWidth="13rem" gap="4">{metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</Grid>
    <Grid minColumnWidth="22rem" gap="4">
      <Card as="section" variant="surface"><CardHeader><div><CardTitle>Objetivo mensual</CardTitle><CardDescription>Adopción de la nueva experiencia</CardDescription></div><CardAction><Badge variant="brand">Agosto</Badge></CardAction></CardHeader><CardContent><Stack gap="5"><Stack direction="row" justify="between" align="end"><Stack gap="1"><Text size="lg" weight="medium">72%</Text><Text size="sm" tone="muted">de 10,000 usuarios</Text></Stack><Text tone="muted">7,240 / 10,000</Text></Stack><Progress label="Progreso mensual" value={72} /><Separator /><DescriptionList layout="horizontal"><DescriptionListTerm>Proyección</DescriptionListTerm><DescriptionListDetails>10,860 usuarios</DescriptionListDetails><DescriptionListTerm>Ritmo actual</DescriptionListTerm><DescriptionListDetails>+18.4% semanal</DescriptionListDetails></DescriptionList></Stack></CardContent><CardFooter><Button size="sm">Ver detalles del objetivo</Button></CardFooter></Card>
      <Card as="section" variant="surface"><CardHeader><div><CardTitle>Actividad reciente</CardTitle><CardDescription>Últimos cambios de tu equipo</CardDescription></div><CardAction><Button variant="ghost" size="sm">Ver todo</Button></CardAction></CardHeader><CardContent><Stack gap="4">{activity.map((item) => <Stack key={item.name} direction="row" gap="3" align="center" justify="between"><Stack direction="row" gap="3" align="center"><Avatar name={item.name} size="sm" /><Stack gap="1"><Text size="sm" weight="medium">{item.name}</Text><Text size="sm" tone="muted">{item.action}</Text></Stack></Stack><Text size="sm" tone="muted">{item.time}</Text></Stack>)}</Stack></CardContent><CardFooter><Stack direction="row" align="center" gap="3"><AvatarGroup aria-label="Miembros activos"><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" /><Avatar name="Linus Torvalds" /></AvatarGroup><Text size="sm" tone="muted">12 miembros activos hoy</Text></Stack></CardFooter></Card>
    </Grid>
    <Card as="section" variant="surface"><CardHeader><div><CardTitle>Rendimiento</CardTitle><CardDescription>Seguimiento de tus indicadores clave</CardDescription></div></CardHeader><CardContent><Tabs aria-label="Métricas de rendimiento" variant="line" items={[{ value: "overview", label: "Resumen", content: <PerformanceSummary /> }, { value: "acquisition", label: "Adquisición", content: <PerformanceSummary focus="Adquisición" /> }, { value: "retention", label: "Retención", content: <PerformanceSummary focus="Retención" /> }]} /></CardContent></Card>
  </Stack>;
}

function PerformanceSummary({ focus = "Resumen" }: { focus?: string }) { return <Grid minColumnWidth="16rem" gap="4"><Stack gap="2"><Text variant="label">{focus}</Text><Text size="lg" weight="medium">+24.8%</Text><Text size="sm" tone="muted">Crecimiento en los últimos 30 días</Text></Stack><Stack gap="3"><Progress label="Meta trimestral" value={68} /><Progress label="Calidad de datos" value={94} /></Stack></Grid>; }
