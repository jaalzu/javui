// Generates everything agents read, from the single source of truth:
//   - props, descriptions and examples: TypeScript types + TSDoc in src/ui/components
//   - tokens: src/ui/tokens/*.json (DTCG)
//   - what cannot be derived (when to use, a11y notes): src/ui/agent-meta.json
// Outputs (never edit by hand):
//   public/agent/manifest.json   component manifest
//   public/agent/tokens.json     flattened design tokens
//   public/llms.txt              index for LLMs
//   public/llms-full.txt         full docs in one Markdown file
// Run: bun run agent-docs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { withCustomConfig } from "react-docgen-typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = join(root, "src/ui");
const outDir = join(root, "public/agent");
mkdirSync(outDir, { recursive: true });

const meta = JSON.parse(readFileSync(join(uiDir, "agent-meta.json"), "utf8"));
delete meta.$comment;

// ---- 1. Public exports (values only) must match the meta file exactly ----
const indexSrc = readFileSync(join(uiDir, "index.ts"), "utf8");
const exported = [...indexSrc.matchAll(/^export \{([^}]+)\} from/gm)].flatMap((m) =>
  m[1].split(",").map((s) => s.trim()).filter(Boolean),
);
const missingMeta = exported.filter((n) => !meta[n]);
const unknownMeta = Object.keys(meta).filter((n) => !exported.includes(n));
if (missingMeta.length || unknownMeta.length) {
  console.error("agent-meta.json is out of sync with src/ui/index.ts");
  if (missingMeta.length) console.error("  exported but missing in meta:", missingMeta.join(", "));
  if (unknownMeta.length) console.error("  in meta but not exported:", unknownMeta.join(", "));
  process.exit(1);
}

// ---- 2. Props, descriptions and examples from types + TSDoc ----
const componentFiles = readdirSync(join(uiDir, "components"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(join(uiDir, "components", d.name))
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx") && !f.endsWith(".stories.tsx"))
      .map((f) => join(uiDir, "components", d.name, f)),
  );

const parser = withCustomConfig(join(root, "tsconfig.json"), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  // Only props declared in this repo. Native HTML/Base UI props are described in `extends`.
  propFilter: (prop) => !prop.declarations?.length || prop.declarations.some((d) => !d.fileName.includes("node_modules")),
});
const docs = parser.parse(componentFiles);
const docByName = new Map(docs.map((d) => [d.displayName, d]));

// Read all @example blocks from the TSDoc preceding an export (docgen merges them).
function examplesFor(name, file) {
  if (!file) return [];
  const src = readFileSync(file, "utf8");
  const re = new RegExp(`/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*export (?:function|const) ${name}\\b`);
  const m = src.match(re);
  if (!m) return [];
  const lines = m[1].split("\n").map((l) => l.replace(/^\s*\* ?/, ""));
  const idx = lines.findIndex((l) => l.startsWith("@example"));
  if (idx === -1) return [];
  const body = lines.slice(idx + 1).join("\n").replace(/@\w+[\s\S]*$/, "").trim();
  return body ? [body] : [];
}

// Enums become "a" | "b" | "c" so agents see the allowed values, not just the word "enum".
function typeString(t) {
  if (!t) return "unknown";
  if (t.name === "enum" && Array.isArray(t.value)) return t.value.map((v) => v.value).join(" | ");
  return t.raw && t.name !== "enum" ? t.raw : t.name;
}

const componentsManifest = exported.map((name) => {
  const m = meta[name];
  const doc = docByName.get(name);
  const file = doc?.filePath;
  const props = doc
    ? Object.values(doc.props)
        .map((p) => ({
          name: p.name,
          type: typeString(p.type),
          required: p.required,
          default: p.defaultValue?.value ?? undefined,
          description: p.description || undefined,
        }))
        .sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name))
    : [];
  return {
    name,
    category: m.category,
    base: m.base === "base-ui" ? "Built on Base UI (@base-ui/react)" : "Own component",
    description: doc?.description?.trim() || null,
    import: `import { ${name} } from "@/ui";`,
    renders: m.renders,
    composition: m.composition,
    whenToUse: m.whenToUse,
    avoid: m.avoid,
    accessibility: m.a11y,
    props,
    extends: m.base === "base-ui" ? "Also accepts the native/Base UI props of the element it renders; they pass through." : "Also accepts the native props of the element it renders; they pass through.",
    examples: examplesFor(name, file),
    source: file ? file.replace(root + "/", "") : null,
  };
});

// Components without a docgen entry (aliases such as Dialog = BaseDialog.Root) still get TSDoc from source.
for (const c of componentsManifest) {
  if (c.description) continue;
  const dir = c.name.replace(/(Trigger|Content|Close|Provider)$/, "") || c.name;
  const candidates = componentFiles.filter((f) => f.includes(`/${dir}/`));
  for (const f of candidates) {
    const src = readFileSync(f, "utf8");
    const re = new RegExp(`/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*export (?:function|const) ${c.name}\\b`);
    const m = src.match(re);
    if (m) {
      const lines = m[1].split("\n").map((l) => l.replace(/^\s*\* ?/, ""));
      const end = lines.findIndex((l) => l.startsWith("@"));
      c.description = lines.slice(0, end === -1 ? undefined : end).join("\n").trim();
      if (!c.examples.length) c.examples = examplesFor(c.name, f);
      c.source = f.replace(root + "/", "");
      break;
    }
  }
}

// ---- 3. Tokens ----
const tokenFiles = ["primitive", "typography", "spacing", "shape", "layout", "motion", "theme.light", "theme.dark"];
const cssVarOf = (path) => "--" + path.join("-");
const refToVar = (v) => (typeof v === "string" ? v.replace(/\{([^}]+)\}/g, (_, p) => `var(${cssVarOf(p.split("."))})`) : v);

function walk(node, path, inherited, out, file) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "$value" in v) {
      out.push({
        name: path.concat(k).join("."),
        cssVar: cssVarOf(path.concat(k)),
        type: v.$type ?? inherited.type,
        value: refToVar(v.$value),
        description: v.$description,
        group: inherited.group,
        file,
      });
    } else if (v && typeof v === "object") {
      walk(v, path.concat(k), { type: v.$type ?? inherited.type, group: inherited.group }, out, file);
    }
  }
}

const tokens = [];
for (const f of tokenFiles) {
  const json = JSON.parse(readFileSync(join(uiDir, "tokens", `${f}.json`), "utf8"));
  const theme = f.startsWith("theme.") ? f.split(".")[1] : undefined;
  const found = [];
  walk(json, [], { type: undefined, group: f }, found, f);
  for (const t of found) tokens.push(theme ? { ...t, theme } : t);
}
// Merge light/dark semantic tokens into one entry each.
const merged = [];
const byVar = new Map();
for (const t of tokens) {
  if (t.theme) {
    const e = byVar.get(t.cssVar) ?? { name: t.name, cssVar: t.cssVar, type: t.type, group: "semantic-color", description: t.description };
    e[t.theme] = t.value;
    byVar.set(t.cssVar, e);
  } else {
    merged.push({ name: t.name, cssVar: t.cssVar, type: t.type, group: t.group === "primitive" ? "primitive-color" : t.group, value: t.value, description: t.description });
  }
}
merged.push(...byVar.values());

const tokensOut = {
  usage: [
    "Components and pages use semantic tokens only (--color-page, --color-primary-foreground, --space-4, --text-body-size ...).",
    "Never use --primitive-* tokens or hardcoded colors, sizes or fonts.",
    "Light/dark is switched by data-theme=\"light|dark\" on <html>; without it the OS preference applies.",
    "Text styles are sets of variables named --text-<style>-<size|line|weight|tracking|style|family>.",
  ],
  tokens: merged,
};
writeFileSync(join(outDir, "tokens.json"), JSON.stringify(tokensOut, null, 2));

// ---- 4. Manifest ----
const manifest = {
  name: "ui-lib",
  description: "React component library. Next.js, TypeScript, CSS variables + CSS Modules. Controls are built on Base UI.",
  principles: [
    "HTML first: use the semantic element for the job. Own components render correct HTML; Base UI components handle behavior and ARIA.",
    "Use semantic tokens only; never hardcode colors, spacing or fonts.",
    "Every control needs an accessible name: Field `label`, the component's `label`/`legend`, or `aria-label`.",
    "One way to do each thing: links are Link, actions are Button, headings are Heading, body text is Text.",
    "Keep heading levels in order, one h1 per page.",
  ],
  categories: [...new Set(componentsManifest.map((c) => c.category))],
  components: componentsManifest,
};
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

// ---- 5. llms.txt and llms-full.txt ----
const list = (arr) => arr.map((x) => `- ${x}`).join("\n");
const llms = [
  "# ui-lib",
  "",
  `> ${manifest.description}`,
  "",
  "## Principles",
  list(manifest.principles),
  "",
  "## Machine-readable",
  "- [Component manifest](/agent/manifest.json): every component with props, examples and accessibility notes",
  "- [Design tokens](/agent/tokens.json): every CSS variable with its meaning",
  "- [Icons](/agent/icons.json): every available icon with its component name and tags",
  "- [Full documentation](/llms-full.txt): everything above in one Markdown file",
  "",
  "## Components",
  ...manifest.categories.flatMap((cat) => [
    `### ${cat}`,
    ...componentsManifest.filter((c) => c.category === cat).map((c) => `- **${c.name}**: ${c.whenToUse}`),
    "",
  ]),
].join("\n");
writeFileSync(join(root, "public/llms.txt"), llms + "\n");

const propTable = (props) =>
  props.length
    ? ["| Prop | Type | Required | Default | Description |", "|---|---|---|---|---|", ...props.map((p) => `| \`${p.name}\` | \`${String(p.type).replace(/\|/g, "\\|")}\` | ${p.required ? "yes" : "no"} | ${p.default ?? ""} | ${(p.description ?? "").replace(/\n/g, " ").replace(/\|/g, "\\|")} |`)].join("\n")
    : "_No props of its own._";

const full = [
  llms,
  "",
  "---",
  "",
  ...componentsManifest.flatMap((c) => [
    `## ${c.name}`,
    "",
    c.description ?? "",
    "",
    `- Category: ${c.category}`,
    `- Base: ${c.base}`,
    `- Import: \`${c.import}\``,
    `- Renders: ${c.renders}`,
    `- Composition: ${c.composition}`,
    `- Use when: ${c.whenToUse}`,
    `- Avoid:`,
    ...c.avoid.map((a) => `  - ${a}`),
    `- Accessibility: ${c.accessibility}`,
    "",
    "### Props",
    propTable(c.props),
    "",
    c.extends,
    "",
    ...(c.examples.length ? ["### Example", "```tsx", ...c.examples, "```", ""] : []),
  ]),
  "## Design tokens",
  "",
  list(tokensOut.usage),
  "",
  "| Variable | Type | Value |",
  "|---|---|---|",
  ...merged.filter((t) => t.group !== "primitive-color").map((t) => `| \`${t.cssVar}\` | ${t.type ?? ""} | ${t.value ? `\`${String(t.value).replace(/\|/g, "\\|")}\`` : `light \`${t.light}\` / dark \`${t.dark}\``} |`),
  "",
].join("\n");
writeFileSync(join(root, "public/llms-full.txt"), full);

console.log(`agent docs: ${componentsManifest.length} components, ${merged.length} tokens`);
