import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import manifest from "../../../../../public/agent/manifest.json";
import { Alert, Heading, Link, Skeleton, Stack } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { Examples, Preview } from "@/app/_examples/Examples";
import { DocPage } from "@/app/docs/_page/DocPage";
import { PackageManagerCode } from "@/app/docs/_page/PackageManagerCode";

type Prop = { name: string; type: string; required: boolean; default?: string; description?: string };
type Entry = {
  name: string; category: string; base: string; description: string | null; import: string; renders: string;
  composition: string; whenToUse: string; avoid: string[]; accessibility: string; props: Prop[]; extends: string; examples: string[];
  callout?: string;
  choosing?: string[];
  setup?: { description: string; code: string };
  reference?: { label: string; url: string; description?: string };
  parts?: Entry[];
};
const components = manifest.components as unknown as Entry[];
const pages = components;

type ComponentPageProps = { params: Promise<{ name: string }> };

/** Renders `code` spans written with backticks and Markdown links in the generated text. */
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      match[1] !== undefined ? (
        <code key={match.index}>{match[1]}</code>
      ) : (
        <Link key={match.index} href={match[3]} target="_blank" rel="noreferrer">
          {match[2]}
        </Link>
      ),
    );
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
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
  Toast: `import { useToast } from "@javui/ui";

function SaveButton() {
  const { show } = useToast();
  return (
    <Button variant="secondary" onClick={() => show({ title: "Saved", type: "success" })}>
      Save
    </Button>
  );
}`,
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
  const usage =
    usageSnippets[c.name] ?? c.examples[0] ?? (c.name.startsWith("use") ? null : `<${c.name} />`);

  return (
    <DocPage href={`/docs/components/${c.name}`} title={c.name} description={<Inline text={lead} />}>
      {c.callout && <Alert tone="info">{c.callout}</Alert>}

      <Preview name={c.name} />

      <Heading as="h2" size={6}>Installation</Heading>
      <PackageManagerCode npm="npm install ui-lib" label="Install" />

      {c.setup ? (
        <>
          <Heading as="h2" size={6}>Setup</Heading>
          <p><Inline text={c.setup.description} /></p>
          <CodeBlock language="tsx" label="app/providers.tsx" code={c.setup.code} minimal />
        </>
      ) : null}

      <Heading as="h2" size={6}>Usage</Heading>
      <CodeBlock language="tsx" label="Import" code={c.import} minimal />
      {usage && <CodeBlock language="tsx" label="Usage" code={usage} minimal />}

      <Examples name={c.name} />

      {c.choosing?.length ? (
        <>
          <Heading as="h2" size={6}>Choosing</Heading>
          <ul>{c.choosing.map((a) => <li key={a}><Inline text={a} /></li>)}</ul>
        </>
      ) : null}

      {c.reference ? (
        <>
          <Heading as="h2" size={6}>API Reference</Heading>
          <p>
            See the{" "}
            <Link href={c.reference.url} target="_blank" rel="noreferrer">
              {c.reference.label}
            </Link>{" "}
            {c.reference.description}
          </p>
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
