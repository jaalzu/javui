import type { Metadata } from "next";
import { CodeBlock, Heading, Link } from "@/ui";
import { DocPage } from "../DocPage";

export const metadata: Metadata = { title: "Usage" };

const form = `import { Button, Field, Heading, Input, Stack, Textarea } from "@/ui";

export function Contact() {
  return (
    <form>
      <Stack gap="4">
        <Heading as="h2">Contact us</Heading>
        <Field label="Email">
          <Input type="email" name="email" autoComplete="email" required />
        </Field>
        <Field label="Message" description="Up to 500 characters.">
          <Textarea name="message" rows={4} />
        </Field>
        <Button type="submit">Send</Button>
      </Stack>
    </form>
  );
}`;

const nav = `import { ButtonLink, Link } from "@/ui";

<Link href="/pricing">Pricing</Link>
<ButtonLink href="/signup">Create account</ButtonLink>`;

const toast = `"use client";

import { Button, useToast } from "@/ui";

export function SaveButton() {
  const { show } = useToast();
  return <Button onClick={() => show({ title: "Saved", tone: "success" })}>Save</Button>;
}`;

export default function Usage() {
  return (
    <DocPage href="/docs/usage" title="Usage" description={<>Import everything from <code>@/ui</code>. These rules keep screens accessible and consistent.</>}>

      <Heading as="h2" size="h3">Rules</Heading>
      <ol>
        <li><strong>Use the component for the job.</strong> <code>Heading</code> for headings, <code>Text</code> for body text, <code>Link</code> for navigation, <code>Button</code> for actions. Never a <code>div</code> with <code>onClick</code>.</li>
        <li><strong>Semantic tokens only.</strong> <code>--color-bg</code>, <code>--space-4</code>, <code>--text-body-size</code>. Never hex colors, pixel values or <code>--primitive-*</code>.</li>
        <li><strong>Every control has a name.</strong> Use <code>Field label</code>, the component&apos;s own <code>label</code> or <code>legend</code>, or <code>aria-label</code>.</li>
        <li><strong>Keep heading order.</strong> One <code>h1</code> per page and no skipped levels. Change the look with <code>size</code>, not the level.</li>
        <li><strong>Do not rebuild behavior.</strong> Focus, keyboard and ARIA of Dialog, Select, Menu and the rest come from Base UI.</li>
      </ol>

      <Heading as="h2" size="h3">A form</Heading>
      <CodeBlock language="tsx" label="Contact form" code={form} />

      <Heading as="h2" size="h3">Links and navigation</Heading>
      <p>Once <code>LinkProvider</code> is in your providers, <code>Link</code>, <code>ButtonLink</code>, Menu link items, <code>Breadcrumb</code> and <code>Pagination</code> all render with <code>next/link</code>, so you get prefetching and client navigation without passing anything per link.</p>
      <p>Use <code>ButtonLink</code> for a link that looks like a button. Use <code>Button</code> only for actions that do not navigate.</p>
      <CodeBlock language="tsx" label="Links" code={nav} />

      <Heading as="h2" size="h3">Feedback after an action</Heading>
      <p><code>useToast</code> works in client components below <code>ToastProvider</code>. For messages that must stay on the page, use <code>Alert</code>.</p>
      <CodeBlock language="tsx" label="Toast" code={toast} />

      <p>See every component in <Link href="/docs/components">Components</Link>.</p>
    </DocPage>
  );
}
