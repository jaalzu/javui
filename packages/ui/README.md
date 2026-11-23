# @javui/ui

React-first, accessible UI components for React 19 and Next.js. Styling comes from semantic CSS tokens, and behavior, keyboard handling and ARIA are built on [Base UI](https://base-ui.com).

## Installation

```sh
bun add @javui/ui @base-ui/react
```

Use `npm install` or `pnpm add` with the same packages. Peer dependencies: `react` and `react-dom` `^19.0.0`, and `@base-ui/react` `^1.9.0`. `shiki` `^4.5.0` is an optional peer used only by the `@javui/ui/server` entry point (`CodeBlock`); install it with `bun add shiki` (or the equivalent for your package manager).

## CSS

Import the token sheet first. Everything the library renders reads these variables:

```css
@import "@javui/ui/tokens.css";
```

The package does not ship page styles: no `html`/`body` reset, no global `:focus-visible`, no fonts. Component CSS loads with each component. `@javui/ui/tailwind.css` is optional (see [Tailwind](#tailwind-optional)).

The package ships no fonts and no `@font-face` rules. `--font-family-sans`, `--font-family-emphasis` and `--font-family-mono` name DM Sans, Source Serif 4 and Commit Mono first and fall back to the system stack, so load the fonts you want in your own app (this repository's docs use the `@fontsource` packages).

Component styles live in CSS Modules and load automatically when you import the component. The package needs a bundler that processes CSS, such as Next.js or Vite.

### Tailwind v4

Import in this canonical order: `tailwindcss`, `@javui/ui/tokens.css`, `@javui/ui/tailwind.css`.

```css
@import "tailwindcss";
@import "@javui/ui/tokens.css";
@import "@javui/ui/tailwind.css";
```

Without Tailwind, import only `@javui/ui/tokens.css`.

Component CSS ships in `@layer components`, and the package declares the layer order, so this works regardless of whether the library CSS loads before or after Tailwind. Tailwind utilities sit in `utilities`, above components, so utilities such as `p-8` or `rounded-none` override component styles. Tokens stay unlayered, so `tokens.css` values win over Tailwind theme variables. Without Tailwind the components look the same.

In Next.js use `@tailwindcss/postcss`; do **not** apply a Tailwind loader to every `*.css` (for example `turbopack.rules` with `@tailwindcss/turbopack`). That loader swallows the library's CSS Modules: the HTML loses its `class` attributes and components render unstyled.

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

## Next.js (App Router)

Client-side navigation is wired once with `LinkProvider`. It lives in a client component because `next/link` cannot be passed as a prop from a Server Component.

`app/providers.tsx`:

```tsx
"use client";

import Link from "next/link";
import { LinkProvider } from "@javui/ui";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <LinkProvider component={Link}>{children}</LinkProvider>;
}
```

`app/layout.tsx`:

```tsx
import "@javui/ui/tokens.css";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import { Shell } from "./shell";

export default function Layout({ children }: { children: ReactNode }) {
  return <html data-theme="light"><body><Providers><Shell>{children}</Shell></Providers></body></html>;
}
```

`Shell` is the playground's own layout wrapper; replace it with your markup.

## Vite and other bundlers

`LinkProvider` is optional. Without it, links render as plain `<a>` elements.

## Light and dark theme

Set `data-theme` on the root element: `light` or `dark`. The tokens also follow the OS preference when no explicit light theme is set.

```html
<html data-theme="dark">
```

Set the attribute before the first paint (server render or a blocking script) to avoid a flash of the wrong theme.

## Dark mode with next-themes

`next-themes` sets `data-theme` before hydration with its blocking script. Add `suppressHydrationWarning` to `<html>` because that script changes the attribute before React hydrates:

```tsx
"use client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

```tsx
<html lang="en" suppressHydrationWarning>
```

With `defaultTheme="system"` and `enableSystem`, the attribute is never `"system"`: `next-themes` resolves it to `"light"` or `"dark"` before the first paint, matching the OS preference. Keep the provider in the root layout so the theme is fixed before the first render.

## Customizing

Semantic token names are the public API. Override them in your own CSS after importing the tokens:

```css
:root {
  --color-brand-solid: oklch(0.55 0.2 15);
  --radius-base: 0.375rem;
  --font-family-sans: "Inter", system-ui, sans-serif;
}
```

`--primitive-*` values and component-level variables such as `--btn-*` are internal and may change. Prefer overriding semantic tokens. The full reference is in [TOKENS.md](https://github.com/jaalzu/javui/blob/main/packages/ui/TOKENS.md).

## Usage

```tsx
import { Button, Field, Input } from "@javui/ui";

export function SignIn() {
  return (
    <form>
      <Field label="Email" description="We only use it for receipts.">
        <Input type="email" autoComplete="email" />
      </Field>
      <Button type="submit" size="sm">Submit</Button>
    </form>
  );
}
```

## Tailwind (optional)

`@javui/ui/tailwind.css` exposes the tokens as Tailwind v4 `@theme` variables. Caution: some variable names, such as `--radius-*`, can overlap with Tailwind v4's own theme namespace; review the integration if you consume both.

## AI agents

Machine-readable docs ship in the package: `@javui/ui/agent/manifest.json`, `tokens.json`, `icons.json`, `llms.txt` and `llms-full.txt`. The manifest's `exports` array is the flat index of every public export with its import path (`@javui/ui`, or `@javui/ui/server` for `CodeBlock`); `components` and `foundations` group them for documentation. The same guide ships as `agent/AGENTS.md`.

Use the shipped docs instead of guessing. Start with this README, then `agent/llms.txt`, and look up each component in `agent/manifest.json`.

### Copy this into your project's AGENTS.md or CLAUDE.md

```md
## @javui/ui
- Read `node_modules/@javui/ui/README.md` and `node_modules/@javui/ui/agent/llms.txt` before writing UI.
- Look up each component in `node_modules/@javui/ui/agent/manifest.json`; use only components, props and variants listed there.
- Do not invent components, props, variants or CSS variables. Do not copy APIs from shadcn, Radix or MUI.
- Import from `@javui/ui`; import `CodeBlock` only from `@javui/ui/server`.
- Use semantic tokens (`--color-*`, `--space-*`, `--text-*`). Never hardcode colors, spacing or fonts, and never use `--primitive-*`.
- Every control needs an accessible name: `Field label`, the component's `label`/`legend`, or `aria-label`.
- Pages are Server Components by default. Add `"use client"` only where state, effects, event handlers or Base UI behavior are needed.
- If a component, prop or token is missing, stop and ask or report it. Do not improvise.
```

### How to look things up

Run these in the consuming project. JSON lookup uses `node`; use `jq` instead if you have it.

```sh
# Every public export and its import path (one line each)
node -e 'const m=require("@javui/ui/agent/manifest.json");for(const e of m.exports)console.log(e.name+"  "+e.import)'

# One top-level component: import, props, defaults, examples
node -e 'const c=require("@javui/ui/agent/manifest.json").components.find(c=>c.name==="Select");console.log(JSON.stringify(c,null,2))'

# One part, provider, hook or foundation (compound parts are nested)
node -e 'const m=require("@javui/ui/agent/manifest.json");const all=[...m.components.flatMap(c=>[c,...(c.parts??[])]),...m.foundations,...m.providersAndHooks];console.log(JSON.stringify(all.find(c=>c.name==="ModalContent"),null,2))'

# One section of llms-full.txt, without loading the whole file
awk '/^## Select$/{p=1;print;next} p&&/^## /{exit} p' node_modules/@javui/ui/agent/llms-full.txt
awk '/^### ModalContent$/{p=1;print;next} p&&/^#{2,3} /{exit} p' node_modules/@javui/ui/agent/llms-full.txt
```

`manifest.json` keeps `components` (top level), `.parts` inside compound components, `foundations`, `providersAndHooks` and `exports` (the flat index). `llms.txt` is the short index; `llms-full.txt` has every section. The `.d.ts` files under `node_modules/@javui/ui/dist/components/<Name>/` are the source of truth for types when the Markdown is ambiguous.

### Common mistakes

| Mistake | Correction |
| --- | --- |
| `SelectTrigger` / `SelectContent` / `SelectItem` parts | `Select` is data-driven: `<Field label="Country"><Select items={countries} placeholder="Choose one" /></Field>` (`examples/Select`). |
| Omitting `closeLabel` on `ModalContent` or `Sheet` | Required: `<ModalContent title="Filters" closeLabel="Close filters" />`, `<Sheet trigger="Open filters" title="Filters" closeLabel="Close filters" />`. |
| `description` or `color` on `ModalContent` for an alert dialog | Both go on the root: `<Modal role="alertdialog" color="critical" description="This permanently removes the project."><ModalContent title="Delete project?" closeLabel="Close delete confirmation" /></Modal>`. `ModalContent` has no `color`. |
| `<Collapsible title="Advanced">` | There is no `title`. Compose: `<Collapsible><CollapsibleTrigger>Show more</CollapsibleTrigger><CollapsibleContent>…</CollapsibleContent></Collapsible>` (`examples/Collapsible`). |
| `<Text variant="body-sm">` | `body-sm` is a CSS style, not a variant. Real variants: `body`, `label`, `caption`, `emphasis`, `code`. Use `<Text size="sm">Regular body text.</Text>` (`TextSize` is separate). |
| Calling `useToast()` without a provider | Mount `<ToastProvider>` in `Providers`. Without it Base UI throws `useToastManager must be used within <Toast.Provider>.` See `examples/Toast/ToastDemo.tsx`. |
| Passing `next/link` from a Server Component | `LinkProvider` must live in a `"use client"` file. Use the complete `providers.tsx` below. |
| `import { CodeBlock } from "@javui/ui"` | `import { CodeBlock } from "@javui/ui/server"`; it is server-only, highlights with Shiki and needs `shiki` installed. `<CodeBlock language="tsx" label="Example" lineNumbers code={code} />` (`examples/CodeBlock`). |
| Applying a Tailwind loader to every `*.css` | In Next use `postcss.config.mjs` with `@tailwindcss/postcss`. A loader such as `@tailwindcss/turbopack` on all CSS strips the library's CSS Modules and components render unstyled. |
| Importing CSS in arbitrary order | `tailwindcss` → `@javui/ui/tokens.css` → `@javui/ui/tailwind.css`. Without Tailwind: only `tokens.css`. Never skip `tokens.css`. |
| `Button variant="default" \| "destructive" \| "link"`, or `isLoading` | Variants: `primary`, `secondary`, `outline`, `ghost`, `accent`, `danger`. Use `loading`; use `href` for navigation. `<Button variant="secondary">Cancel</Button>` (`examples/Button`). |
| `Field` with `hint`, `errorMessage`, or manual `aria-describedby` | `<Field label="Email" description="We only use it for receipts." error={errors.email} required><Input type="email" /></Field>`. Pass `required`, `readOnly`, `loading` to `Field`, not the control. Omit `label` for Checkbox, RadioGroup, Switch and Slider, which render their own. |
| `<Input label="Email">`, `leftIcon`, or `size` as native width | `<Field label="Name"><Input autoComplete="name" /></Field>` or `<Input aria-label="Search" startIcon={<MagnifyingGlassIcon />} />`. `size` (`xs`–`lg`) is the control height; icons use `startIcon`/`endIcon`. |
| `TabsList` / `TabsTrigger` / `TabsContent` | `<Tabs aria-label="Account sections" items={[{ value: "overview", label: "Overview", content: <p>Overview</p> }]} />`. Each item needs `value`, `label` and `content`; give the root an `aria-label`. |
| Table with `columns`/`rows`, or divs styled as a table | Compose semantic parts: `<Table aria-label="Team members"><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody>…</TableBody></Table>`. `columns`/`rows` are deprecated; use `align="end"` for numbers. |
| Assuming `TooltipProvider` is required | It is optional: it only shares the open delay across tooltips. `Tooltip` works without it. `ToastProvider` is required for `useToast`. |

`app/providers.tsx` in Next.js:

```tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LinkProvider, ToastProvider, TooltipProvider } from "@javui/ui";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LinkProvider component={Link}>
      <TooltipProvider delay={600}>
        <ToastProvider>{children}</ToastProvider>
      </TooltipProvider>
    </LinkProvider>
  );
}
```

### Icons

`agent/icons.json` lists every bundled Phosphor icon with its `component` name, categories, tags and weights.

```tsx
import { Button, CheckIcon, Input, MagnifyingGlassIcon } from "@javui/ui";

<Button startIcon={<CheckIcon />}>Done</Button>
<Input aria-label="Search" startIcon={<MagnifyingGlassIcon />} />
<CheckIcon weight="fill" />
```

- Import named icons from `@javui/ui` and pass them through `startIcon`/`endIcon` (or `item.startIcon` for Tabs and Accordion); never pass `size`, the control sets it.
- Use `weight="fill"` only for active or selected states. Icon-only controls still need `aria-label`.
- `createIcon` is internal: the package root exports the icon types and the generated set, not the factory. To add a glyph, a maintainer edits `src/icons/icons.config.json` and runs `bun run icons`.
- Prefer a bundled icon. If you must use another icon library, pass its SVG component directly to `startIcon`/`endIcon`; the slot sizes a direct `svg`. Do not wrap it in `Icon` (it expects the 256×256 Phosphor grid) and never hand-write paths.

## Compatibility and versioning

Requires React 19 and `@base-ui/react` `^1.9.0`. The package is at `0.x`: a minor release may contain breaking changes, so pin the range (`~0.1.0` or an exact version). MIT licensed.
