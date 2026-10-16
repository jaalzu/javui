#!/usr/bin/env bun
// MCP server for ui-lib. Lets an agent ask for exactly what it needs instead of loading all the docs.
// It only reads the generated files in public/agent (run `bun run agent-docs` first), so it can never
// disagree with the library: those files come from the source types, TSDoc and tokens.
//
// Start (stdio):   bun mcp/server.mjs
// Client config:   { "command": "bun", "args": ["/absolute/path/to/ui-lib/mcp/server.mjs"] }
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(readFileSync(resolve(root, "public/agent", f), "utf8"));
const manifest = read("manifest.json");
const tokens = read("tokens.json");

const text = (value) => ({ content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] });
const fail = (message) => ({ isError: true, content: [{ type: "text", text: message }] });

const find = (name) => manifest.components.find((c) => c.name.toLowerCase() === String(name).toLowerCase());
const suggest = (name) => {
  const q = String(name).toLowerCase();
  return manifest.components.filter((c) => c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase())).map((c) => c.name);
};

const server = new McpServer({ name: "ui-lib", version: "0.1.0" });

server.registerTool(
  "get_guidelines",
  {
    title: "Get guidelines",
    description: "Rules every use of ui-lib must follow (HTML first, semantic tokens, accessible names, one way per job). Read this first.",
    inputSchema: {},
  },
  async () => text({ principles: manifest.principles, tokenUsage: tokens.usage, categories: manifest.categories }),
);

server.registerTool(
  "list_components",
  {
    title: "List components",
    description: "List the components with a one-line 'when to use'. Optionally filter by category.",
    inputSchema: { category: z.string().optional().describe(`One of: ${manifest.categories.join(", ")}`) },
  },
  async ({ category }) => {
    const items = manifest.components
      .filter((c) => !category || c.category === category)
      .map((c) => ({ name: c.name, category: c.category, base: c.base, whenToUse: c.whenToUse }));
    if (!items.length) return fail(`No components in category "${category}". Categories: ${manifest.categories.join(", ")}`);
    return text(items);
  },
);

server.registerTool(
  "get_component",
  {
    title: "Get component",
    description: "Full reference for one component: description, props with types and defaults, what it renders, composition rules, things to avoid, accessibility notes and examples.",
    inputSchema: { name: z.string().describe("Component name, for example Button or DialogContent") },
  },
  async ({ name }) => {
    const c = find(name);
    if (!c) {
      const s = suggest(name);
      return fail(`Unknown component "${name}".${s.length ? ` Did you mean: ${s.join(", ")}?` : ""} Use list_components to see all of them.`);
    }
    return text(c);
  },
);

server.registerTool(
  "get_examples",
  {
    title: "Get examples",
    description: "Copy-paste usage examples for a component.",
    inputSchema: { name: z.string().describe("Component name") },
  },
  async ({ name }) => {
    const c = find(name);
    if (!c) return fail(`Unknown component "${name}". Use list_components.`);
    if (!c.examples.length) return text(`No example is written for ${c.name}. Its parent in the same file usually has one. Import: ${c.import}`);
    return text(c.examples.map((e) => "```tsx\n" + e + "\n```").join("\n\n"));
  },
);

server.registerTool(
  "search_tokens",
  {
    title: "Search design tokens",
    description: "Find design tokens (CSS variables) by name, meaning or group. Use semantic tokens only; primitive tokens are internal.",
    inputSchema: {
      query: z.string().describe("Text to look for, for example 'border', 'focus', 'space', 'danger'"),
      includePrimitives: z.boolean().optional().describe("Include --primitive-* tokens. Default false."),
    },
  },
  async ({ query, includePrimitives }) => {
    const q = query.toLowerCase();
    const hits = tokens.tokens
      .filter((t) => includePrimitives || t.group !== "primitive-color")
      .filter((t) => [t.name, t.cssVar, t.description, t.group, t.type].some((f) => f && String(f).toLowerCase().includes(q)))
      .slice(0, 60);
    if (!hits.length) return fail(`No tokens match "${query}". Try 'color', 'space', 'text', 'radius', 'focus', 'motion'.`);
    return text(hits);
  },
);

await server.connect(new StdioServerTransport());
