import type { Metadata } from "next";
import { Alert, CodeBlock, Heading, Table } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Theming" };

const override = `/* app/globals.css, after importing @/ui/styles/global.css */
:root[data-theme="light"] {
  --color-brand-solid: oklch(0.55 0.2 260);
}`;

const lock = `<html lang="en" data-theme="dark">`;

export default function Theming() {
  return (
    <DocPage href="/docs/theming" title="Theming" description="Components never contain colors. They read semantic tokens, and the theme decides what those tokens mean.">

      <Heading as="h2" size="h3">How light and dark work</Heading>
      <p>Tokens live as JSON in <code>src/ui/tokens</code> and are compiled to <code>tokens.css</code>. The same semantic names exist in both themes. <code>next-themes</code> sets <code>data-theme=&quot;light&quot;</code> or <code>&quot;dark&quot;</code> on <code>html</code>. With no choice made, the operating system preference applies.</p>

      <Heading as="h2" size="h3">Semantic tokens</Heading>
      <Table
        caption="Colors you will use most"
        columns={[{ key: "token", header: "Token" }, { key: "use", header: "Use" }]}
        rows={[
          { token: <code>--color-page</code>, use: "Page background." },
          { token: <code>--color-primary-foreground</code>, use: "Primary text." },
          { token: <code>--color-secondary-foreground</code>, use: "Secondary text." },
          { token: <code>--color-component</code>, use: "Cards and inputs drawn over the background." },
          { token: <code>--color-border-default</code>, use: "Soft dividers and card edges." },
          { token: <code>--color-border-strong</code>, use: "Edges of interactive controls." },
          { token: <><code>--color-inverted-solid</code> and <code>--color-on-inverted-foreground</code></>, use: "Primary button, checkbox, radio and switch: black on white, white on black." },
          { token: <code>--color-danger-solid</code>, use: "Destructive actions and errors." },
          { token: <code>--color-brand-border-focus</code>, use: "Focus ring: the same color as the text, drawn thick." },
          { token: <code>--color-brand-solid</code>, use: "Your brand. Change this one to rebrand the library." },
        ]}
      />

      <Heading as="h2" size="h3">Change a color</Heading>
      <p>Override the token for the theme you want. Components follow, since none of them hardcode a value.</p>
      <CodeBlock language="css" label="Override a token" code={override} />

      <Heading as="h2" size="h3">Force a theme</Heading>
      <CodeBlock language="tsx" label="Fixed dark theme" code={lock} />

      <Alert tone="warning" title="Borders are soft on purpose">
        Control borders are lighter than the 3:1 contrast WCAG 1.4.11 asks for. Controls keep a surface fill and a strong focus ring to compensate. If you need the stricter level, raise <code>--color-border-strong</code>.
      </Alert>
    </DocPage>
  );
}
