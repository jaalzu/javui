<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ui-lib conventions

- Library code lives in `src/ui`. Tokens are DTCG JSON in `src/ui/tokens/*.json`; `bun run tokens` generates `tokens.css` and `tailwind.css`. Never edit those by hand, and rerun `bun run tokens` after every JSON change (the JSON is the source, the CSS is not regenerated automatically).
- Components use only semantic tokens. Never use `--primitive-*` or hardcoded colors, sizes or fonts.
- Controls with behavior (Button, Input, Checkbox, Radio, Switch, Select, Dialog, Tooltip, Tabs, Field, Menu, Popover, Slider...) are built on Base UI (`@base-ui/react`); do not reimplement its keyboard, focus or ARIA logic.
- Own components (Text, Heading, Box, Stack, Grid, Container, ...) render correct semantic HTML. `as` only accepts elements valid for that component.
- Every component needs: TSDoc on props, a story (light and dark), a Testing Library test, and passing axe checks.
- Breakpoints: mobile first with `min-width`. `--breakpoint-sm|md|lg|xl` (40/48/64/80rem) are documentation only, since CSS cannot read variables in `@media`; write the rem value. Max-width queries use `value - 0.01rem`.
- Commands: `bun run storybook`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run icons`.

## Foundations (tokens)

Order of design: color, typography, shape, spacing, elevation, motion.

- **Color** (flat `--color-*`): surfaces (`page, shell, container, card, sunken, modal, standout`), component (`component` + `-hover/-active/-on-sunken/-on-inverted`), transparent (`transparent` + `-hover/-active`), foreground (`primary|secondary|tertiary|disabled-foreground`), inverted (`inverted-solid` + states, `on-inverted-foreground`), brand, states (`positive|warning|info|danger` each with `-solid`, `-solid-hover`, `-subtle`, `-foreground`, `on-*-solid-foreground`), borders (`border-default|subtle|strong|inverted|disabled`, `brand-border-focus` is the focus ring), `disabled`, `overlay`. Light in `:root`, dark in `[data-theme="dark"]` and the OS media query. Use `color-mix(in oklab, ...)` with transparent or near-neutral colors.
- **Shadows** (4): `--shadow-border`, `--shadow-default`, `--shadow-large`, `--shadow-extra-large`. Slider thumb uses default; Menu, Select, Popover, Toast use large; Dialog and search palette use extra-large.
- **Typography**: `--font-size-10 ... 56` (named by px). Text styles `--text-heading-1..6-*` (fluid clamp), `--text-body-lg|body|body-sm`, `label`, `caption-lg|caption|caption-sm`, `emphasis` (serif italic), `code|code-sm|code-xs`. Weights: 400, 500, 600 only. DM Sans (optical sizing), Commit Mono, Newsreader italic. Headings are never italic; `Text variant="emphasis"` is.
- **Icons**: `--size-icon-sm|md|lg|xl` = 16/20/24/32px, and `--icon-gap-sm|md|lg|xl` for the space between an icon and its label. `Icon` reads `--icon-size`; `Button` sets it from `--btn-icon` (sm and md 16px, lg 20px). `data-icon="start|end|both|only"` (from `src/ui/utils/iconPosition.ts`) gives the icon side 0.75x padding; icon-only is square. Glyphs come from Phosphor (256x256, `fill="currentColor"`) as named components built by `createIcon` (`src/ui/components/Icon/createIcon.tsx`); the set lives in `src/ui/icons/icons.config.json` and `bun run icons` regenerates `src/ui/icons/icons.generated.tsx` and `public/agent/icons.json`. Never write `<path>` by hand and never nest an icon inside another `Icon`.
- **Button**: background, border and shadow live on `::before` so pressing scales only the box (`scale(0.96)`), not the label. `--btn-ring` and `--btn-backdrop` are secondary only. Filled variants nudge the label 1px down with `padding-top`; ghost is excluded.

## Component catalog (src/ui, import from `@/ui`)

- Typography/content: `Text`, `Heading`, `Link`, `Kbd`, `Badge`, `CodeBlock`
- Layout: `Box`, `Stack`, `Grid`, `Container`, `Divider`, `Card`, `Table`
- Utilities/feedback: `VisuallyHidden`, `Icon`, `Spinner`, `Skeleton`, `Progress`, `Alert`, `Toast`, `Avatar`
- Controls (Base UI): `Button`, `ButtonLink`, `Field`, `Input`, `Textarea`, `Checkbox`, `RadioGroup` + `Radio`, `Switch`, `Select`, `Slider`
- Overlays/navigation (Base UI): `Dialog`, `Tooltip` (+ `TooltipProvider`), `Popover`, `Menu`, `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`

Rules that matter when using them:

- Every control needs an accessible name: use `Field label`, or the component's own `label`/`legend`, or `aria-label`.
- `Heading as` sets the outline level, `size` (1-6) only the look. One `h1` per page, no skipped levels.
- `Stack`/`Grid` with `as="ul"` or `"ol"` require `li` children.
- `Tooltip` content is supplementary: the trigger needs its own accessible name.
- Do not use `--color-tertiary-foreground` for placeholders or required text without checking contrast.
- Verification: `bun run typecheck && bun run lint && bun run test`; stories (axe, light and dark) run with `bunx vitest run --project storybook`.

## Agent layer

- Consumers (other agents) read `public/agent/manifest.json`, `public/agent/tokens.json`, `public/agent/icons.json`, `public/llms.txt`, `public/llms-full.txt` or the MCP server in `mcp/` (`search_icons`, `get_icon`). See `AGENT_GUIDE.md`.
- These files are generated by `bun run agent-docs` (and `bun run icons` for the icon set) from types, TSDoc, tokens and `src/ui/agent-meta.json`. Never edit them by hand.
- When you add or change a component: write TSDoc with `@example` and `@default`, add or update its entry in `src/ui/agent-meta.json`, run `bun run agent-docs` and `bun mcp/smoke-test.mjs`, and commit the regenerated files. When you add an icon, add its name to `src/ui/icons/icons.config.json` and run `bun run icons`.

## Theming and color gotchas

- The demo app uses `next-themes` with `attribute="data-theme"` (see `src/app/providers.tsx`). The library itself does not depend on it: tokens only read `data-theme` or the OS preference.
- Opaque floating surfaces (dialogs, popups) use `--color-modal` / `--color-card`. Do not build them with `color-mix(in oklch, <near-neutral> ...)`: the foreground is almost neutral, its oklch hue is meaningless and renders pink. Use `in oklab`, or mix with `transparent`.

## Navigation (LinkProvider)

Components that navigate read the link component from `LinkProvider` (`src/ui/components/Link/LinkContext.tsx`) through `useLinkComponent()`. A new component that renders a link must use that hook instead of a bare `a`, and must be a client component. Do not add per-link `render` props.
