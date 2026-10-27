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
const icons = read("icons.json");

const text = (value) => ({ content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] });
const fail = (message) => ({ isError: true, content: [{ type: "text", text: message }] });

const allEntries = [
  ...manifest.components,
  ...manifest.components.flatMap((c) => c.parts ?? []),
  ...manifest.providersAndHooks,
];
const find = (name) => allEntries.find((c) => c.name.toLowerCase() === String(name).toLowerCase());
const suggest = (name) => {
  const q = String(name).toLowerCase();
  return allEntries.filter((c) => c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase())).map((c) => c.name);
};

const server = new McpServer({ name: "ui-lib", version: "0.1.0" });

server.registerTool(
  "get_guidelines",
  {
    title: "Get guidelines",
    description: "Rules every use of ui-lib must follow (HTML first, semantic tokens, accessible names, one way per job). Read this first.",
    inputSchema: {},
  },
  async () =>
    text({
      principles: manifest.principles,
      tokenUsage: tokens.usage,
      categories: manifest.categories,
      providersAndHooks: manifest.providersAndHooks.map((c) => ({ name: c.name, whenToUse: c.whenToUse })),
    }),
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
      .map((c) => ({
        name: c.name,
        category: c.category,
        base: c.base,
        whenToUse: c.whenToUse,
        ...(c.parts?.length ? { parts: c.parts.map((p) => p.name) } : {}),
      }));
    if (!items.length) return fail(`No components in category "${category}". Categories: ${manifest.categories.join(", ")}`);
    return text(items);
  },
);

server.registerTool(
  "get_component",
  {
    title: "Get component",
    description: "Full reference for one component: description, props with types and defaults, what it renders, composition rules, things to avoid, accessibility notes and examples.",
    inputSchema: { name: z.string().describe("Component name, for example Button or ModalContent") },
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

server.registerTool(
  "search_icons",
  {
    title: "Search icons",
    description: "Find an icon in the generated set by name, category or tag. Use it instead of drawing an <svg> by hand. Each hit shows the component to import and its available weights.",
    inputSchema: {
      query: z.string().describe("Text to look for, for example 'arrow', 'check', 'user', 'edit', 'settings'"),
      limit: z.number().int().positive().max(100).optional().describe("Maximum hits. Default 40."),
    },
  },
  async ({ query, limit = 40 }) => {
    const q = query.toLowerCase();
    const hits = icons
      .filter((i) => [i.name, i.component, ...(i.categories ?? []), ...(i.tags ?? [])].some((f) => String(f).toLowerCase().includes(q)))
      .slice(0, limit)
      .map((i) => ({ name: i.name, import: `import { ${i.component} } from "@/ui";`, weights: i.weights }));
    if (!hits.length) return fail(`No icons match "${query}". Try 'arrow', 'check', 'user', 'edit', 'settings'.`);
    return text(hits);
  },
);

server.registerTool(
  "get_icon",
  {
    title: "Get icon",
    description: "Import line and usage for one icon from the generated set.",
    inputSchema: { name: z.string().describe("Icon name (check) or component name (CheckIcon)") },
  },
  async ({ name }) => {
    const q = String(name).toLowerCase().replace(/icon$/, "");
    const icon = icons.find((i) => i.name === q || i.component.toLowerCase() === String(name).toLowerCase());
    if (!icon) return fail(`Unknown icon "${name}". Use search_icons to find one.`);
    return text({
      name: icon.name,
      import: `import { ${icon.component} } from "@/ui";`,
      weights: icon.weights,
      example: `<${icon.component} size="sm" />\n<${icon.component} weight="fill" />`,
      note: "Sizes: sm 16, md 20, lg 24, xl 32. Decorative without `label`; pass `label` when it carries meaning.",
    });
  },
);

await server.connect(new StdioServerTransport());
