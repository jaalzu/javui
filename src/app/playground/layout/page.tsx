import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
} from "@/ui";
import { cx } from "@/ui/utils/cx";
import { BreakpointProvider } from "./BreakpointProvider";
import { ExpectedTable } from "./ExpectedTable";
import { LayoutPlayground } from "./LayoutPlayground";
import { LiveIndicator } from "./LiveIndicator";
import type { BreakpointName } from "./breakpoints";
import override from "./override.module.css";
import styles from "./playground.module.css";

export const metadata: Metadata = {
  title: "Layout playground",
  robots: { index: false, follow: false },
};

type Expected = Partial<Record<BreakpointName, string>> & { base: string };

type CaseProps = {
  n: number;
  title: string;
  expected: Expected;
  children: ReactNode;
};

const tones = ["brand", "info", "positive", "warning", "danger", "inverted"] as const;
type Tone = (typeof tones)[number];

/** Colored placeholder with a number, standing in for real content. */
function Box({ n, tone = "brand", className }: { n: number | string; tone?: Tone; className?: string }) {
  return <div className={cx(styles.box, styles[tone], className)}>{n}</div>;
}

function Case({ n, title, expected, children }: CaseProps) {
  return (
    <Card as="section" size="sm" variant="surface" className={styles.caseCard} data-case={n}>
      <CardHeader>
        <CardTitle>
          Case {n}: {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={styles.caseContent}>
        <ExpectedTable caption={`Expected behavior for case ${n}`} expected={expected} />
        <div className={styles.example}>{children}</div>
      </CardContent>
    </Card>
  );
}

function Boxes({ count, offset = 0 }: { count: number; offset?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Box key={i} n={i + 1 + offset} tone={tones[(i + offset) % tones.length]} />
      ))}
    </>
  );
}

function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <span className={styles.legendSwatches} aria-hidden="true">
          {tones.map((tone) => (
            <span key={tone} className={cx(styles.legendSwatch, styles[tone])} />
          ))}
        </span>
        <Text size="sm" tone="muted">
          Colored boxes are placeholders.
        </Text>
      </div>
      <div className={styles.legendItem}>
        <span className={styles.legendDashed} aria-hidden="true" />
        <Text size="sm" tone="muted">
          Dashed border marks the example area.
        </Text>
      </div>
    </div>
  );
}

export default async function LayoutPlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string; case?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === "1";
  const requested = Number(params.case);
  const selected = Number.isInteger(requested) && requested >= 1 && requested <= 16 ? requested : null;
  const show = (n: number) => selected === null || selected === n;

  const cases = (
    <Stack gap="5" className={styles.cases}>
      {show(1) && (
        <Case
          n={1}
          title='Stack direction { base: "column", md: "row" }'
          expected={{ base: "column", md: "row" }}
        >
          <Stack direction={{ base: "column", md: "row" }} gap="3" data-case-stack="1">
            <Boxes count={3} />
          </Stack>
        </Case>
      )}

      {show(2) && (
        <Case n={2} title='Stack gap { base: "3", md: "6" }' expected={{ base: "0.75rem gap", md: "1.5rem gap" }}>
          <Stack gap={{ base: "3", md: "6" }} data-case-stack="2">
            <Boxes count={3} />
          </Stack>
        </Case>
      )}

      {show(3) && (
        <Case
          n={3}
          title="Grid columns={{ base: 1, md: 2, lg: 4 }} with 8 items"
          expected={{ base: "1 column", md: "2 columns", lg: "4 columns" }}
        >
          <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="3" data-case-grid="3">
            <Boxes count={8} />
          </Grid>
        </Case>
      )}

      {show(4) && (
        <Case
          n={4}
          title='Grid minColumnWidth="16rem" with 9 items'
          expected={{ base: "as many 16rem columns as fit" }}
        >
          <Grid minColumnWidth="16rem" gap="3" data-case-grid="4">
            <Boxes count={9} />
          </Grid>
        </Case>
      )}

      {show(5) && (
        <Case
          n={5}
          title='Grid columns={{ base: 1, md: "2fr 1fr" }}'
          expected={{ base: "1 column", md: "2fr 1fr" }}
        >
          <Grid columns={{ base: 1, md: "2fr 1fr" }} gap="3" data-case-grid="5">
            <Boxes count={4} />
          </Grid>
        </Case>
      )}

      {show(6) && (
        <Case
          n={6}
          title='Stack direction={{ md: "row" }} without base'
          expected={{ base: "column (default)", md: "row" }}
        >
          <Stack direction={{ md: "row" }} gap="3" data-case-stack="6">
            <Boxes count={3} />
          </Stack>
        </Case>
      )}

      {show(7) && (
        <Case
          n={7}
          title="Grid columns={{ lg: 3 }} without base"
          expected={{ base: "1 column (default)", lg: "3 columns" }}
        >
          <Grid columns={{ lg: 3 }} gap="3" data-case-grid="7">
            <Boxes count={6} />
          </Grid>
        </Case>
      )}

      {show(8) && (
        <Case
          n={8}
          title="Container sizes sm, md, lg, xl"
          expected={{
            base: "all fit the viewport",
            md: "sm and md are narrower",
            lg: "sm, md and lg are narrower",
            xl: "all sizes are distinct",
          }}
        >
          <Stack gap="2">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <Container key={size} size={size} className={styles.visibleContainer} data-case-container={size}>
                <Text size="sm">{size} container</Text>
              </Container>
            ))}
          </Stack>
        </Case>
      )}

      {show(9) && (
        <Case
          n={9}
          title='Container padding="0" next to the default'
          expected={{ base: "default inset, zero inset" }}
        >
          <Stack gap="3">
            <Container size="sm" className={styles.visibleContainer} data-case-container="padding-default">
              <Text size="sm">Default padding (space 6)</Text>
            </Container>
            <Container size="sm" padding="0" className={styles.visibleContainer} data-case-container="padding-0">
              <Text size="sm">padding=&quot;0&quot;</Text>
            </Container>
          </Stack>
        </Case>
      )}

      {show(10) && (
        <Case
          n={10}
          title="Full-width section with a Container inside"
          expected={{ base: "section background spans the example", lg: "content clamps at sm" }}
        >
          <section className={styles.fullWidthSection} data-case-section="10">
            <Container size="sm">
              <Box n="container" tone="brand" />
            </Container>
          </section>
        </Case>
      )}

      {show(11) && (
        <Case
          n={11}
          title="className override and inline style override"
          expected={{ base: "default 1rem, className 2rem, inline 3rem" }}
        >
          <Stack gap="4">
            <Stack gap="4" data-case-stack="11-default">
              {["default gap 4 · 1", "default gap 4 · 2", "default gap 4 · 3"].map((label, i) => (
                <Box key={label} n={label} tone={tones[i % tones.length]} />
              ))}
            </Stack>
            <Stack gap="4" className={override.gapOverride} data-case-stack="11-class">
              {["className 2rem · 1", "className 2rem · 2", "className 2rem · 3"].map((label, i) => (
                <Box key={label} n={label} tone={tones[(i + 1) % tones.length]} />
              ))}
            </Stack>
            <Stack gap="4" style={{ gap: "3rem" }} data-case-stack="11-inline">
              {["inline style 3rem · 1", "inline style 3rem · 2", "inline style 3rem · 3"].map((label, i) => (
                <Box key={label} n={label} tone={tones[(i + 2) % tones.length]} />
              ))}
            </Stack>
          </Stack>
        </Case>
      )}

      {show(12) && (
        <Case
          n={12}
          title='Stack as="ul" with li children'
          expected={{ base: "no bullets, role=list" }}
        >
          <Stack as="ul" gap="2" data-case-stack="12">
            {[1, 2, 3].map((n) => (
              <li key={n}>
                <Box n={n} tone={tones[n % tones.length]} />
              </li>
            ))}
          </Stack>
        </Case>
      )}

      {show(13) && (
        <Case
          n={13}
          title="Realistic page: header, sidebar, cards, footer"
          expected={{
            base: "stacked, 1 card per row",
            sm: "stacked, more cards per row",
            lg: "sidebar + content",
          }}
        >
          <div className={styles.pageMock} data-case-page="13">
            <header className={styles.pageHeader}>
              <Text weight="medium">Acme workspace</Text>
            </header>
            <Grid columns={{ base: 1, lg: "16rem 1fr" }} gap="4">
              <aside className={styles.sidebar}>
                <Text size="sm" tone="muted">
                  Sidebar
                </Text>
                <Stack gap="2">
                  <Box n="Nav 1" tone="info" className={styles.mockNav} />
                  <Box n="Nav 2" tone="info" className={styles.mockNav} />
                  <Box n="Nav 3" tone="info" className={styles.mockNav} />
                </Stack>
              </aside>
              <Grid minColumnWidth="12rem" gap="3">
                {[1, 2, 3, 4].map((n) => (
                  <Card key={n} size="sm" variant="outline" className={styles.mockCard}>
                    <CardHeader>
                      <CardTitle as="h4" size={6}>
                        Project {n}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm" tone="muted">
                        A short description for this project card.
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
            <footer className={styles.pageFooter}>
              <Text size="sm" tone="muted">
                Footer
              </Text>
            </footer>
          </div>
        </Case>
      )}

      {show(14) && (
        <Case
          n={14}
          title="Responsive toolbar"
          expected={{ base: "column, title above buttons", md: "row, space between" }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="between"
            align="center"
            gap="3"
            className={styles.toolbarDemo}
            data-case-stack="14"
          >
            <Text weight="medium">Filters</Text>
            <Stack direction="row" gap="2" wrap>
              <Button size="sm" variant="secondary">
                Reset
              </Button>
              <Button size="sm">Apply</Button>
            </Stack>
          </Stack>
        </Case>
      )}

      {show(15) && (
        <Case
          n={15}
          title="Grid inside Stack inside Container"
          expected={{ base: "1 column, no overflow", sm: "3 columns, no overflow" }}
        >
          <Container size="md" className={styles.nestedContainer} data-case-container="nested">
            <Stack gap="3" data-case-stack="15">
              <Grid columns={{ base: 1, sm: 3 }} gap="2" data-case-grid="15">
                <Boxes count={9} />
              </Grid>
              <Box n="Below the grid" tone="positive" />
            </Stack>
          </Container>
        </Case>
      )}

      {show(16) && (
        <Case n={16} title="Long content stress" expected={{ base: "wraps, no overflow" }}>
          <Stack gap="3" data-case-stack="16">
            <Grid columns={{ base: 1, md: 2 }} gap="3" data-case-grid="16">
              <Card size="sm" variant="outline">
                <CardContent>
                  <Text className={styles.stressText}>
                    Supercalifragilisticexpialidocious-Supercalifragilisticexpialidocious-Supercalifragilisticexpialidocious
                  </Text>
                </CardContent>
              </Card>
              <Card size="sm" variant="outline">
                <CardContent>
                  <Text className={styles.stressText}>
                    Long text that keeps going to check wrapping inside a grid cell without pushing the track
                    wider than the available space. It repeats: long text, long text, long text, long text.
                  </Text>
                </CardContent>
              </Card>
            </Grid>
            <Text className={styles.stressText}>
              Anotherverylongunbrokenwordthatmustnotpushthestackchildwiderthantheviewport
            </Text>
          </Stack>
        </Case>
      )}
    </Stack>
  );

  if (isEmbed) {
    return (
      <BreakpointProvider>
        <Container size="xl" className={styles.embedPage}>
          <LiveIndicator />
          {cases}
        </Container>
      </BreakpointProvider>
    );
  }

  return (
    <Container size="xl" className={styles.page}>
      <Stack gap="3">
        <Heading as="h1" size={2}>
          Layout playground
        </Heading>
        <Text tone="muted">
          Internal page to verify the responsive Stack, Grid and Container. Not part of the public docs.
        </Text>
        <Legend />
        <LayoutPlayground />
        {cases}
      </Stack>
    </Container>
  );
}
