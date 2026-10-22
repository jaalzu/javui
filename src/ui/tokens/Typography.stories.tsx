import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import styles from "./Typography.module.css";

/**
 * Typography tokens. One sans family (DM Sans) for everything and one mono family
 * (Commit Mono) for code. Headings and body text are upright; a serif (Source Serif 4)
 * is available for emphasis.
 *
 * Text styles are the only way to set type: every style is a set of CSS variables
 * named `--text-<style>-<property>` (size, line, weight, tracking, style, family).
 */
const meta = {
  title: "Foundations/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const textStyles = [
  { name: "heading-1", sample: "Interfaces that explain themselves", note: "Hero headline. Fluid." },
  { name: "heading-2", sample: "Page title for the whole screen", note: "Fluid." },
  { name: "heading-3", sample: "Section title that groups content", note: "Fluid." },
  { name: "heading-4", sample: "Subsection title", note: "Fluid." },
  { name: "heading-5", sample: "Small group title", note: "" },
  { name: "heading-6", sample: "Smallest group title", note: "" },
  { name: "body-lg", sample: "Lead paragraph. Larger body text for introductions and summaries.", note: "" },
  { name: "body", sample: "Default paragraph text. Quick brown foxes jump over lazy dogs, and the line height keeps long reading comfortable.", note: "" },
  { name: "body-sm", sample: "Smaller supporting text for dense interfaces and secondary content.", note: "" },
  { name: "label", sample: "Form label or control text", note: "" },
  { name: "caption-lg", sample: "Large caption, helper text and metadata", note: "" },
  { name: "caption", sample: "Base caption, helper text and metadata", note: "" },
  { name: "caption-sm", sample: "Small caption and metadata", note: "" },
  { name: "emphasis", sample: "A serif line that deserves attention", note: "Serif italic." },
  { name: "code", sample: "const theme = document.documentElement.dataset.theme;", note: "Mono." },
] as const;

const sizes = ["10", "11", "12", "13", "14", "15", "18", "20", "24", "28", "36", "44", "56"] as const;

function styleFor(name: string): CSSProperties {
  return {
    fontFamily: `var(--text-${name}-family)`,
    fontSize: `var(--text-${name}-size)`,
    lineHeight: `var(--text-${name}-line)`,
    fontWeight: `var(--text-${name}-weight)` as unknown as number,
    letterSpacing: `var(--text-${name}-tracking)`,
    ...(name.startsWith("heading") ? {} : { fontStyle: `var(--text-${name}-style)` }),
  };
}

function Page() {
  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>Typography</h1>
        <p className={styles.lead}>
          One sans family for everything, mono only for code. Headings and body are upright. Source Serif 4 is for emphasis only.
        </p>
      </header>

      <section aria-labelledby="families">
        <h2 id="families" className={styles.sectionTitle}>Families</h2>
        <p className={styles.note}>
          DM Sans for all text, Source Serif 4 for emphasis, Commit Mono for code and keys. All are self-hosted
          from <code>public/typography</code>, so there is no network request to a font service.
        </p>
        <div className={styles.families}>
          <div className={styles.card}>
            <p className={styles.meta}>
              <span className={styles.metaName}>Sans</span>
              <span className={styles.code}>--font-family-sans</span>
            </p>
            <p className={styles.glyphs}>Aa Bb Cc 0123456789 &amp;?!</p>
          </div>
          <div className={styles.card}>
            <p className={styles.meta}>
              <span className={styles.metaName}>Emphasis</span>
              <span className={styles.code}>--font-family-emphasis</span>
            </p>
            <p className={styles.glyphs} style={{ fontFamily: "var(--font-family-emphasis)", fontStyle: "italic" }}>
              Aa Bb Cc 0123456789
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.meta}>
              <span className={styles.metaName}>Mono</span>
              <span className={styles.code}>--font-family-mono</span>
            </p>
            <p className={`${styles.glyphs} ${styles.mono}`}>Aa Bb Cc 0123456789 {"{ }"} =&gt;</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="weights">
        <h2 id="weights" className={styles.sectionTitle}>Weights</h2>
        <ul className={styles.weights}>
          {(["regular", "medium", "semibold"] as const).map((w) => (
            <li key={w} style={{ fontWeight: `var(--font-weight-${w})` as unknown as number }}>
              {w}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="scale">
        <h2 id="scale" className={styles.sectionTitle}>Size scale</h2>
        <p className={styles.note}>Every font size in the system, named by its pixel value. Used through text styles, not directly.</p>
        {sizes.map((s) => (
          <div className={styles.row} key={s}>
            <p className={styles.meta}>
              <span className={styles.metaName}>{s}</span>
              <span className={styles.code}>--font-size-{s}</span>
            </p>
            <p className={styles.sample} style={{ fontSize: `var(--font-size-${s})`, lineHeight: 1.2 }}>
              Sphinx of black quartz
            </p>
          </div>
        ))}
      </section>

      <section aria-labelledby="styles">
        <h2 id="styles" className={styles.sectionTitle}>Text styles</h2>
        <p className={styles.note}>
          Each style exposes <span className={styles.code}>--text-&lt;name&gt;-size</span>,{" "}
          <span className={styles.code}>-line</span>, <span className={styles.code}>-weight</span>,{" "}
          <span className={styles.code}>-tracking</span>, <span className={styles.code}>-style</span> and{" "}
          <span className={styles.code}>-family</span>.
        </p>
        {textStyles.map((t) => (
          <div className={styles.row} key={t.name}>
            <p className={styles.meta}>
              <span className={styles.metaName}>{t.name}</span>
              {t.note}
            </p>
            <p className={styles.sample} style={styleFor(t.name)}>
              {t.sample}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const Overview: Story = {
  render: () => <Page />,
};

/** Same page forced to dark so the a11y test also checks contrast in the dark theme. */
export const Dark: Story = {
  render: () => <Page />,
  globals: { theme: "dark" },
};

export const Light: Story = {
  render: () => <Page />,
  globals: { theme: "light" },
};
