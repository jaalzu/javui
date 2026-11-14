import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import * as ui from "@javui/ui";

const manifest = JSON.parse(await readFile(resolve(import.meta.dirname, "../../../packages/ui/agent/manifest.json"), "utf8"));
const SERVER_ONLY = new Set(["CodeBlock"]);
const serverTypes = await readFile(
  resolve(import.meta.dirname, "../node_modules/@javui/ui/dist/server.d.ts"),
  "utf8",
);
const isServerExported = (name) =>
  new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`, "m").test(serverTypes);

const missing = manifest.components
  .map(({ name }) => name)
  .filter((name) => !SERVER_ONLY.has(name) && !(name in ui));
const missingServerOnly = [...SERVER_ONLY].filter((name) => !isServerExported(name));

if (missing.length) throw new Error(`Missing @javui/ui exports: ${missing.join(", ")}`);
if (missingServerOnly.length) {
  throw new Error(`Missing @javui/ui/server exports: ${missingServerOnly.join(", ")}`);
}
console.log(`check-exports OK (${manifest.components.length} components)`);
