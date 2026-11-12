import { Card, Grid, Text } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

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

const tiles = ["Overview", "Activity", "Revenue", "Conversion", "Retention", "Alerts"];

export const examples: Example[] = [
  ex(
    "Responsive columns",
    `<Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "3", md: "5" }}>
  {items.map((item) => <Card key={item} variant="surface"><Text>{item}</Text></Card>)}
</Grid>`,
    <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "3", md: "5" }}>
      {tiles.map((item) => (
        <Card key={item} variant="surface">
          <Text>{item}</Text>
        </Card>
      ))}
    </Grid>,
    "Start with one column on mobile and add tracks only when the viewport can support them.",
  ),
  ex(
    "Auto-fit cards",
    `<Grid minColumnWidth="14rem" gap="4">
  {items.map((item) => <Card key={item} variant="surface"><Text>{item}</Text></Card>)}
</Grid>`,
    <Grid minColumnWidth="14rem" gap="4">
      {tiles.map((item) => (
        <Card key={item} variant="surface">
          <Text>{item}</Text>
        </Card>
      ))}
    </Grid>,
    "Use auto-fit when the content should determine how many cards fit per row.",
  ),
  ex(
    "Unequal tracks and independent gaps",
    `<Grid columns="minmax(0, 2fr) minmax(14rem, 1fr)" rowGap="6" columnGap="8" align="start">
  <Card variant="surface"><Text>Primary content</Text></Card>
  <Card variant="surface"><Text>Secondary content</Text></Card>
</Grid>`,
    <Grid columns="minmax(0, 2fr) minmax(14rem, 1fr)" rowGap="6" columnGap="8" align="start">
      <Card variant="surface">
        <Text>Primary content</Text>
      </Card>
      <Card variant="surface">
        <Text>Secondary content</Text>
      </Card>
    </Grid>,
    "Use explicit tracks for a main region plus an aside; rowGap and columnGap can differ.",
  ),
  ex(
    "Semantic list grid",
    `<Grid as="ul" columns={{ base: 1, md: 3 }} gap="4">
  <li><Card variant="surface"><Text>First</Text></Card></li>
  <li><Card variant="surface"><Text>Second</Text></Card></li>
  <li><Card variant="surface"><Text>Third</Text></Card></li>
</Grid>`,
    <Grid as="ul" columns={{ base: 1, md: 3 }} gap="4">
      <li>
        <Card variant="surface">
          <Text>First</Text>
        </Card>
      </li>
      <li>
        <Card variant="surface">
          <Text>Second</Text>
        </Card>
      </li>
      <li>
        <Card variant="surface">
          <Text>Third</Text>
        </Card>
      </li>
    </Grid>,
    "The `as` prop preserves list semantics while Grid owns the layout tracks.",
  ),
];
