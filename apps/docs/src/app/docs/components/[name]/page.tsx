import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import manifest from "../../../../../public/agent/manifest.json";
import { Alert, Heading, Skeleton, Stack } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { Examples, Preview } from "@/app/_examples/Examples";
import { DocPage } from "@/app/docs/_page/DocPage";

type Prop = { name: string; type: string; required: boolean; default?: string; description?: string };
type Entry = {
  name: string; category: string; base: string; description: string | null; import: string; renders: string;
  composition: string; whenToUse: string; avoid: string[]; accessibility: string; props: Prop[]; extends: string; examples: string[];
  callout?: string;
  choosing?: string[];
  parts?: Entry[];
};
type Manifest = { components: Entry[]; providersAndHooks: Entry[] };
const components = manifest.components as unknown as Entry[];
const providersAndHooks = (manifest as unknown as Manifest).providersAndHooks ?? [];
const pages = [...components, ...providersAndHooks];

type ComponentPageProps = { params: Promise<{ name: string }> };

/** Renders `code` spans written with backticks in the generated text. */
function Inline({ text }: { text: string }) {
  return text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}

/** First sentence of a description (the lead) and the rest. */
function splitLead(text: string | null | undefined): [string, string] {
  if (!text) return ["", ""];
  const i = text.search(/\.(\s|$)/);
  return i === -1 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 1).trim()];
}

const usageSnippets: Record<string, string> = {
  Input: `<Input aria-label="Name" />`,
  InputGroup: `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
</InputGroup>`,
  ButtonGroup: `<ButtonGroup aria-label="Actions">
  <Button>Save</Button>
  <Button>Publish</Button>
</ButtonGroup>`,
};

export function generateStaticParams() {
  return pages.map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { name } = await params;
  return { title: name };
}

export default function ComponentPage({ params }: ComponentPageProps) {
  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <ComponentContent params={params} />
    </Suspense>
  );
}

/** Placeholder shown while the `[name]` URL data resolves, so the navigation stays instant. */
function ComponentSkeleton() {
  return (
    <Stack gap="4">
      <Skeleton shape="rect" width="12rem" height="2.5rem" />
      <Skeleton />
      <Skeleton width="80%" />
    </Stack>
  );
}

async function ComponentContent({ params }: ComponentPageProps) {
  const { name } = await params;
  const c = pages.find((x) => x.name === name);
  if (!c) notFound();
  const [lead] = splitLead(c.description);
  const usage = usageSnippets[c.name] ?? c.examples[0] ?? `<${c.name} />`;

  return (
    <DocPage href={`/docs/components/${c.name}`} title={c.name} description={<Inline text={lead} />}>
      {c.callout && <Alert tone="info">{c.callout}</Alert>}

      <Preview name={c.name} />

      <Heading as="h2" size={6}>Installation</Heading>
      <CodeBlock
        language="bash"
        label="Install"
        tabs={[
          { label: "npm", code: "npm install ui-lib" },
          { label: "pnpm", code: "pnpm add ui-lib" },
          { label: "bun", code: "bun add ui-lib" },
        ]}
      />

      <Heading as="h2" size={6}>Usage</Heading>
      <CodeBlock language="tsx" label="Import" code={c.import} minimal />
      <CodeBlock language="tsx" label="Usage" code={usage} minimal />

      <Examples name={c.name} />

      {c.choosing?.length ? (
        <>
          <Heading as="h2" size={6}>Choosing</Heading>
          <ul>{c.choosing.map((a) => <li key={a}><Inline text={a} /></li>)}</ul>
        </>
      ) : null}

      <Heading as="h2" size={6}>When to use it</Heading>
      <p><Inline text={c.whenToUse} /></p>
      <Heading as="h3" size={6}>Avoid</Heading>
      <ul>{c.avoid.map((a) => <li key={a}><Inline text={a} /></li>)}</ul>

      <Heading as="h2" size={6}>Accessibility</Heading>
      <p><Inline text={c.accessibility} /></p>
    </DocPage>
  );
}
