import { Card, CardContent, CardHeader, CardTitle, Heading, Link, Stack, Text } from "@javui/ui";

const scenarios = [
  ["/", "1. Básico", "Tokens y componentes de JavUI en una app mínima."],
  ["/tailwind", "2. Tailwind", "Tokens de JavUI usados como utilidades en una pantalla real."],
] as const;

export default function Home() {
  return <Stack gap="6">
    <div><Heading as="h1">Consumer checks</Heading><Text tone="muted">Tres pruebas pequeñas para validar una instalación real.</Text></div>
    <Stack gap="3">{scenarios.map(([href, title, description]) => <Card key={href} variant="surface"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><Stack gap="3"><Text tone="muted">{description}</Text><Link href={href} standalone>Open test</Link></Stack></CardContent></Card>)}</Stack>
  </Stack>;
}
