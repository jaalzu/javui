import type { Metadata } from "next";
import { Heading, Table } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Surfaces" };

export default function Surfaces() {
  return (
    <DocPage
      href="/docs/surfaces"
      title="Surfaces"
      description="Four surfaces build every screen. Pick the one that matches the depth of the content."
    >
      <Heading as="h2" size={6}>The four surfaces</Heading>
      <Table
        caption="Surfaces from the page upward"
        columns={[
          { key: "token", header: "Token" },
          { key: "use", header: "Use" },
        ]}
        rows={[
          { token: <code>--color-page</code>, use: "The base. Everything sits on it." },
          { token: <code>--color-card</code>, use: "Content blocks on the page: cards, panels and table rows." },
          { token: <code>--color-sunken</code>, use: "Recessed areas inside a card: code blocks, wells and inset fields." },
          { token: <code>--color-modal</code>, use: "Layers above the page: dialogs, menus, select lists and popovers." },
        ]}
      />

      <Heading as="h2" size={6}>Composition rules</Heading>
      <ul>
        <li>A card sits on the page. A sunken area sits inside a card.</li>
        <li>Never put a card inside another card. Use a sunken area or a <code>Divider</code> instead.</li>
        <li>Modal floats above the page and is never used as a page background.</li>
        <li>Use at most three nested levels.</li>
        <li>Controls placed on a sunken area use <code>--color-component-on-sunken</code>.</li>
        <li>At rest, use a border or a shadow, never both.</li>
      </ul>
    </DocPage>
  );
}
