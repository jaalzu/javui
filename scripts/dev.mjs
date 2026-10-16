// Starts `next dev` and rebuilds src/ui/tokens/tokens.css (and tailwind.css) whenever a token JSON is saved.
// Agent docs are NOT regenerated here: they are built by `bun run build` or `bun run agent-docs`.
// Run: bun run dev
import { spawn, spawnSync } from "node:child_process";
import { existsSync, statSync, readdirSync, watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tokensDir = resolve(root, "src/ui/tokens");
const cssFile = resolve(tokensDir, "tokens.css");
const buildTokens = () => spawnSync(process.execPath, [resolve(root, "scripts/build-tokens.mjs")], { cwd: root, stdio: "inherit" });

const jsonFiles = () => readdirSync(tokensDir).filter((f) => f.endsWith(".json"));
const newestJson = () => Math.max(...jsonFiles().map((f) => statSync(resolve(tokensDir, f)).mtimeMs));

// Only build at start when the CSS is missing or older than a token file.
if (!existsSync(cssFile) || statSync(cssFile).mtimeMs < newestJson()) buildTokens();

let timer;
const watcher = watch(tokensDir, (_event, file) => {
  if (!file || !file.endsWith(".json")) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`[tokens] ${file} changed, rebuilding`);
    buildTokens();
  }, 150);
});

const next = spawn("next", ["dev", ...process.argv.slice(2)], { cwd: root, stdio: "inherit", shell: true });
const stop = (code = 0) => {
  watcher.close();
  next.kill();
  process.exit(code);
};
next.on("exit", (code) => stop(code ?? 0));
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
