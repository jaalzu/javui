import type { Metadata } from "next";
import { Heading, Table } from "@/ui";
import { CodeBlock } from "@/ui/server";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Theming" };

const override = `:root { --color-brand-solid: oklch(0.55 0.2 260); }`;

const radius = `:root { --radius-base: 0.625rem; }`;

const lock = `<html lang="en" data-theme="dark">`;

export default function Theming() {
  return (
    <DocPage href="/docs/theming" title="Theming" description="Components never contain colors. They read semantic tokens, and the theme decides what those tokens mean.">

      <Heading as="h2" size={6}>How light and dark work</Heading>
      <p>Tokens live as JSON in <code>src/ui/tokens</code> and are compiled to <code>tokens.css</code>. The same semantic names exist in both themes. <code>next-themes</code> sets <code>data-theme=&quot;light&quot;</code> or <code>&quot;dark&quot;</code> on <code>html</code>. With no choice made, the operating system preference applies.</p>

      <Heading as="h2" size={6}>Semantic tokens</Heading>
      <Table
        caption="Colors you will use most"
        columns={[{ key: "token", header: "Token" }, { key: "use", header: "Use" }]}
        rows={[
          { token: <code>--color-page</code>, use: "Page background." },
          { token: <code>--color-card</code>, use: "Cards, panels and table rows on the page." },
          { token: <code>--color-component</code>, use: "Control background: inputs, secondary buttons and toggles." },
          { token: <code>--color-primary-foreground</code>, use: "Primary text." },
          { token: <code>--color-secondary-foreground</code>, use: "Secondary text." },
          { token: <code>--color-border-default</code>, use: "Soft dividers and card edges." },
          { token: <code>--color-border-strong</code>, use: "Edges of interactive controls." },
          { token: <><code>--color-inverted-solid</code> and <code>--color-on-inverted-foreground</code></>, use: "Primary button, checkbox, radio and switch: black on white, white on black." },
          { token: <code>--color-danger-solid</code>, use: "Destructive actions and errors." },
          { token: <code>--color-brand-border-focus</code>, use: "Focus ring. Stays text-colored for contrast." },
          { token: <code>--color-brand-solid</code>, use: "Your brand. Change this one to rebrand the library." },
        ]}
      />

      <p>The focus ring uses the text color on purpose, so it always keeps 3:1 contrast regardless of the brand color.</p>

      <Heading as="h2" size={6}>Token convention</Heading>
      <p>Every tone follows the same suffixes, so a token name tells you what it is for.</p>
      <p>Neutral tokens (<code>page</code>, <code>card</code>, <code>sunken</code>, <code>modal</code>, <code>component</code>, <code>border-*</code>) do not follow the tone suffixes.</p>
      <Table
        caption="Suffixes and what they mean"
        columns={[{ key: "suffix", header: "Suffix" }, { key: "use", header: "Use" }]}
        rows={[
          { suffix: <code>X-solid</code>, use: "A filled surface for that tone, such as a primary action or a strong message." },
          { suffix: <code>on-X-solid-foreground</code>, use: "Text and icons placed on top of X-solid." },
          { suffix: <code>X-subtle</code>, use: "A soft tint of the tone, used behind X-foreground." },
          { suffix: <code>X-foreground</code>, use: "Text and icons of that tone on the page or a card." },
          { suffix: <code>X-border-default</code>, use: "The border that belongs to that tone." },
        ]}
      />

      <Heading as="h2" size={6}>Rebrand with one variable</Heading>
      <p>The brand color tokens derive from <code>--color-brand-solid</code> with <code>color-mix</code>, so this single override changes accent buttons, links, selected states, subtle tints and brand borders together. The focus ring stays text-colored on purpose.</p>
      <CodeBlock language="css" label="One-line rebrand" code={override} />
      <p>To use a different value per theme, override it again under <code>[data-theme=&quot;dark&quot;]</code>.</p>
      <p>After changing brand colors, run <code>bun run contrast</code> to check text contrast.</p>
      <p><code>--color-brand-foreground</code> mixes the brand with the primary text color, which keeps it readable on both page and card in light and dark. <code>--color-on-brand-solid-foreground</code> stays white because it is the text on top of the solid brand surface.</p>

      <Heading as="h2" size={6}>Radius with one variable</Heading>
      <p>The radius scale derives from <code>--radius-base</code>: <code>sm</code> is 0.5x, <code>md</code> is 1x, <code>lg</code> is 1.5x and <code>xl</code> is 2x. The default base is 0.5rem, which gives 4, 8, 12 and 16px. Nested-radius formulas keep working because they read the same scale.</p>
      <CodeBlock language="css" label="One-line radius change" code={radius} />

      <Heading as="h2" size={6}>Force a theme</Heading>
      <CodeBlock language="tsx" label="Fixed dark theme" code={lock} />
      <p>Without <code>data-theme</code>, the operating system preference applies.</p>
    </DocPage>
  );
}
