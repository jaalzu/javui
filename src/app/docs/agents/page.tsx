import type { Metadata } from "next";
import { Heading, Link, Table } from "@/ui";
import { CodeBlock } from "@/ui/server";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "For agents" };

const mcp = `{
  "mcpServers": {
    "ui-lib": { "command": "bun", "args": ["/absolute/path/to/ui-lib/mcp/server.mjs"] }
  }
}`;

export default function Agents() {
  return (
    <DocPage href="/docs/agents" title="For agents" description="Everything an agent needs to build with ui-lib is generated from the real types, TSDoc and tokens, so it matches the code.">

      <Heading as="h2" size={6}>Read the files</Heading>
      <ul>
        <li><Link href="/llms.txt">/llms.txt</Link>: short index of the rules and components.</li>
        <li><Link href="/llms-full.txt">/llms-full.txt</Link>: every component and token in one Markdown file.</li>
        <li><Link href="/agent/manifest.json">/agent/manifest.json</Link> and <Link href="/agent/tokens.json">/agent/tokens.json</Link>: the same content as JSON.</li>
      </ul>

      <Heading as="h2" size={6}>Layout</Heading>
      <ul>
        <li>Vertical flow or a row of items: Stack. Never write flex by hand.</li>
        <li>Equal cards, tiles, galleries: Grid with <code>minColumnWidth</code>. No breakpoints needed.</li>
        <li>Layout that changes by screen: responsive objects, mobile-first. <code>direction=&#123;&#123; base: &quot;column&quot;, md: &quot;row&quot; &#125;&#125;</code>, <code>columns=&#123;&#123; base: 1, md: 2, lg: 3 &#125;&#125;</code>. A missing breakpoint inherits the smaller one. Always define <code>base</code> first.</li>
        <li>Page width and side padding: Container once per page section. Never nest Containers.</li>
        <li>Never use pixel values or arbitrary classes; use the spacing scale keys and the breakpoint names sm, md, lg, xl.</li>
      </ul>
      <Table
        caption="Layout intents"
        columns={[
          { key: "intent", header: "Intent" },
          { key: "component", header: "Component" },
          { key: "props", header: "Props" },
        ]}
        rows={[
          { intent: "Vertical flow or a row", component: <code>Stack</code>, props: <><code>direction</code>, <code>gap</code></> },
          { intent: "Equal cards, tiles, galleries", component: <code>Grid</code>, props: <><code>minColumnWidth</code>, <code>gap</code></> },
          { intent: "Layout that changes by screen", component: <><code>Stack</code> or <code>Grid</code></>, props: "responsive objects" },
          { intent: "Page width and side padding", component: <code>Container</code>, props: <><code>size</code>, <code>padding</code></> },
        ]}
      />
      <p>Page with a sidebar:</p>
      <CodeBlock
        language="tsx"
        label="Page with sidebar"
        code={`<Container size="xl">
  <Grid columns={{ base: 1, lg: "16rem 1fr" }} gap="6">
    <Sidebar>...</Sidebar>
    <main>...</main>
  </Grid>
</Container>`}
      />
      <p>Card grid:</p>
      <CodeBlock
        language="tsx"
        label="Card grid"
        code={`<Grid minColumnWidth="16rem" gap="4">
  {cards.map((card) => <Card key={card.id}>{card.title}</Card>)}
</Grid>`}
      />
      <p>Toolbar that stacks on mobile:</p>
      <CodeBlock
        language="tsx"
        label="Responsive toolbar"
        code={`<Stack
  direction={{ base: "column", md: "row" }}
  gap={{ base: "2", md: "3" }}
  align="center"
>
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</Stack>`}
      />

      <Heading as="h2" size={6}>Modals</Heading>
      <Table
        caption="Modal intents"
        columns={[
          { key: "intent", header: "Intent" },
          { key: "component", header: "Component" },
          { key: "props", header: "Props" },
        ]}
        rows={[
          { intent: "A form or content", component: <code>Modal</code>, props: <><code>role=&quot;dialog&quot;</code> (default)</> },
          { intent: "A destructive confirmation", component: <code>Modal</code>, props: <><code>role=&quot;alertdialog&quot;</code> <code>color=&quot;critical&quot;</code></> },
          { intent: "Blocking information", component: <code>Modal</code>, props: <><code>role=&quot;alertdialog&quot;</code></> },
        ]}
      />
      <ul>
        <li>If the modal asks for a decision, always set <code>role=&quot;alertdialog&quot;</code>.</li>
        <li>One to three actions: the safe action on the left and the primary action on the right.</li>
        <li>Never invent sizes or colors.</li>
        <li>The form goes in the body.</li>
      </ul>

      <Heading as="h2" size={6}>Overridable defaults</Heading>
      <p>Every fixed default value for padding, gap or spacing is exposed through a CSS variable, and, where it makes sense, an optional prop. Override the variable on the component instance for a one-off change; use the prop when the component offers one, such as <code>Container</code> <code>padding</code>, <code>Card</code> <code>size</code> or <code>Stack</code> <code>gap</code>. Never hardcode a replacement value when a semantic token or component variable exists.</p>

      <Heading as="h2" size={6}>Use the MCP server</Heading>
      <p>Add the server to your MCP client, with the path to your copy of the repository.</p>
      <CodeBlock language="json" label="MCP configuration" code={mcp} />
      <Table
        caption="MCP tools"
        columns={[{ key: "tool", header: "Tool" }, { key: "use", header: "Use it to" }]}
        rows={[
          { tool: <code>get_guidelines</code>, use: "Read the rules first." },
          { tool: <code>list_components</code>, use: "See what exists, optionally by category." },
          { tool: <code>get_component</code>, use: "Props with allowed values, rendered HTML, composition, things to avoid, accessibility." },
          { tool: <code>get_examples</code>, use: "Copy usage." },
          { tool: <code>search_tokens</code>, use: "Find a CSS variable by meaning, such as focus, border or space." },
        ]}
      />

      <Heading as="h2" size={6}>Keeping it true</Heading>
      <p><code>bun run agent-docs</code> fails when a public export has no entry in <code>src/ui/agent-meta.json</code>, so a new component cannot ship without guidance. The meta file holds what types cannot say: when to use the component and what to avoid.</p>
    </DocPage>
  );
}
