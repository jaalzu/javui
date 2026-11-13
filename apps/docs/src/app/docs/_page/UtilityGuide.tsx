import type { ReactNode } from "react";
import { Box, Heading, Stack, Text } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { DocPage } from "./DocPage";

type UtilityGuideProps = {
  href: string;
  title: string;
  description: string;
  rule: string;
  code: string;
  example: ReactNode;
};

type UtilityExample = { title: string; code: string; node: ReactNode; description: string };

function relatedExamples(title: string): UtilityExample[] {
  switch (title) {
    case "Alignment":
      return [
        {
          title: "Inline actions",
          description: "Keep a label and its actions aligned without adding a custom component.",
          code: `<div className="ui-flex ui-items-center ui-justify-between">\n  <Text>Account</Text>\n  <div className="ui-flex ui-items-center ui-gap-2">...</div>\n</div>`,
          node: <div className="ui-flex ui-items-center ui-justify-between"><Text>Account</Text><Text tone="muted">Actions</Text></div>,
        },
        {
          title: "Absolute center",
          description: "Center an overlay inside a deliberate relative containing block.",
          code: `<div className="ui-is-relative ui-p-6">\n  <div className="ui-is-absolute ui-inset-0 ui-align-absolute-center">...</div>\n</div>`,
          node: <div className="ui-is-relative ui-p-6"><Text>Containing block</Text><div className="ui-is-absolute ui-inset-0 ui-align-absolute-center"><Text tone="muted">Centered</Text></div></div>,
        },
      ];
    case "Box":
      return [
        {
          title: "Surface levels",
          description: "Use semantic surfaces instead of inventing a background color.",
          code: `<div className="ui-box ui-box-card">Card surface</div>\n<div className="ui-box ui-box-sunken">Inset surface</div>`,
          node: <Stack direction={{ base: "column", sm: "row" }} gap="3"><div className="ui-box ui-box-card"><Text>Card surface</Text></div><div className="ui-box ui-box-sunken"><Text>Inset surface</Text></div></Stack>,
        },
        {
          title: "Nested spacing",
          description: "Use the same spacing token for the box and its visible child surface.",
          code: `<div className="ui-box ui-box-highlight ui-box-sm">\n  <div className="ui-box ui-box-card ui-box-xs">Child</div>\n</div>`,
          node: <div className="ui-box ui-box-highlight ui-box-sm"><div className="ui-box ui-box-card ui-box-xs"><Text>Child surface</Text></div></div>,
        },
      ];
    case "Margin":
      return [
        {
          title: "Logical edges",
          description: "Use logical start/end utilities so the same composition works in RTL.",
          code: `<div className="ui-ms-4 ui-me-6">\n  <Text>Logical inline margin</Text>\n</div>`,
          node: <div className="ui-ms-4 ui-me-6"><Text>Logical inline margin</Text></div>,
        },
        {
          title: "Center a readable region",
          description: "Combine auto inline margins with a semantic max-width.",
          code: `<div className="ui-mx-auto ui-max-w-md">\n  <Text>Centered content</Text>\n</div>`,
          node: <div className="ui-mx-auto ui-max-w-md"><Text>Centered content</Text></div>,
        },
      ];
    case "Padding":
      return [
        {
          title: "Axis-specific padding",
          description: "Adjust one axis without replacing the other axis spacing.",
          code: `<div className="ui-px-4 ui-py-2">\n  <Text>Inline and block padding</Text>\n</div>`,
          node: <div className="ui-px-4 ui-py-2 ui-box ui-box-sunken"><Text>Inline and block padding</Text></div>,
        },
        {
          title: "Logical padding",
          description: "Use start/end for writing-mode-aware content.",
          code: `<div className="ui-ps-4 ui-pe-6">\n  <Text>Logical padding</Text>\n</div>`,
          node: <div className="ui-ps-4 ui-pe-6 ui-box ui-box-card"><Text>Logical padding</Text></div>,
        },
      ];
    case "Position":
      return [
        {
          title: "Absolute inside relative",
          description: "The relative ancestor defines the coordinate system for the overlay.",
          code: `<div className="ui-is-relative ui-p-6">\n  <Text>Content</Text>\n  <Text className="ui-is-absolute ui-inset-0">Overlay</Text>\n</div>`,
          node: <div className="ui-is-relative ui-p-6"><Text>Content</Text><Text className="ui-is-absolute ui-inset-0">Overlay</Text></div>,
        },
        {
          title: "Reset positioning",
          description: "Use static when a composed class should return an element to normal flow.",
          code: `<div className="ui-is-static">\n  <Text>Normal flow</Text>\n</div>`,
          node: <div className="ui-is-static"><Text>Normal flow</Text></div>,
        },
      ];
    case "Sizing":
      return [
        {
          title: "Responsive readable width",
          description: "Fill the available space while keeping a comfortable maximum width.",
          code: `<div className="ui-w-full ui-max-w-lg ui-min-w-0">\n  <Text>Readable content</Text>\n</div>`,
          node: <div className="ui-w-full ui-max-w-lg ui-min-w-0 ui-box ui-box-sunken"><Text>Readable content</Text></div>,
        },
        {
          title: "Flexible columns",
          description: "Combine a growing column with a fixed-size-safe sibling.",
          code: `<div className="ui-flex">\n  <div className="ui-flex-1 ui-min-w-0">Main</div>\n  <div className="ui-shrink-none">Aside</div>\n</div>`,
          node: <div className="ui-flex ui-gap-4"><div className="ui-flex-1 ui-min-w-0"><Text>Main</Text></div><div className="ui-shrink-none"><Text tone="muted">Aside</Text></div></div>,
        },
      ];
    case "Truncation":
      return [
        {
          title: "Single-line truncation",
          description: "Use truncate only when one line is the intended presentation.",
          code: `<Text truncate>Long content ends with an ellipsis.</Text>`,
          node: <div className="ui-max-w-xs"><Text truncate>Long content ends with an ellipsis when the available width is limited.</Text></div>,
        },
        {
          title: "Multi-line clamp",
          description: "Apply line clamp directly to text; do not put nested markup inside the clamped element.",
          code: `<Text lineClamp={2}>Direct text can use two lines.</Text>`,
          node: <div className="ui-max-w-sm"><Text lineClamp={2}>Direct text can use two lines when the content is longer than the available space. This behavior is opt-in.</Text></div>,
        },
        {
          title: "Hyphenation",
          description: "Allow long words to break when content comes from an uncontrolled source.",
          code: `<Text hyphenate>Supercalifragilisticexpialidocious</Text>`,
          node: <div className="ui-max-w-xs"><Text hyphenate>Supercalifragilisticexpialidocious</Text></div>,
        },
      ];
    case "Visibility":
      return [
        {
          title: "Remove from layout",
          description: "display:none removes the element and its space.",
          code: `<Text className="ui-is-hidden">Hidden content</Text>`,
          node: <Stack gap="2"><Text>Before</Text><Text className="ui-is-hidden">Hidden</Text><Text>After</Text></Stack>,
        },
        {
          title: "Reserve the space",
          description: "visibility:hidden keeps the element's layout space while hiding its content.",
          code: `<Text className="ui-is-invisible">Reserved space</Text>`,
          node: <Stack gap="2"><Text>Before</Text><Text className="ui-is-invisible">Reserved space</Text><Text>After</Text></Stack>,
        },
      ];
    default:
      return [];
  }
}

export function UtilityGuide({ href, title, description, rule, code, example }: UtilityGuideProps) {
  const examples = relatedExamples(title);
  return (
    <DocPage href={href} title={title} description={description}>
      <Heading as="h2" size={6}>When to use it</Heading>
      <Text>{rule}</Text>
      <Heading as="h2" size={6}>Example</Heading>
      <CodeBlock language="tsx" label={`${title} utility`} code={code} />
      <Box surface="sunken" size="sm" className="ui-mt-4">
        {example}
      </Box>
      {examples.map((item) => (
        <section key={item.title}>
          <Heading as="h3" size={6}>{item.title}</Heading>
          <Text>{item.description}</Text>
          <CodeBlock language="tsx" label={`${item.title} example`} code={item.code} />
          <Box surface="sunken" size="sm" className="ui-mt-4">
            {item.node}
          </Box>
        </section>
      ))}
    </DocPage>
  );
}
