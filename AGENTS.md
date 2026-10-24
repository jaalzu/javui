<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ui-lib conventions

- Library code lives in `src/ui`. Tokens are DTCG JSON in `src/ui/tokens/*.json`; `bun run tokens` generates `tokens.css` and `tailwind.css`. Never edit those by hand, and rerun `bun run tokens` after every JSON change (the JSON is the source, the CSS is not regenerated automatically).
- Components use only semantic tokens. Never use `--primitive-*` or hardcoded colors, sizes or fonts.
- Controls with behavior (Button, Input, Checkbox, Radio, Switch, Select, Dialog, Tooltip, Tabs, Field, Menu, Popover, Slider...) are built on Base UI (`@base-ui/react`); do not reimplement its keyboard, focus or ARIA logic.
- Own components (Text, Heading, Card, Stack, Grid, Container, ...) render correct semantic HTML. `as` only accepts elements valid for that component.
- Every component needs: TSDoc on props, a story (light and dark), a Testing Library test, and passing axe checks.
- Breakpoints: mobile first with `min-width`. `--breakpoint-sm|md|lg|xl` (40/48/64/80rem) are documentation only, since CSS cannot read variables in `@media`; write the rem value. Max-width queries use `value - 0.01rem`.
- Commands: `bun run storybook`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run icons`.

## Foundations (tokens)

Order of design: color, typography, shape, spacing, elevation, motion.

- **Color** (flat `--color-*`): surfaces (`page, card, sunken, highlight, modal`), component (`component` + `-hover/-active/-on-sunken`), transparent (`transparent-hover/-active`), foreground (`primary|secondary|tertiary|disabled-foreground`), inverted (`inverted-solid` + states, `on-inverted-foreground`), brand, states (`positive|warning|info|danger` each with `-solid`, `-solid-hover`, `-subtle`, `-foreground`, `on-*-solid-foreground`), borders (`border-default|strong|disabled`, `brand-border-focus` is the focus ring), `disabled`, `overlay`. Brand color tokens derive from `--color-brand-solid` with `color-mix`; `brand-foreground` mixes it 75% with `primary-foreground` to stay readable on page and card. The focus ring (`brand-border-focus`) stays text-colored. Light in `:root`, dark in `[data-theme="dark"]` and the OS media query. Use `color-mix(in oklab, ...)` with transparent or near-neutral colors.
- **Shadows** (4 + inset ring): `--shadow-inset-ring`, `--shadow-default`, `--shadow-raised`, `--shadow-large`, `--shadow-extra-large`. Outline Badge uses the inset ring; Slider thumb uses default; secondary Button uses raised; Menu, Select, Popover, Toast use large; Dialog and the search palette use extra-large.
- **Typography**: `--font-size-10 ... 56` (named by px). Text styles `--text-heading-1..6-*` (fluid clamp), `--text-body-lg|body|body-sm`, `label`, `caption-lg|caption|caption-sm`, `emphasis` (serif italic), `code|code-sm|code-xs`. Weights: 400, 500, 600 only. DM Sans (optical sizing), Commit Mono, Source Serif 4 italic. Headings are never italic; `Text variant="emphasis"` is. Small styles: `label` for controls and fields (buttons, form labels, tabs); `body-sm` for secondary reading text (descriptions, helper text); `caption` for metadata (timestamps, counters, footnotes). Caption `sm` (10px) is intentional and meant to be used with `casing="uppercase"`, where the extra tracking keeps it legible; avoid it for lowercase running text.
- **Layout**: `--header-height` is the sticky site header height (3.55rem / 56.8px). `SiteHeader` uses it directly, and `html` uses `scroll-padding-top: calc(var(--header-height) + var(--space-4))` so in-page anchors clear the header.
- **Radius**: The radius scale derives from `--radius-base`, the single source (0.5rem). `sm` = 0.5x, `md` = 1x, `lg` = 1.5x and `xl` = 2x via `calc`, so the default scale is 4/8/12/16px; `none` and `full` stay fixed. Nested-radius formulas keep reading the same scale.
- **Icons**: `--size-icon-sm|md|lg|xl` = 16/20/24/32px, and `--icon-gap-sm|md|lg|xl` for the space between an icon and its label. `Icon` reads `--icon-size`; icon size follows control size: sm 16, md 20, lg 24. `Button` sets it from `--btn-icon` and `--btn-gap`, and the same per-size rule applies to ButtonLink, Select, Input, Badge and every other sized control (single-size controls use md unless compact). Controls never sniff children: icons go in explicit `startIcon`/`endIcon` props, and the shared `IconSlot`/`useIconSlots` (`src/ui/components/Icon/IconSlot.tsx`, position from `src/ui/utils/iconPosition.ts`) sizes them with `--icon-size`, spaces them with an `--icon-gap-*`, makes them `aria-hidden`, and sets `data-icon="start|end|both|only"`. `loading` counts as a start slot. Icon-only controls need `aria-label`. Do not pass `size` to a slot icon. Glyphs come from Phosphor (256x256, `fill="currentColor"`) as named components built by `createIcon` (`src/ui/components/Icon/createIcon.tsx`); the set lives in `src/ui/icons/icons.config.json` and `bun run icons` regenerates `src/ui/icons/icons.generated.tsx` and `public/agent/icons.json`. Never write `<path>` by hand and never nest an icon inside another `Icon`.
- **Button**: heights are `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. Background, border and shadow live on `::before` so pressing scales only the box (`scale(var(--motion-scale-press))`), not the label. `--btn-ring` and `--btn-backdrop` are secondary only. Filled variants nudge the label 1px down with `padding-top`; ghost is excluded. Because Phosphor glyphs carry their own empty space, the icon side gets `calc(var(--btn-px) * 0.5)` padding (a variable, never a hardcoded px value); icon-only is square.
- Button pressed = only the scale on `::before`, no background change. The `*-active` state tokens apply to menu items, tabs and rows, not to Button.
- **Motion** (tokens in `src/ui/tokens/motion.json`): durations `fast` 100 / `base` 160 / `slow` 240 (always under 300ms). Easing: `standard` for color/hover; `out` for entrances and anything that responds to the user; `in` for exits only; `in-out` for elements that move or morph on screen (tab underline). Scale tokens: press/tooltip `0.97`, popup `0.95`, modal `0.96`. Never `scale(0)` (minimum 0.9). Never `transition: all`. Animate only `opacity`, `transform`, `color`, `background`, `box-shadow`. Exceptions: Accordion panel `height` (Base UI `--accordion-panel-height`), Collapsible panel `height` (`--collapsible-panel-height`) and the Tabs underline. Hover, color, focus and press use `fast`/`standard` (press transform uses `out`). Menu, Select and Popover use `base`/`out`/`--motion-scale-popup` with `transform-origin: var(--transform-origin)`. Tooltip uses `fast`/`out`/`--motion-scale-tooltip`; `[data-instant] { transition-duration: 0ms }` and delay only on the first tooltip via `TooltipProvider`. Dialog and backdrop use `slow`/`out`; dialog origin is `center` and the resting `translate(-50%, -50%)` must stay composed with `scale(var(--motion-scale-modal))`. Sheet (Drawer) slides from the side with `slow`/`out` and follows `--drawer-swipe-movement-x`. Do not animate theme changes (`disableTransitionOnChange` on next-themes), the focus ring, or list/menu items on every hover. `prefers-reduced-motion` is one global block in `src/ui/styles/global.css`: drop transform/scale, keep short fades; Spinner slows down, Skeleton is static. Not built yet (document only): stagger, scroll reveal, hold-to-confirm, drag. Blur is a last-resort tool, no token.

### Nested radius

A container that has padding AND contains children with their own visible background, highlight, border or shadow touching its curve defines two custom properties, and the child derives its radius from them:

```css
.container {
  --radius-outer: var(--radius-lg);
  --inner-gap: var(--space-1);
  border-radius: var(--radius-outer);
  padding: var(--inner-gap);
}
.child {
  border-radius: max(
    var(--radius-sm),
    calc(var(--radius-outer) - var(--inner-gap))
  );
}
```

Keep `--inner-gap` equal to the container's real padding (use the same token in `padding`). Use only semantic radius/space tokens.

### States

- No background at rest (ghost, menu items, select options, tabs, list and table rows): hover `--color-transparent-hover`, pressed/selected/highlighted `--color-transparent-active`.
- Background at rest (input, secondary button, toggle): hover `--color-component-hover`. Pressed uses `--color-component-active` for input and toggle; Button pressed does not change background.
- Filled variants (inverted, brand, danger): use their own `-hover` tokens. Button pressed does not change background.
- `:focus-visible` on every interactive component: `outline: var(--focus-ring-width) solid var(--color-brand-border-focus); outline-offset: var(--focus-ring-offset);`.
- Disabled: `--color-disabled` background, `--color-disabled-foreground` text, `--color-border-disabled` border, no hover, `cursor: not-allowed`.
- Never hand-write `color-mix` for a state when a token exists. If a token is missing, report it instead of inventing one.

### Validation states

The same policy applies to Input, Textarea, Select, Checkbox, RadioGroup, Switch and Slider.

| State | Rule |
|---|---|
| Invalid | Border `--color-danger-border-default` (the focus ring stays the standard one). The error message sits below the control in `--color-danger-foreground` and always has a small `WarningIcon`, so color is never the only signal. `aria-invalid="true"`; the message is linked with `aria-describedby` and announced politely (`aria-live="polite"`). |
| Required | The label shows the word "Required" in `--color-secondary-foreground` (not just an asterisk), and the control gets the native/ARIA `required` attribute. |
| Read-only | Background `--color-sunken`, no hover change, text color unchanged (never dimmed), still focusable and selectable. Distinct from disabled. |
| Loading | A small `Spinner` at the end of the control or next to its label, the control is not interactive, and `aria-busy="true"`. |
| Timing | Errors show after blur or submit, never on the first keystroke. Field defaults to `validationMode="onBlur"`; the consumer shows `error` from a validation run on blur/submit. |

Pass validation state to `Field` (`error`, `required`, `readOnly`, `loading`), never wire `aria-describedby` or render a loose red error text by hand. Omit `Field` `label` when the control renders its own label or legend (Checkbox, RadioGroup, Switch, Slider); those controls also accept the four props directly and inherit them inside `Field`. State colors use the motion tokens (`fast`/`standard`).

### Surface composition

There are five surfaces. Card sits on page, sunken and highlight sit inside card, and modal floats above the page.

| Level | Token | Use |
|---|---|---|
| Page | `--color-page` | The base surface. Everything sits on it. |
| Card | `--color-card` | Content blocks on the page: cards, panels, table rows. |
| Sunken | `--color-sunken` | Recessed areas inside a card: code blocks, wells, inset fields. |
| Highlight | `--color-highlight` | Highlighted panel inside a card: a metric, total or goal. Dark: lighter than the card; light: soft gray. |
| Floating | `--color-modal` | Layers above the page: dialog, menu, select list, popover. |

Rules:

- Maximum 3 nested levels.
- No card inside a card: use `--color-sunken`, `--color-highlight` or an `hr` hairline instead.
- Highlight sits inside a card, is never nested, and is not for code or inputs (use sunken).
- Modal floats above the page and is never used as a page background.
- Controls placed on sunken use `--color-component-on-sunken` (mark the container `data-surface="sunken"`).
- Controls placed on highlight use `--color-component`.
- At rest use a border or a shadow, never both.

### Touch targets

Every interactive control must have a hit area of at least 44px on touch devices (`pointer: coarse`) and at least 24px otherwise. Use the shared mechanism; never enlarge the visible control for this.

- Compose `.touchTarget` (uses `::after`) or `.touchTargetBefore` (uses `::before`) from `src/ui/styles/touchTarget.module.css`. Both are `position: relative`; under `pointer: coarse` they add a transparent, centered pseudo-element sized `max(100%, var(--size-target-comfortable))`. No visual or layout change. Use `.touchTargetBefore` only when the component already uses `::after`, as Tabs does for its indicator.
- Adjacent controls with less than 8px gap (Tabs, Pagination, button groups) must not overlap: increase the gap under `pointer: coarse` with a semantic space token (`--space-3` for Tabs and Pagination) or limit the extra area to the axis without neighbors.
- Stacked rows (Menu items, Select options) get a real `min-height: var(--size-target-comfortable)` under `pointer: coarse` instead of a pseudo-element.
- `Input` cannot host a pseudo-element (replaced element): it renders an internal wrapper that carries `.touchTarget`. `Link` only gets a hit area with `standalone`, not when inline in a sentence. Dialog's close control is a `Button` and is covered by it.
- Verify touch stories with `[data-touch-debug]`, which draws the hit areas.

## Component catalog (src/ui, import from `@/ui`)

- Typography/content: `Text`, `Heading`, `Link`, `Kbd`, `Badge`, `Label`, `CodeBlock` (server entry `@/ui/server`)
- Layout: `Stack`, `Grid`, `Container`, `AspectRatio`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`), `Table`, `ScrollArea`
- Utilities/feedback: `VisuallyHidden`, `Icon`, `Spinner`, `Skeleton`, `Progress`, `Alert`, `Toast`, `Avatar` (+ `AvatarGroup`), `EmptyState`
- Controls (Base UI): `Button`, `ButtonGroup` (+ `ButtonGroupSeparator`), `ButtonLink`, `Field`, `Input`, `Textarea`, `Checkbox`, `RadioGroup` + `Radio`, `Switch`, `Select`, `Combobox`, `Slider`, `ToggleGroup`
- Overlays/navigation (Base UI): `Dialog`, `Tooltip` (+ `TooltipProvider`), `Popover`, `Menu`, `Tabs`, `Accordion`, `Collapsible`, `Sheet`, `Breadcrumb`, `Pagination`, `Sidebar`

Rules that matter when using them:

- Every control needs an accessible name: use `Field label`, or the component's own `label`/`legend`, or `aria-label`. An icon-only control needs `aria-label`.
- Put icons in `startIcon`/`endIcon` (Button, ButtonLink, Menu items, Select trigger, Input, Textarea, Tabs items, Badge, Alert, Toast, Accordion items, Link end, Breadcrumb items). Never pass an icon as the only child and never pass `size` to a slot icon.
- `Heading as` sets the outline level, `size` (1-6) only the look. One `h1` per page, no skipped levels.
- `Stack`/`Grid` with `as="ul"` or `"ol"` require `li` children.
- `Tooltip` content is supplementary: the trigger needs its own accessible name.
- Do not use `--color-tertiary-foreground` for placeholders or required text without checking contrast.
- `CodeBlock` is a Server Component: import it from `@/ui/server`, not `@/ui`. It highlights known languages with Shiki through the semantic `--syntax-*` tokens. Never color code or tokens by hand; unknown languages fall back to plain text, and `highlight={false}` opts out.
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
