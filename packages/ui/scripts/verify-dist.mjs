import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
const failures = [];
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else files.push(path);
  }
};
if (!existsSync(dist)) failures.push("dist does not exist");
else walk(dist);

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const name = relative(dist, file);
  if (text.includes("@/")) failures.push(`${name}: contains @/`);
  if (text.includes("use cache") || text.includes("use server")) failures.push(`${name}: contains Next.js-only directive`);
  if (/\.(stories|test|examples)\./i.test(name)) failures.push(`${name}: story/test/example leaked into dist`);
}

const sourceClient = [];
const source = join(root, "src");
const walkSource = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkSource(path);
    else if (/\.(ts|tsx)$/.test(entry.name) && /^\s*["']use client["']/.test(readFileSync(path, "utf8"))) sourceClient.push(relative(source, path).replace(/\.tsx?$/, ".js"));
  }
};
walkSource(source);
for (const file of sourceClient) {
  const target = join(dist, file);
  if (!existsSync(target) || !/^\s*["']use client["']/.test(readFileSync(target, "utf8"))) failures.push(`${file}: missing use client directive`);
}

for (const file of files) {
  const name = relative(dist, file).replaceAll("\\", "/");
  if (name === "styles/base.css" || name === "styles/global.css" || name.endsWith("/base.css") || name.endsWith("/global.css")) {
    failures.push(`${name}: must not ship`);
  }
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const expectedExports = {
  ".": { types: "./dist/index.d.ts", import: "./dist/index.js" },
  "./server": { types: "./dist/server.d.ts", import: "./dist/server.js" },
  "./tokens.css": "./dist/tokens/tokens.css",
  "./tailwind.css": "./dist/tokens/tailwind.css",
  "./agent/*.json": "./agent/*.json",
  "./agent/AGENTS.md": "./agent/AGENTS.md",
  "./package.json": "./package.json",
};
const serialize = (value) =>
  typeof value === "string" ? value : JSON.stringify(Object.fromEntries(Object.entries(value ?? {}).sort()));
const expectedKeys = Object.keys(expectedExports).sort();
const actualKeys = Object.keys(pkg.exports ?? {}).sort();
if (actualKeys.join() !== expectedKeys.join()) {
  failures.push(`exports: expected [${expectedKeys.join(", ")}], got [${actualKeys.join(", ")}]`);
}
const matchesGlob = (base, pattern) => {
  const dir = resolve(base, pattern.slice(0, pattern.lastIndexOf("/") + 1));
  const name = pattern.slice(pattern.lastIndexOf("/") + 1);
  const regex = new RegExp(`^${name.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*")}$`);
  return existsSync(dir) && readdirSync(dir).some((entry) => regex.test(entry));
};
for (const [key, expected] of Object.entries(expectedExports)) {
  const actual = pkg.exports?.[key];
  if (serialize(actual) !== serialize(expected)) {
    failures.push(`exports["${key}"]: expected ${serialize(expected)}, got ${serialize(actual)}`);
  }
  for (const target of typeof expected === "string" ? [expected] : Object.values(expected)) {
    const exists = target.includes("*") ? matchesGlob(root, target) : existsSync(resolve(root, target));
    if (!exists) failures.push(`exports["${key}"]: missing ${target}`);
  }
}
for (const forbidden of ["./fonts.css", "./base.css", "./global.css", "./styles.css"]) {
  if (forbidden in (pkg.exports ?? {})) failures.push(`exports: must not expose ${forbidden}`);
}

const agentFiles = readdirSync(join(root, "agent"));
const forbiddenAgentFiles = agentFiles.filter((file) => /^llms.*\.txt$|^icons\.json$/.test(file));
if (forbiddenAgentFiles.length) failures.push(`agent: forbidden files ${forbiddenAgentFiles.join(", ")}`);
if (Object.keys(pkg.exports ?? {}).some((key) => key.startsWith("./styles/"))) {
  failures.push("exports: must not expose ./styles/*");
}

// Shared CSS modules ship because components compose them; they are not public entries.
const sharedCss = ["control.module.css", "field-surface.module.css", "touchTarget.module.css"];
const distCss = files.filter((file) => file.endsWith(".css"));
for (const name of sharedCss) {
  const file = join(dist, "styles", name);
  if (!existsSync(file)) {
    failures.push(`styles/${name}: missing from dist`);
    continue;
  }
  const composedBy = distCss.filter((other) => other !== file && readFileSync(other, "utf8").includes(name));
  if (composedBy.length === 0) failures.push(`styles/${name}: not composed by any dist CSS module`);
  if (Object.keys(pkg.exports ?? {}).some((key) => key.includes(name))) failures.push(`styles/${name}: reachable through exports`);
}
const typography = join(dist, "tokens", "Typography.module.css");
if (existsSync(typography)) failures.push("tokens/Typography.module.css: story-only CSS must not ship");

const index = existsSync(join(dist, "index.js")) ? readFileSync(join(dist, "index.js"), "utf8") : "";
if (/\b(shiki|server-only)\b/.test(index)) failures.push("dist/index.js imports shiki or server-only");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`verify:dist OK (${files.length} files; ${sourceClient.length} client modules)`);
