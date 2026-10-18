import type { Metadata } from "next";
import { CodeBlock, Heading, Link, Table } from "@/ui";
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
