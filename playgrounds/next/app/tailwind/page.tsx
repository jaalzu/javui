import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Container,
  CardTitle,
  Heading,
  Progress,
  Stack,
  Text,
} from "@javui/ui";
import "./tailwind.css";

export default function TailwindPage() {
  return <Container size="lg" gutter="4"><Stack gap="6">
    <div className="flex items-center justify-between gap-4"><div><Heading as="h1">Workspace overview</Heading><Text tone="muted">A small consumer screen styled with JavUI token utilities.</Text></div><Badge variant="success">Healthy</Badge></div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card variant="surface" className="p-6"><CardHeader><CardTitle>Monthly progress</CardTitle></CardHeader><CardContent><Stack gap="4"><Progress label="Release readiness" value={78} /><Text tone="muted">Spacing, colors and typography come from the Tailwind token bridge.</Text></Stack></CardContent></Card>
      <Card variant="surface" className="p-6"><CardHeader><CardTitle>Quick action</CardTitle></CardHeader><CardContent><Stack gap="4"><Text tone="muted">The component API and utility classes can live together in the same consumer.</Text><Button>Continue setup</Button></Stack></CardContent></Card>
    </div>
  </Stack></Container>;
}
