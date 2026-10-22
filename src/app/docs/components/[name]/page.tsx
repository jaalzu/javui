import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import manifest from "../../../../../public/agent/manifest.json";
import { Heading, Skeleton, Stack, Table } from "@/ui";
import { CodeBlock } from "@/ui/server";
import { noDemo } from "@/app/_examples/demo-names";
import { Examples, Preview } from "@/app/_examples/Examples";
import shell from "../../../_shell/shell.module.css";
import { DocPage } from "@/app/docs/_page/DocPage";

type Prop = { name: string; type: string; required: boolean; default?: string; description?: string };
type Entry = {
  name: string; category: string; base: string; description: string; import: string; renders: string;
  composition: string; whenToUse: string; avoid: string[]; accessibility: string; props: Prop[]; extends: string; examples: string[];
};
const components = manifest.components as unknown as Entry[];

type ComponentPageProps = { params: Promise<{ name: string }> };

/** Renders `code` spans written with backticks in the generated text. */
function Inline({ text }: { text: string }) {
  return text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}

/** First sentence of a description (the lead) and the rest. */
function splitLead(text: string): [string, string] {
  const i = text.search(/\.(\s|$)/);
  return i === -1 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 1).trim()];
}

export function generateStaticParams() {
  return components.map((c) => ({ name: c.name }));
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
  const c = components.find((x) => x.name === name);
  if (!c) notFound();
  const [lead, more] = splitLead(c.description);

  return (
    <DocPage href={`/docs/components/${c.name}`} title={c.name} description={<Inline text={lead} />}>
      {!noDemo.has(c.name) && (
        <>
          <Heading as="h2" className={shell.srOnly} data-doc-skip>Preview</Heading>
          <Preview name={c.name} code={c.examples[0]} />
        </>
      )}

      <Heading as="h2" size={6}>Installation</Heading>
      <p>Add the library first (see the installation guide), then import the component.</p>
      <CodeBlock language="tsx" label="Import" code={c.import} />

      <Heading as="h2" size={6}>Usage</Heading>
      {more && <p><Inline text={more} /></p>}
      <p><Inline text={c.composition} /></p>
      {c.examples.map((code, i) => (
        <CodeBlock key={i} language="tsx" label={`Usage example ${i + 1}`} code={code} />
      ))}
      <p>Renders: {c.renders}.</p>

      <Examples name={c.name} />

      <Heading as="h2" size={6}>When to use it</Heading>
      <p><Inline text={c.whenToUse} /></p>
      <Heading as="h3" size={6}>Avoid</Heading>
      <ul>{c.avoid.map((a) => <li key={a}><Inline text={a} /></li>)}</ul>

      {c.props.length > 0 && (
        <>
          <Heading as="h2" size={6}>Props</Heading>
          <Table
            caption={`${c.name} props`}
            hideCaption
            columns={[{ key: "name", header: "Prop" }, { key: "type", header: "Type" }, { key: "default", header: "Default" }, { key: "description", header: "Description" }]}
            rows={c.props.map((p) => ({
              name: <code>{p.name}{p.required ? " (required)" : ""}</code>,
              type: <code>{p.type}</code>,
              default: p.default ? <code>{p.default}</code> : "",
              description: p.description ? <Inline text={p.description} /> : "",
            }))}
          />
          <p><Inline text={c.extends} /></p>
        </>
      )}

      <Heading as="h2" size={6}>Accessibility</Heading>
      <p><Inline text={c.accessibility} /></p>
    </DocPage>
  );
}
