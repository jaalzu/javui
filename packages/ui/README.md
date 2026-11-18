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

Optional, after the tokens:

- `@javui/ui/base.css` — document reset in `@layer base`: `box-sizing`, page background and body typography from tokens, the global `:focus-visible` ring, `::selection`, tabular numbers and the reduced-motion block.
- `@javui/ui/fonts.css` — `@font-face` rules for DM Sans (with optical sizing and italics) and Commit Mono. Skip it to keep the system font fallbacks defined in the tokens.

`@javui/ui/global.css` is the shortcut that imports `tokens.css`, `base.css` and `fonts.css` for you. `@javui/ui/tailwind.css` is separate and optional (see [Tailwind](#tailwind-optional)).

Component styles live in CSS Modules and load automatically when you import the component. The package needs a bundler that processes CSS, such as Next.js or Vite.

### Tailwind v4

Import in this canonical order: `tailwindcss`, `@javui/ui/tokens.css`, `@javui/ui/base.css`, `@javui/ui/tailwind.css`.

```css
@import "tailwindcss";
@import "@javui/ui/tokens.css";
@import "@javui/ui/base.css";
@import "@javui/ui/tailwind.css";
```

`base.css` is optional; when you use it, it goes after `tokens.css` and before `tailwind.css`. `@javui/ui/global.css` (`tokens.css` + `base.css` + `fonts.css`) replaces the middle two imports.

Component CSS ships in `@layer components`, and the package declares the layer order, so this works regardless of whether the library CSS loads before or after Tailwind. `base.css` is wrapped in `@layer base`; preflight sits there too, below components. Tailwind utilities sit in `utilities`, above both, so utilities such as `p-8` or `rounded-none` override component styles and document defaults. Tokens stay unlayered, so `tokens.css` values win over Tailwind theme variables. Without Tailwind the components look the same.

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
import "@javui/ui/fonts.css";
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

Machine-readable docs ship in the package: `@javui/ui/agent/manifest.json`, `tokens.json`, `icons.json`, `llms.txt` and `llms-full.txt`. The manifest's `exports` array is the flat index of every public export with its import path (`@javui/ui`, or `@javui/ui/server` for `CodeBlock`); `components` and `foundations` group them for documentation.

## Compatibility and versioning

Requires React 19 and `@base-ui/react` `^1.9.0`. The package is at `0.x`: a minor release may contain breaking changes, so pin the range (`~0.1.0` or an exact version). MIT licensed.
