import { Alert, Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Heading, Link, Stack, Text } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import ClientShowcase from "./client-showcase";

export default function Home() {
  return <Stack gap="6">
    <Heading as="h1">JavUI consumer</Heading>
    <Text>Server Components can import the public package.</Text>
    <CodeBlock language="tsx" code={'import { Stack, Text } from "@javui/ui";'} />
    <Card variant="surface">
      <CardHeader><CardTitle>Published package</CardTitle><CardDescription>A small server-rendered release overview.</CardDescription></CardHeader>
      <CardContent><Stack gap="3"><Badge variant="brand">0.0.0</Badge><Alert title="Ready to explore">Choose a section to exercise the published components.</Alert></Stack></CardContent>
      <CardFooter><Link href="/forms" standalone>Open the form showcase</Link></CardFooter>
    </Card>
    <ClientShowcase />
  </Stack>;
}
