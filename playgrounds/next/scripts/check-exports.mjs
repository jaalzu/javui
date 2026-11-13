import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import * as ui from "@javui/ui";

const manifest = JSON.parse(await readFile(resolve(import.meta.dirname, "../../../packages/ui/agent/manifest.json"), "utf8"));
const missing = manifest.components.map(({ name }) => name).filter((name) => !(name in ui));
if (missing.length) throw new Error(`Missing @javui/ui exports: ${missing.join(", ")}`);
console.log(`check-exports OK (${manifest.components.length} components)`);
