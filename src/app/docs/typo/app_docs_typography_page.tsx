import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Heading, Tabs, Text } from "@/ui";
import type { HeadingSize } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";
import s from "./typography.module.css";

export const metadata: Metadata = { title: "Typography" };

const fox = "The quick brown fox jumps over the lazy dog";

function Row({ name, token, children }: { name: string; token: string; children: ReactNode }) {
  return (
    <div className={s.row}>
      <div className={s.meta}>
        <span className={s.name}>{name}</span>
        <span className={s.token}>{token}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

const families = [
  { name: "DM Sans", token: "--font-family-sans", family: "var(--font-family-sans)", style: "normal", use: "Everything: headings, body, labels, captions and controls.", weights: [["Regular", 400], ["Medium", 500], ["Semibold", 600]] },
  { name: "Commit Mono", token: "--font-family-mono", family: "var(--font-family-mono)", style: "normal", use: "Code, tokens and keyboard keys. Nothing else.", weights: [["Regular", 400], ["Medium", 500], ["Semibold", 600]] },
  { name: "Newsreader", token: "--font-family-emphasis", family: "var(--font-family-emphasis)", style: "italic", use: "Rarely. One lead sentence or a short quote per page. Never headings, controls or long text.", weights: [["Regular", 400]] },
] as const;

const headings: { n: HeadingSize; px: number; min: number }[] = [
  { n: 1, px: 56, min: 36 }, { n: 2, px: 44, min: 32 }, { n: 3, px: 36, min: 28 },
  { n: 4, px: 28, min: 24 }, { n: 5, px: 24, min: 20 }, { n: 6, px: 20, min: 18 },
];

const weights = ["regular", "medium", "semibold"] as const;
const tones = [
  ["default", "primary-foreground"], ["muted", "secondary-foreground"], ["subtle", "tertiary-foreground"], ["brand", "brand-foreground"],
  ["success", "positive-foreground"], ["warning", "warning-foreground"], ["info", "info-foreground"], ["danger", "danger-foreground"],
] as const;

function FontFamilies() {
  return (
    <>
      <p className={s.intro}>One sans family for the interface, one mono family for code, and a serif that you will rarely use.</p>
      {families.map((f) => (
        <div key={f.token} className={s.card}>
          <div className={s.cardHead}>
            <Heading as="h3" size={6}>{f.name}</Heading>
            <span className={s.token}>{f.token}</span>
          </div>
          <Text tone="muted" size="sm">{f.use}</Text>
          <p className={s.big} style={{ fontFamily: f.family, fontStyle: f.style }}>Aa Bb Cc 0123456789</p>
          {f.weights.map(([label, w]) => (
            <p key={label} className={s.fox} style={{ fontFamily: f.family, fontStyle: f.style, fontWeight: w }}>
              {fox} <span className={s.token}>{label} {w}</span>
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

function Headings() {
  return (
    <>
      <p className={s.intro}>Headings are always upright and semibold by default. The element sets the outline and <code>size</code> sets the look. Sizes shrink on small screens and grow smoothly in between.</p>
      <div>
        {headings.map(({ n, px, min }) => (
          <Row key={n} name={`Heading ${n}`} token={`size={${n}}`}>
            <Heading as="h3" size={n}>Heading {n}</Heading>
            <span className={s.token}>{px}px on desktop, {min}px on phones</span>
          </Row>
        ))}
      </div>
      <Heading as="h3" size={5} className={s.sub}>Weights</Heading>
      <div>
        {weights.map((w) => (
          <Row key={w} name={w[0].toUpperCase() + w.slice(1)} token={`weight="${w}"`}>
            <Heading as="h3" size={4} weight={w}>{fox}</Heading>
          </Row>
        ))}
      </div>
      <p>There is no light. To soften a heading use a muted color, not a thinner weight.</p>
    </>
  );
}

function TextTab() {
  return (
    <>
      <p className={s.intro}>Body text for paragraphs and interface copy. Three sizes, three weights.</p>
      <Heading as="h3" size={5}>Sizes</Heading>
      <div>
        <Row name="Large" token='size="lg" · 18px'><Text size="lg">Large body text. {fox}.</Text></Row>
        <Row name="Base" token='size="base" · 15px'><Text>Base body text. {fox}.</Text></Row>
        <Row name="Small" token='size="sm" · 13px'><Text size="sm">Small body text. {fox}.</Text></Row>
      </div>
      <Heading as="h3" size={5} className={s.sub}>Weights</Heading>
      <div>
        {weights.map((w) => (
          <Row key={w} name={w[0].toUpperCase() + w.slice(1)} token={`weight="${w}"`}><Text weight={w}>{fox}.</Text></Row>
        ))}
      </div>
      <p>There is no light weight. Use <code>tone=&quot;muted&quot;</code> or <code>tone=&quot;subtle&quot;</code> for quieter text, and never for required information.</p>
    </>
  );
}

function CaptionTab() {
  return (
    <>
      <p className={s.intro}>Small text for helper text, metadata and tooltips. Keep it short.</p>
      <Heading as="h3" size={5}>Sizes</Heading>
      <div>
        <Row name="Large" token='size="lg" · 12px'><Text variant="caption" size="lg">Large caption. {fox}.</Text></Row>
        <Row name="Base" token='size="base" · 11px'><Text variant="caption">Base caption. {fox}.</Text></Row>
        <Row name="Small" token='size="sm" · 10px'><Text variant="caption" size="sm">Small caption. {fox}.</Text></Row>
      </div>
      <Heading as="h3" size={5} className={s.sub}>Weights</Heading>
      <div>
        {weights.map((w) => (
          <Row key={w} name={w[0].toUpperCase() + w.slice(1)} token={`weight="${w}"`}><Text variant="caption" size="lg" weight={w}>{fox}.</Text></Row>
        ))}
      </div>
      <Heading as="h3" size={5} className={s.sub}>Casing</Heading>
      <div>
        <Row name="Normal" token='casing="normal"'><Text variant="caption" size="lg">Caption in normal case</Text></Row>
        <Row name="Uppercase" token='casing="uppercase"'><Text variant="caption" size="lg" weight="medium" casing="uppercase">Caption in uppercase</Text></Row>
      </div>
      <p>Use uppercase for short labels of two or three words, like a group title. Never for sentences.</p>
    </>
  );
}

function CodeTab() {
  return (
    <>
      <p className={s.intro}>Inline code in Commit Mono. Three sizes, and a color when the meaning needs it.</p>
      <Heading as="h3" size={5}>Sizes</Heading>
      <div>
        <Row name="Base" token='size="base" · 14px'><Text variant="code">const theme = &quot;dark&quot;;</Text></Row>
        <Row name="Small" token='size="sm" · 13px'><Text variant="code" size="sm">const theme = &quot;dark&quot;;</Text></Row>
        <Row name="Extra small" token='size="xs" · 12px'><Text variant="code" size="xs">const theme = &quot;dark&quot;;</Text></Row>
      </div>
      <Heading as="h3" size={5} className={s.sub}>Colors</Heading>
      <div>
        {tones.map(([t, token]) => (
          <Row key={t} name={t[0].toUpperCase() + t.slice(1)} token={`tone="${t}"`}><Text variant="code" tone={t}>--color-{token}</Text></Row>
        ))}
      </div>
      <p>Color is optional and only reinforces a meaning that is already in the text, like an error code in <code>danger</code>. Code samples with several lines go in <code>CodeBlock</code>.</p>
    </>
  );
}

export default function Typography() {
  return (
    <DocPage href="/docs/typography" title="Typography" description="DM Sans for the interface, a mono for code, and a serif you will rarely use.">
      <Tabs
        aria-label="Typography sections"
        items={[
          { value: "families", label: "Font families", content: <FontFamilies /> },
          { value: "headings", label: "Headings", content: <Headings /> },
          { value: "text", label: "Text", content: <TextTab /> },
          { value: "caption", label: "Caption", content: <CaptionTab /> },
          { value: "code", label: "Code", content: <CodeTab /> },
        ]}
      />
    </DocPage>
  );
}
