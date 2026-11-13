import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const playground = join(root, "playgrounds", "next");
const run = (cmd, args, cwd = root) => {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run("bun", ["run", "--filter", "@javui/ui", "build"]);
run(
  "bun",
  ["pm", "pack", "--destination", playground],
  join(root, "packages", "ui"),
);
const tgz = readdirSync(playground).find((name) => name.endsWith(".tgz"));
if (!tgz) throw new Error("bun pm pack did not create a tarball");
const packageJson = JSON.parse(
  await Bun.file(join(playground, "package.json")).text(),
);
packageJson.dependencies["@javui/ui"] = `file:./${tgz}`;
await Bun.write(
  join(playground, "package.json"),
  `${JSON.stringify(packageJson, null, 2)}\n`,
);
rmSync(join(playground, "bun.lock"), { force: true });
rmSync(join(playground, "node_modules", "@javui"), {
  recursive: true,
  force: true,
});
run("bun", ["install"], playground);
run("bun", ["run", "build"], playground);
