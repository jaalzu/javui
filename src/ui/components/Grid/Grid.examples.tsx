import { Card, Grid, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Grid columns="repeat(3, 1fr)" gap="3">
  <Card size="sm" variant="surface"><Text variant="caption" size="lg">A</Text></Card>
  <Card size="sm" variant="surface"><Text variant="caption" size="lg">B</Text></Card>
  <Card size="sm" variant="surface"><Text variant="caption" size="lg">C</Text></Card>
</Grid>`,
  <Grid columns="repeat(3, 1fr)" gap="3">
    <Card size="sm" variant="surface">
      <Text variant="caption" size="lg">A</Text>
    </Card>
    <Card size="sm" variant="surface">
      <Text variant="caption" size="lg">B</Text>
    </Card>
    <Card size="sm" variant="surface">
      <Text variant="caption" size="lg">C</Text>
    </Card>
  </Grid>,
);

export const examples: Example[] = [];
