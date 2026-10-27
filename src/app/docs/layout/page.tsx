import type { Metadata } from "next";
import { Heading, Link, Table } from "@/ui";
import { CodeBlock } from "@/ui/server";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Layout" };

export default function Layout() {
  return (
    <DocPage
      href="/docs/layout"
      title="Layout"
      description="Stack, Grid and Container cover one-dimensional flow, two-dimensional grids and page width. Breakpoints are mobile-first."
    >
      <Heading as="h2" size={6}>Breakpoints</Heading>
      <Table
        caption="Breakpoint reference"
        columns={[
          { key: "name", header: "Name" },
          { key: "value", header: "Min-width" },
          { key: "use", header: "Use" },
        ]}
        rows={[
          { name: <code>sm</code>, value: "40rem", use: "Large phones and up." },
          { name: <code>md</code>, value: "48rem", use: "Tablets and up." },
          { name: <code>lg</code>, value: "64rem", use: "Laptops and up." },
          { name: <code>xl</code>, value: "80rem", use: "Large screens." },
        ]}
      />
      <p>Always write <code>min-width</code> queries, smallest first: the base styles apply on mobile, then each breakpoint adds to them. A missing breakpoint inherits the smaller one, so always define <code>base</code>.</p>
      <p>Media queries cannot read <code>var()</code>. The library keeps the literal values in sync with the <code>--breakpoint-sm|md|lg|xl</code> tokens through a check in <code>bun run tokens</code>.</p>

      <Heading as="h2" size={6}>Responsive objects</Heading>
      <CodeBlock
        language="tsx"
        label="Responsive Stack and Grid"
        code={`<Stack direction={{ base: "column", md: "row" }} gap={{ base: "3", md: "6" }}>
  ...
</Stack>

<Grid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
  ...
</Grid>`}
      />

      <Heading as="h2" size={6}>Components</Heading>
      <ul>
        <li><Link href="/docs/components/Stack">Stack</Link>: vertical flow or a row of items.</li>
        <li><Link href="/docs/components/Grid">Grid</Link>: equal cards, tiles and galleries with <code>minColumnWidth</code>.</li>
        <li><Link href="/docs/components/Container">Container</Link>: page width and side padding, once per page section.</li>
      </ul>
    </DocPage>
  );
}
