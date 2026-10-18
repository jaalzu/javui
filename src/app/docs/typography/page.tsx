import type { Metadata } from "next";
import { Heading, Stack, Text } from "@/ui";
import doc from "../_page/DocPage.module.css";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Typography" };

export default function Typography() {
  return (
    <DocPage href="/docs/typography" title="Typography" description="One sans family for everything, a serif for emphasis, and a mono family for code.">

      <Heading as="h2" size="h3">Headings</Heading>
      <p>The element sets the outline and <code>size</code> sets the look, so an <code>h2</code> can look like an <code>h4</code>.</p>
      <div className={doc.preview}>
        <Stack gap="3">
          <Heading as="h2" size="display">Display</Heading>
          <Heading as="h2" size="h1">Heading 1</Heading>
          <Heading as="h2" size="h2">Heading 2</Heading>
          <Heading as="h2" size="h3">Heading 3</Heading>
          <Heading as="h2" size="h4">Heading 4</Heading>
        </Stack>
      </div>

      <Heading as="h2" size="h3">Text</Heading>
      <div className={doc.preview}>
        <Stack gap="3">
          <Text variant="body-lg">Large body text for introductions.</Text>
          <Text>Regular body text for most content.</Text>
          <Text variant="caption" tone="muted">Caption for helper text and metadata.</Text>
          <Text variant="emphasis">Emphasis: one lead sentence or a quote, in a serif.</Text>
          <Text variant="code">const code = &quot;monospace&quot;;</Text>
        </Stack>
      </div>
      <p>Use <code>tone=&quot;muted&quot;</code> for secondary text. Do not put required information in <code>--color-tertiary-foreground</code>.</p>
    </DocPage>
  );
}
