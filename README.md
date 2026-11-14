# ui-lib

React component library: Next.js 16, TypeScript, Bun, CSS variables + CSS Modules. Controls are built on [Base UI](https://base-ui.com). Designed to be read and used by agents as well as people.

## Quick start

```bash
bun install
bun run dev                # Next.js app, http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `bun run tokens` | DTCG JSON in `packages/ui/src/tokens` to generated CSS |
| `bun run agent-docs` | Generates `packages/ui/agent/*` |
| `bun run mcp` | Starts the MCP server (stdio) |
| `bun run mcp:test` | Calls every MCP tool and checks the answers |
| `bun run typecheck` / `bun run lint` | TypeScript / ESLint with `jsx-a11y` |
| `bun run test` | Unit tests (Testing Library + axe) in jsdom |
| `bunx vitest run --project storybook` | Every story in a real browser with axe, light and dark. Needs `bunx playwright install chromium` |

## Theme

Tokens switch on `data-theme="light|dark"` on `<html>`; without it the OS preference applies. Set `data-theme` in the server-rendered HTML (or use `next-themes` with `attribute="data-theme"`) before the first paint to avoid a dark-theme flash. The library does not depend on it, so any other mechanism that sets the attribute works.

## Layout

```
packages/ui/
  tokens/        DTCG JSON (source of truth) + generated tokens.css
  components/    one folder per component: .tsx, .module.css, .stories.tsx, .test.tsx
  agent-meta.json  guidance for agents that cannot be derived from code
  index.ts       public exports
scripts/         token and agent-docs generators
mcp/             MCP server and smoke test
AGENTS.md        rules for working on the library
AGENT_GUIDE.md   rules for using the library
```

## Source of truth

Types, TSDoc and tokens are the only things written by hand. The agent manifest, `llms.txt`, `tokens.css` and the MCP answers are generated from them. `bun run agent-docs` validates exports from `packages/ui/src/index.ts` against `agent-meta.json`.

After adding or changing a component: update its TSDoc, add its entry to `agent-meta.json`, then run `bun run agent-docs`.

## Landing and docs

`apps/docs/src/app` is the documentation. Component pages are generated from `packages/ui/agent/manifest.json`; examples live in `apps/docs/src/examples`. Consumers import from `@javui/ui` or `@javui/ui/server`, never `@/ui`.

## CSS and Next providers

Import `@javui/ui/tokens.css` (required) and optionally `base.css`, `fonts.css`, `tailwind.css`, or `styles.css`. `CodeBlock` exists only in `@javui/ui/server` and needs the optional peer: `bun add shiki`. The package has no Next directives and works with or without `cacheComponents`. When integrating Tailwind CSS v4, note that its `--radius-*` theme namespace overlaps with this library's radius tokens; map or rename one namespace in the integration layer if both are consumed together.

In Next App Router, mount routing in a client provider because `next/link` is a function:

~~~~tsx
"use client";
import Link from "next/link";
import { LinkProvider } from "@javui/ui";
export function Providers({ children }: { children: React.ReactNode }) {
  return <LinkProvider component={Link}>{children}</LinkProvider>;
}
~~~~
