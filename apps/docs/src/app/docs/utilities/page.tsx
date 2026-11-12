import type { Metadata } from "next";
import {
  Box,
  Card,
  Container,
  DescriptionList,
  DescriptionListDetails,
  DescriptionListTerm,
  Heading,
  Stack,
  Text,
} from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Utilities" };

const utilityCode = `<div className="ui-flex ui-items-center ui-justify-between ui-p-4">
  <Text>Content</Text>
  <Text>Actions</Text>
</div>`;

const responsiveCode = `<div className="ui-grid ui-grid-wrap ui-md-items-center">
  <div className="ui-size-1-of-1 ui-md-size-1-of-2">Main content</div>
  <aside className="ui-size-1-of-1 ui-md-size-1-of-2">Aside</aside>
</div>`;

const positionCode = `<div className="ui-is-relative">
  <div className="ui-is-absolute ui-inset-0">Overlay</div>
</div>`;

const spacingCode = `<div className="ui-m-4 ui-p-4">
  <Text>Token-based space inside and outside the element.</Text>
</div>`;

const overflowCode = `<Text truncate>Single-line content that ends with an ellipsis.</Text>
<Text lineClamp={3}>Long direct text can be clamped to three lines.</Text>
<Text hyphenate>Supercalifragilisticexpialidocious</Text>`;

const semanticCode = `<DescriptionList layout="horizontal">
  <DescriptionListTerm>Status</DescriptionListTerm>
  <DescriptionListDetails>Shipped</DescriptionListDetails>
</DescriptionList>`;

export default function Utilities() {
  return (
    <DocPage
      href="/docs/utilities"
      title="Utilities"
      description="Small, token-based classes for composing responsive layouts outside a component's own styling."
    >
      <Heading as="h2" size={6}>Composition rules</Heading>
      <p>Utilities are not components and do not render markup. They are classes you add to an element that already exists to change one layout concern.</p>
      <ul>
        <li><code>ui-flex</code>, <code>ui-grid</code> and <code>ui-col</code>: arrange siblings.</li>
        <li><code>ui-items-*</code> and <code>ui-justify-*</code>: align children inside that arrangement.</li>
        <li><code>ui-m-*</code> and <code>ui-p-*</code>: apply token-based external or internal spacing.</li>
        <li><code>ui-is-relative</code> and <code>ui-is-absolute</code>: establish positioning context.</li>
        <li><code>ui-truncate</code> and <code>ui-line-clamp-*</code>: control text overflow on text elements.</li>
      </ul>
      <p>Utilities use the <code>ui-</code> prefix, logical properties and semantic tokens. They do not replace component CSS Modules.</p>

      <Heading as="h2" size={6}>Alignment and spacing</Heading>
      <CodeBlock language="tsx" label="Alignment and spacing" code={utilityCode} />
      <Box surface="sunken" size="sm" className="ui-mt-4">
        <div className="ui-flex ui-items-center ui-justify-between ui-p-4">
          <Text>Content</Text>
          <Text tone="muted">Actions</Text>
        </div>
      </Box>

      <Heading as="h2" size={6}>Box, margin and padding</Heading>
      <p><code>ui-box</code> gives an element a token-based border and inset. Add a surface modifier when the area needs a semantic background. Margin and padding utilities are for isolated composition; use <code>Stack</code> or <code>Grid</code> for repeated sibling rhythm.</p>
      <CodeBlock language="tsx" label="Box and spacing" code={spacingCode} />
      <Box surface="card" size="sm" className="ui-mt-4 ui-m-4">
        <Text>Outer margin and inner padding are both token-based.</Text>
      </Box>

      <Heading as="h2" size={6}>Sizing and visibility</Heading>
      <p>Use <code>ui-w-*</code>, <code>ui-max-w-*</code>, <code>ui-min-w-0</code> and their height equivalents to control overflow-safe sizing. Use <code>ui-is-hidden</code> when content must leave layout, <code>ui-is-invisible</code> when it must keep its space, and <code>ui-is-visually-empty</code> for an intentionally zero-width region.</p>
      <Box surface="sunken" size="sm" className="ui-mt-4">
        <div className="ui-max-w-sm ui-p-4">
          <Text>Readable max width</Text>
        </div>
      </Box>

      <Heading as="h2" size={6}>Text overflow</Heading>
      <p>Truncation is opt-in. Apply line clamp directly to a text element, never to a container with nested HTML. Line clamp is not enabled by default and is not supported in IE11.</p>
      <CodeBlock language="tsx" label="Text overflow" code={overflowCode} />
      <Box surface="sunken" size="sm" className="ui-mt-4 ui-max-w-md">
        <Stack gap="3">
          <Text truncate>Single-line content that ends with an ellipsis when the box is narrow.</Text>
          <Text lineClamp={3}>This is direct text content that can be clamped to three lines when the available width is limited. It remains opt-in so normal text is never unexpectedly hidden.</Text>
          <Text hyphenate>Supercalifragilisticexpialidocious</Text>
        </Stack>
      </Box>

      <Heading as="h2" size={6}>Semantic data patterns</Heading>
      <p>These are not layout primitives. Use <code>DescriptionList</code> for native <code>dl</code>/<code>dt</code>/<code>dd</code> semantics and <code>NameValueList</code> for data-driven pairs.</p>
      <CodeBlock language="tsx" label="Description list" code={semanticCode} />
      <Box surface="sunken" size="sm" className="ui-mt-4">
        <DescriptionList layout="horizontal">
          <DescriptionListTerm>Status</DescriptionListTerm>
          <DescriptionListDetails>Shipped</DescriptionListDetails>
          <DescriptionListTerm>Owner</DescriptionListTerm>
          <DescriptionListDetails>Product team</DescriptionListDetails>
        </DescriptionList>
      </Box>

      <Heading as="h2" size={6}>Responsive columns</Heading>
      <CodeBlock language="tsx" label="Responsive utility grid" code={responsiveCode} />
      <Box surface="sunken" size="sm" className="ui-mt-4">
        <div className="ui-grid ui-grid-wrap ui-md-items-center">
          <div className="ui-size-1-of-1 ui-md-size-1-of-2 ui-p-2"><Card variant="surface"><Text>Main content</Text></Card></div>
          <aside className="ui-size-1-of-1 ui-md-size-1-of-2 ui-p-2"><Card variant="surface"><Text>Aside</Text></Card></aside>
        </div>
      </Box>

      <Heading as="h2" size={6}>Positioning</Heading>
      <CodeBlock language="tsx" label="Positioning utilities" code={positionCode} />
      <Box surface="sunken" size="sm" className="ui-mt-4">
        <div className="ui-is-relative ui-p-8">
          <Card variant="surface"><Text>Containing block</Text></Card>
          <div className="ui-is-absolute ui-inset-0 ui-align-absolute-center" aria-hidden="true">
            <Text tone="muted">Centered overlay</Text>
          </div>
        </div>
      </Box>

      <Heading as="h2" size={6}>Responsive page composition</Heading>
      <Container size="lg" gutter={{ base: "3", md: "6" }}>
        <Stack direction={{ base: "column", md: "row" }} gap={{ base: "3", md: "6" }} align="stretch">
          <Card variant="surface"><Text>Primary region</Text></Card>
          <Card variant="surface"><Text>Secondary region</Text></Card>
        </Stack>
      </Container>
    </DocPage>
  );
}
