# ui-lib

React component library: Next.js 16, TypeScript, Bun, CSS variables + CSS Modules. Controls are built on [Base UI](https://base-ui.com). Designed to be read and used by agents as well as people.

## Quick start

```bash
bun install
bun run storybook          # docs and playground, http://localhost:6006
bun run dev                # Next.js app, http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `bun run tokens` | DTCG JSON in `src/ui/tokens` to `tokens.css` (Style Dictionary) |
| `bun run agent-docs` | Generates `public/agent/*.json`, `public/llms.txt`, `public/llms-full.txt` |
| `bun run mcp` | Starts the MCP server (stdio) |
| `bun mcp/smoke-test.mjs` | Calls every MCP tool and checks the answers |
| `bun run typecheck` / `bun run lint` | TypeScript / ESLint with `jsx-a11y` |
| `bun run test` | Unit tests (Testing Library + axe) in jsdom |
| `bunx vitest run --project storybook` | Every story in a real browser with axe, light and dark. Needs `bunx playwright install chromium` |

## Theme

Tokens switch on `data-theme="light|dark"` on `<html>`; without it the OS preference applies. The demo app sets it with `next-themes` (`src/app/providers.tsx`, `src/app/ThemeSwitcher.tsx`), which also avoids the flash on load. The library does not depend on it, so any other mechanism that sets the attribute works.

## Layout

```
src/ui/
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

Types, TSDoc and tokens are the only things written by hand. The agent manifest, `llms.txt`, `tokens.css` and the MCP answers are generated from them. `bun run agent-docs` fails if an export in `src/ui/index.ts` has no entry in `agent-meta.json`, so a new component cannot be forgotten.

After adding or changing a component: update its TSDoc, add its entry to `agent-meta.json`, then run `bun run agent-docs`.

## Landing and docs

`src/app/page.tsx` is the landing page and `src/app/docs/**` the documentation. Component pages are generated from `public/agent/manifest.json`; live examples live in `src/app/Demo.tsx` (add one there when you add a component).
