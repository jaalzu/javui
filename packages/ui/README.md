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

- `@javui/ui/base.css` — document reset: `box-sizing`, page background and body typography from tokens, the global `:focus-visible` ring, `::selection`, tabular numbers and the reduced-motion block.
- `@javui/ui/fonts.css` — `@font-face` rules for DM Sans (with optical sizing and italics) and Commit Mono. Skip it to keep the system font fallbacks defined in the tokens.

`@javui/ui/global.css` is the shortcut that imports `tokens.css`, `base.css`, `utilities.css` and `fonts.css` for you. `@javui/ui/tailwind.css` is separate and optional (see [Tailwind](#tailwind-optional)).

Component styles live in CSS Modules and load automatically when you import the component. The package needs a bundler that processes CSS, such as Next.js or Vite. If your setup cannot follow per-component imports, `@javui/ui/styles.css` is a single stylesheet entry containing the package's CSS.

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

## Customizing

Semantic token names are the public API. Override them in your own CSS after importing the tokens:

```css
:root {
  --color-brand-solid: oklch(0.55 0.2 15);
  --radius-base: 0.375rem;
  --font-family-sans: "Inter", system-ui, sans-serif;
}
```

`--primitive-*` values and component-level variables such as `--btn-*` are internal and may change. Prefer overriding semantic tokens.

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

Machine-readable docs ship in the package: `@javui/ui/agent/manifest.json`, `tokens.json`, `icons.json`, `llms.txt` and `llms-full.txt`. Import components from `@javui/ui`, and `CodeBlock` from `@javui/ui/server`.

## Compatibility and versioning

Requires React 19 and `@base-ui/react` `^1.9.0`. The package is at `0.x`: a minor release may contain breaking changes, so pin the range (`~0.1.0` or an exact version). MIT licensed.
