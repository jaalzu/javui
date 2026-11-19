// Build @javui/ui, pack it, and install the tarball into a consumer app.
//
//   bun run sync:app                 -> ~/Desktop/app-x
//   bun run sync:app -- ../my-app    -> explicit path
//   JAVUI_APP=../my-app bun run sync:app
//
// Copies the tarball to <APP>/vendor with a unique timestamped name, runs
// `bun add ./vendor/<name>`, removes <APP>/.next and keeps only the newest .tgz.
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const ui = join(root, "packages/ui");
const run = (args, cwd, capture = false) => {
  const result = spawnSync("bun", args, {
    cwd,
    stdio: capture ? "pipe" : "inherit",
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    if (capture && result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
  return result.stdout ?? "";
};

const arg = process.argv.slice(2).find((value) => !value.startsWith("-"));
const app = resolve(arg ?? process.env.JAVUI_APP ?? join(homedir(), "Desktop", "app-x"));

if (!existsSync(join(app, "package.json"))) {
  console.error(
    `[sync:app] App not found: ${app}\n` +
      `Pass a path (bun run sync:app -- ../app-x) or set JAVUI_APP.`,
  );
  process.exit(1);
}

console.log(`[sync:app] app: ${app}`);
console.log("[sync:app] building @javui/ui");
run(["run", "--filter", "@javui/ui", "build"], root);

const temp = mkdtempSync(join(tmpdir(), "javui-pack-"));
console.log("[sync:app] packing");
run(["pm", "pack", "--destination", temp], ui);
const packed = readdirSync(temp).find((name) => name.endsWith(".tgz"));
if (!packed) {
  console.error("[sync:app] bun pm pack produced no tarball");
  process.exit(1);
}

const version = JSON.parse(readFileSync(join(ui, "package.json"), "utf8")).version;
const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
const name = `javui-ui-${version}-${stamp}.tgz`;
const vendor = join(app, "vendor");
cpSync(join(temp, packed), join(vendor, name), { recursive: true, force: true });
rmSync(temp, { recursive: true, force: true });

console.log(`[sync:app] installing vendor/${name}`);
run(["add", `./vendor/${name}`], app);

rmSync(join(app, ".next"), { recursive: true, force: true });

// Keep the vendor folder tidy: only the tarball that was just installed remains.
for (const file of readdirSync(vendor)) {
  if (file.endsWith(".tgz") && file !== name) rmSync(join(vendor, file), { force: true });
}

console.log(`[sync:app] done (${basename(app)} -> ${name})`);
