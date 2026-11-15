import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CardTitle,
  Stack,
  Text,
} from "@javui/ui";
import "./tailwind.css";

export default function TailwindPage() {
  return (
    <Container size="lg" gutter="4">
      <Stack gap="6">
        <div className="bg-card text-secondary-foreground p-8">
          <Text>
            Tailwind token utilities resolve from `@javui/ui/tailwind.css`.
          </Text>
          <Button className="mt-6 p-8 rounded-none">
            Button with utilities
          </Button>
        </div>
        <Card variant="surface" className="mt-6 p-8 rounded-none">
          <CardHeader>
            <CardTitle>Card with utilities</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Compare the padding and radius with a plain Card.</Text>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
