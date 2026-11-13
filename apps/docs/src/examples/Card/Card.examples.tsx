import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  Grid,
  Heading,
  Input,
  Link,
  Skeleton,
  SparkleIcon,
  Stack,
  Table,
  Text,
} from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { defineHero, ex, type Example } from "@/docs/example";
import { CardSizeExample } from "./CardSizeExample";
import styles from "./Card.examples.module.css";

const heroCode = `<Card variant="surface">
  <CardHeader>
    <CardTitle>Release notes</CardTitle>
    <CardDescription>What changed in this version.</CardDescription>
    <CardAction><Badge>New</Badge></CardAction>
  </CardHeader>
  <CardContent>
    <Text>Body content sits between the header and the footer.</Text>
  </CardContent>
  <CardFooter>
    <Link href="#" standalone>View all</Link>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>`;

const heroNode = (
  <Card variant="surface">
    <CardHeader>
      <CardTitle>Release notes</CardTitle>
      <CardDescription>What changed in this version.</CardDescription>
      <CardAction>
        <Badge>New</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Text>Body content sits between the header and the footer.</Text>
    </CardContent>
    <CardFooter>
      <Link href="#" standalone>
        View all
      </Link>
      <Button size="sm">Open</Button>
    </CardFooter>
  </Card>
);

const loginCode = `<div className={styles.login}>
  <Card as="article" variant="surface">
    <CardHeader>
      <CardTitle>Sign in</CardTitle>
      <CardDescription>Use your work email to continue.</CardDescription>
    </CardHeader>
    <CardContent>
      <Stack gap="4">
        <Field label="Email">
          <Input type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Password">
          <Input type="password" autoComplete="current-password" />
        </Field>
      </Stack>
    </CardContent>
    <CardFooter>
      <Button>Sign in</Button>
      <Link href="#" standalone>Forgot password?</Link>
    </CardFooter>
  </Card>
</div>`;

const loginNode = (
  <div className={styles.login}>
    <Card as="article" variant="surface">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your work email to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="4">
          <Field label="Email">
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <Input type="password" autoComplete="current-password" />
          </Field>
        </Stack>
      </CardContent>
      <CardFooter>
        <Button>Sign in</Button>
        <Link href="#" standalone>
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  </div>
);

export const hero = defineHero(heroCode, heroNode);

/** Prose shown above the examples: the spacing scale behind `--card-spacing`. */
export const extras = (
  <>
    <Heading as="h2" size={6}>
      Spacing
    </Heading>
    <p>
      <code>size</code> covers the common cases. For another inset, set{" "}
      <code>--card-spacing</code> on the card: it controls the padding of the
      parts and the space between sections.
    </p>
    <Table
      caption="Card spacing values"
      columns={[
        { key: "token", header: "Token" },
        { key: "value", header: "Value" },
      ]}
      rows={[
        {
          token: <code>--space-4</code>,
          value: (
            <>
              16px (<code>size=&quot;sm&quot;</code>)
            </>
          ),
        },
        { token: <code>--space-5</code>, value: "20px" },
        { token: <code>--space-6</code>, value: "24px (default)" },
        { token: <code>--space-8</code>, value: "32px" },
      ]}
    />
    <CodeBlock
      language="tsx"
      label="Custom spacing"
      code={`<Card style={{ "--card-spacing": "var(--space-8)" }}>`}
    />
    <p>
      An inline <code>--card-spacing</code> overrides <code>size</code>. Use
      spacing tokens only, never raw pixels.
    </p>
  </>
);

export const examples: Example[] = [
  ex(
    "Login",
    loginCode,
    loginNode,
    "A form in a card: header, fields and a footer with the primary action.",
  ),
  ex(
    "Size",
    `const [size, setSize] = useState("default");

<Stack gap="4">
  <Stack direction="row" gap="2" wrap align="center" role="group" aria-label="Card size">
    <Button size="sm" variant="secondary" aria-pressed={size === "sm"} onClick={() => setSize("sm")}>Small</Button>
    <Button size="sm" variant="secondary" aria-pressed={size === "default"} onClick={() => setSize("default")}>Default</Button>
    <Button size="sm" variant="secondary" aria-pressed={size === "lg"} onClick={() => setSize("lg")}>Large</Button>
  </Stack>
  <Card
    variant="surface"
    size={size === "sm" ? "sm" : "default"}
    style={size === "lg" ? { "--card-spacing": "var(--space-8)" } : undefined}
  >
    <CardHeader>
      <CardTitle>Release notes</CardTitle>
      <CardDescription>What changed in this version.</CardDescription>
      <CardAction><Badge variant="brand">New</Badge></CardAction>
    </CardHeader>
    <CardContent><Text>Body content sits between the header and the footer.</Text></CardContent>
    <CardFooter><Link href="#" standalone>View all</Link></CardFooter>
  </Card>
</Stack>`,
    <CardSizeExample />,
    "Pick an inset: `sm` and the default are card sizes; larger steps set `--card-spacing`.",
  ),
  ex(
    "Optional parts",
    `<Grid minColumnWidth="16rem" gap="4">
  <Card variant="surface">
    <CardContent><Text>Content only, no header.</Text></CardContent>
  </Card>
  <Card variant="surface">
    <CardHeader>
      <CardTitle>Header and content</CardTitle>
      <CardDescription>No footer needed here.</CardDescription>
    </CardHeader>
    <CardContent><Text>Only the parts you need.</Text></CardContent>
  </Card>
</Grid>`,
    <Grid minColumnWidth="16rem" gap="4">
      <Card variant="surface">
        <CardContent>
          <Text>Content only, no header.</Text>
        </CardContent>
      </Card>
      <Card variant="surface">
        <CardHeader>
          <CardTitle>Header and content</CardTitle>
          <CardDescription>No footer needed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Only the parts you need.</Text>
        </CardContent>
      </Card>
    </Grid>,
    "Header, content and footer are optional; a card can start and end anywhere.",
  ),
  ex(
    "With icon",
    `<Card variant="surface">
  <CardHeader>
    <SparkleIcon data-card-media />
    <CardTitle>Weekly summary</CardTitle>
    <CardDescription>Your numbers for the last seven days.</CardDescription>
  </CardHeader>
  <CardContent><Text>A leading media column aligns with the title.</Text></CardContent>
</Card>`,
    <Card variant="surface">
      <CardHeader>
        <SparkleIcon data-card-media />
        <CardTitle>Weekly summary</CardTitle>
        <CardDescription>Your numbers for the last seven days.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>A leading media column aligns with the title.</Text>
      </CardContent>
    </Card>,
    "Mark an icon or avatar with `data-card-media` in the header to get a leading column.",
  ),
  ex(
    "With media",
    `<Card variant="surface">
  <CardHeader>
    <CardTitle>Weekly summary</CardTitle>
    <CardDescription>Your numbers for the last seven days.</CardDescription>
  </CardHeader>
  <CardContent>
      <div className={styles.media} />
  </CardContent>
</Card>`,
    <Card variant="surface">
      <CardHeader>
        <CardTitle>Weekly summary</CardTitle>
        <CardDescription>Your numbers for the last seven days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.media} />
      </CardContent>
    </Card>,
    "A media area sits inside the content, below the header.",
  ),
  ex(
    "Loading",
    `<Card variant="surface" aria-busy="true">
  <CardHeader>
    <CardTitle>Loading card</CardTitle>
    <CardDescription>Placeholders hold the layout while content loads.</CardDescription>
  </CardHeader>
  <CardContent>
    <Stack gap="2">
      <Skeleton />
      <Skeleton />
      <Skeleton width="70%" />
    </Stack>
  </CardContent>
</Card>`,
    <Card variant="surface" aria-busy="true">
      <CardHeader>
        <CardTitle>Loading card</CardTitle>
        <CardDescription>
          Placeholders hold the layout while content loads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="2">
          <Skeleton />
          <Skeleton />
          <Skeleton width="70%" />
        </Stack>
      </CardContent>
    </Card>,
    "Mark the card with `aria-busy` and keep the layout stable with `Skeleton` lines.",
  ),
];
