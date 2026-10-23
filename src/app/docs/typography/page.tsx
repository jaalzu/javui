import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Heading, Tabs, Text } from "@/ui";
import type { HeadingSize } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";
import s from "./typography.module.css";

export const metadata: Metadata = { title: "Typography" };

const fox = "The quick brown fox jumps over the lazy dog";

function Group({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className={s.group}>
      {label ? <h2 className={s.label}>{label}</h2> : null}
      <div className={s.box}>{children}</div>
    </section>
  );
}

function Row({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div className={s.row}>
      <div className={s.sample}>{children}</div>
      <span className={s.token}>{token}</span>
    </div>
  );
}

const cap = (w: string) => w[0].toUpperCase() + w.slice(1);
const weights = ["regular", "medium", "semibold"] as const;

const families: {
  name: string;
  note: string;
  style: CSSProperties;
  rows: { text: string; token: string; weight: number }[];
}[] = [
  {
    name: "DM Sans",
    note: "Headings, body, labels and controls.",
    style: { fontFamily: "var(--font-family-sans)" },
    rows: [
      { text: fox, token: "--font-weight-regular", weight: 400 },
      { text: fox, token: "--font-weight-medium", weight: 500 },
      { text: fox, token: "--font-weight-semibold", weight: 600 },
    ],
  },
  {
    name: "Commit Mono",
    note: "Code and keyboard keys.",
    style: { fontFamily: "var(--font-family-mono)" },
    rows: [{ text: fox, token: "--font-weight-regular", weight: 400 }],
  },
  {
    name: "Source Serif 4",
    note: "Rarely. One lead sentence or a short quote.",
    style: { fontFamily: "var(--font-family-emphasis)", fontStyle: "italic" },
    rows: [{ text: fox, token: "--font-weight-regular", weight: 400 }],
  },
];

const headings: { n: HeadingSize; px: number; line: number }[] = [
  { n: 1, px: 56, line: 1.05 },
  { n: 2, px: 44, line: 1.1 },
  { n: 3, px: 36, line: 1.15 },
  { n: 4, px: 28, line: 1.2 },
  { n: 5, px: 24, line: 1.25 },
  { n: 6, px: 20, line: 1.3 },
];

const tones = [
  ["default", "Default"],
  ["brand", "Brand"],
  ["success", "Success"],
  ["warning", "Warning"],
  ["info", "Info"],
  ["danger", "Danger"],
] as const;

function FontFamilies() {
  return (
    <>
      {families.map((f) => (
        <section key={f.name} className={s.group}>
          <div className={s.family}>
            <Heading as="h2" size={5} className={s.familyName}>
              {f.name}
            </Heading>
            <p className={s.familyNote}>{f.note}</p>
          </div>
          <div className={s.box}>
            {f.rows.map((r) => (
              <Row key={r.token} token={r.token}>
                <p
                  className={s.sample}
                  style={{
                    ...f.style,
                    fontWeight: r.weight,
                    fontSize: "var(--font-size-18)",
                  }}
                >
                  {r.text}
                </p>
              </Row>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function Headings() {
  return (
    <>
      <Group label="Sizes">
        {headings.map(({ n, px, line }) => (
          <Row key={n} token={`size={${n}} · ${px}px · line ${line}`}>
            <Heading as="h3" size={n}>
              Heading {n}
            </Heading>
          </Row>
        ))}
      </Group>
      <Group label="Weights">
        {weights.map((w) => (
          <Row key={w} token={`weight="${w}"`}>
            <Heading as="h3" size={4} weight={w}>
              {cap(w)}
            </Heading>
          </Row>
        ))}
      </Group>
    </>
  );
}

function TextTab() {
  return (
    <>
      <Group label="Sizes">
        <Row token='size="lg" · 18px · line 1.6'>
          <Text size="lg">Large body text</Text>
        </Row>
        <Row token='size="base" · 15px · line 1.6'>
          <Text>Base body text</Text>
        </Row>
        <Row token='size="sm" · 13px · line 1.5'>
          <Text size="sm">Small body text</Text>
        </Row>
      </Group>
      <Group label="Small styles">
        <Row token='variant="label" · controls and fields'>
          <Text variant="label">Account settings</Text>
        </Row>
        <Row token='size="sm" · secondary reading text'>
          <Text size="sm">A description or helper text that supports the main content.</Text>
        </Row>
        <Row token='variant="caption" · metadata'>
          <Text variant="caption" size="lg">2 min ago · 1,284 views</Text>
        </Row>
      </Group>
      <Text variant="caption" size="lg" tone="muted">
        Label for controls and fields (buttons, form labels, tabs). Body-sm for secondary reading
        text (descriptions, helper text). Caption for metadata (timestamps, counters, footnotes).
      </Text>
      <Group label="Weights">
        {weights.map((w) => (
          <Row key={w} token={`weight="${w}"`}>
            <Text weight={w}>{cap(w)}</Text>
          </Row>
        ))}
      </Group>
      <Group label="Numbers">
        <Row token="data-numeric">
          <Text data-numeric>1,284 · $1,211.29 · 86%</Text>
        </Row>
      </Group>
      <Text variant="caption" size="lg" tone="muted">
        Use data-numeric on any element that shows changing numbers so digits keep their width.
      </Text>
    </>
  );
}

function CaptionTab() {
  return (
    <>
      <Group label="Sizes">
        <Row token='size="lg" · 12px · line 1.4'>
          <Text variant="caption" size="lg">
            Large caption
          </Text>
        </Row>
        <Row token='size="base" · 11px · line 1.4'>
          <Text variant="caption">Base caption</Text>
        </Row>
        <Row token='size="sm" · 10px · line 1.4'>
          <Text variant="caption" size="sm">
            Small caption
          </Text>
        </Row>
      </Group>
      <Group label="Weights">
        {weights.map((w) => (
          <Row key={w} token={`weight="${w}"`}>
            <Text variant="caption" size="lg" weight={w}>
              {cap(w)}
            </Text>
          </Row>
        ))}
      </Group>
      <Group label="Casing">
        <Row token='casing="normal"'>
          <Text variant="caption" size="lg">
            Normal caption
          </Text>
        </Row>
        <Row token='casing="uppercase"'>
          <Text variant="caption" size="lg" weight="medium" casing="uppercase">
            Uppercase caption
          </Text>
        </Row>
        <Row token='size="sm" casing="uppercase"'>
          <Text variant="caption" size="sm" weight="medium" casing="uppercase">
            Small uppercase
          </Text>
        </Row>
      </Group>
      <Text variant="caption" size="lg" tone="muted">
        Caption sm (10px) is intentional: use it with casing=&quot;uppercase&quot;, where the extra
        tracking keeps it legible. Avoid it for lowercase running text.
      </Text>
    </>
  );
}

function CodeTab() {
  return (
    <>
      <Group label="Sizes">
        <Row token='size="base" · 14px · line 1.5'>
          <Text variant="code">Base code</Text>
        </Row>
        <Row token='size="sm" · 13px · line 1.5'>
          <Text variant="code" size="sm">
            Small code
          </Text>
        </Row>
        <Row token='size="xs" · 12px · line 1.5'>
          <Text variant="code" size="xs">
            Extra small code
          </Text>
        </Row>
      </Group>
      <Group label="Colors">
        {tones.map(([t, label]) => (
          <Row key={t} token={`tone="${t}"`}>
            <Text variant="code" tone={t}>
              {label}
            </Text>
          </Row>
        ))}
      </Group>
    </>
  );
}

export default function Typography() {
  return (
    <DocPage href="/docs/typography" title="Typography">
      <Tabs
        aria-label="Typography sections"
        items={[
          {
            value: "families",
            label: "Font families",
            content: <FontFamilies />,
          },
          { value: "headings", label: "Headings", content: <Headings /> },
          { value: "text", label: "Text", content: <TextTab /> },
          { value: "caption", label: "Caption", content: <CaptionTab /> },
          { value: "code", label: "Code", content: <CodeTab /> },
        ]}
      />
    </DocPage>
  );
}
