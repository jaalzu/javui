import type { Metadata } from "next";
import { Heading, Link, Text } from "@javui/ui";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Layout & Utilities" };

export default function LayoutUtilities() {
  return (
    <DocPage
      href="/docs/layout-utilities"
      title="Layout & Utilities"
      description="The composition layer for responsive pages, regions and content patterns."
    >
      <p>This layer sits between foundations and components. It controls where content goes, how it responds to viewport changes and how semantic groups relate to each other.</p>

      <Heading as="h2" size={6}>Choose the right tool</Heading>
      <ul>
        <li><Link href="/docs/components/Stack">Stack</Link>: one-dimensional flow with a consistent gap.</li>
        <li><Link href="/docs/components/Grid">Grid</Link>: responsive two-dimensional tracks, auto-fit cards and unequal columns.</li>
        <li><Link href="/docs/components/Container">Container</Link>: readable page width and responsive gutters.</li>
        <li><Link href="/docs/utilities">Utilities</Link>: small, token-based modifiers for alignment, spacing, sizing, positioning and text overflow.</li>
        <li><Link href="/docs/components/DescriptionList">Semantic patterns</Link>: native description lists and data-driven name/value pairs.</li>
      </ul>

      <Heading as="h2" size={6}>The rule</Heading>
      <Text>Use layout primitives for repeatable structure. Use utility classes for a focused external modifier. Keep components responsible for their own internal layout and styling hooks.</Text>
    </DocPage>
  );
}
