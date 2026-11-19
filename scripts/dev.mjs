// Single dev entry point for the docs app.
//
//   bun run dev       -> source mode: docs resolve @javui/ui from packages/ui/src,
//                        and token JSON edits regenerate tokens.css on the fly.
//   bun run dev:dist  -> build @javui/ui once and run docs against dist (production parity;
//                        @layer wrapping only exists in dist).
//
// Run from the repo root or from apps/docs (`bun run dev` inside the package).
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync, watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(root, "apps/docs");
const tokensDir = resolve(root, "packages/ui/src/tokens");
const tokensCss = resolve(tokensDir, "tokens.css");
const distMode = process.argv.includes("--dist");
const run = (args, cwd = root) =>
  spawnSync("bun", args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

const buildTokens = () => run(["run", "--filter", "@javui/ui", "tokens"]);
const newestJson = () =>
  Math.max(
    ...readdirSync(tokensDir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => statSync(resolve(tokensDir, file)).mtimeMs),
  );

if (distMode) {
  console.log("[dev] building @javui/ui for dist mode");
  const build = run(["run", "--filter", "@javui/ui", "build"]);
  if (build.status !== 0) process.exit(build.status ?? 1);
} else if (!existsSync(tokensCss) || statSync(tokensCss).mtimeMs < newestJson()) {
  const result = buildTokens();
  if (result.status !== 0) process.exit(result.status ?? 1);
}

let watcher;
if (!distMode) {
  let timer;
  watcher = watch(tokensDir, (_event, file) => {
    if (!file || !file.endsWith(".json")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`[tokens] ${file} changed, rebuilding`);
      buildTokens();
    }, 150);
  });
}

const next = spawn("bun", ["x", "next", "dev"], {
  cwd: docs,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    JAVUI_SOURCE: distMode ? "0" : (process.env.JAVUI_SOURCE ?? "1"),
  },
});

const stop = (code = 0) => {
  watcher?.close();
  if (!next.killed) next.kill();
  process.exit(code);
};
next.on("exit", (code) => stop(code ?? 0));
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
