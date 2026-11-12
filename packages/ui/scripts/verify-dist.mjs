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

const index = existsSync(join(dist, "index.js")) ? readFileSync(join(dist, "index.js"), "utf8") : "";
if (/\b(shiki|server-only)\b/.test(index)) failures.push("dist/index.js imports shiki or server-only");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`verify:dist OK (${files.length} files; ${sourceClient.length} client modules)`);
