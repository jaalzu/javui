import type { Metadata } from "next";
import { ButtonLink, Heading, Link } from "@/ui";
import landing from "../_landing/landing.module.css";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Introduction" };

export default function Introduction() {
  return (
    <DocPage
      href="/docs"
      title="Introduction"
      description="ui-lib is a small, calm set of React components for Next.js, made for two readers: people who use the interface and agents that build with it."
    >
      <Heading as="h2" size="h3">What you get</Heading>
      <ul>
        <li><strong>HTML first.</strong> Each component renders the right element: a heading is a heading, a link is an <code>a</code>, an action is a <code>button</code>.</li>
        <li><strong>Accessible behavior.</strong> Dialog, Select, Tabs, Menu, Toast and the form controls are built on Base UI, so focus, keyboard and ARIA are handled.</li>
        <li><strong>Themeable.</strong> Components read semantic tokens such as <code>--color-page</code>. Light and dark switch with <code>data-theme</code>.</li>
        <li><strong>Agent friendly.</strong> A manifest, <code>llms.txt</code> and an MCP server describe every component from the real types.</li>
        <li><strong>Fast navigation.</strong> Every link renders with <code>next/link</code> through one <code>LinkProvider</code>.</li>
      </ul>

      <Heading as="h2" size="h3">Where to go next</Heading>
      <ul>
        <li><Link href="/docs/installation">Installation</Link>: add the library to your app and wire it up.</li>
        <li><Link href="/docs/usage">Usage</Link>: the rules and a first screen.</li>
        <li><Link href="/docs/components">Components</Link>: every component with a live preview, code and notes.</li>
      </ul>
      <div className={landing.heroActions} style={{ justifyContent: "flex-start" }}>
        <ButtonLink href="/docs/installation">Get started</ButtonLink>
        <ButtonLink href="/docs/components" variant="secondary">Browse components</ButtonLink>
      </div>
    </DocPage>
  );
}
