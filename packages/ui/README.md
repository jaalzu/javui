## Installation

Requires Next.js 16 (App Router), React 19 and `@base-ui/react` `^1.9.0`. Tested with Next.js 16.4.4 and React 19.3.0.

### New project

#### 1. Create the app

```sh
npx create-next-app@latest my-app --ts --app --no-tailwind --eslint
cd my-app
npm install @javui/ui @base-ui/react
```

#### 2. Add the CSS

In `app/globals.css`:

```css app/globals.css
@import "@javui/ui/tokens.css";
```

#### 3. Create the providers

```tsx app/providers.tsx
"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { LinkProvider, ToastProvider } from "@javui/ui";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LinkProvider component={NextLink}>
      <ToastProvider>{children}</ToastProvider>
    </LinkProvider>
  );
}
```

`Providers` is a client component because `next/link` is a function and a Server Component cannot pass it down.

#### 4. Use them in the layout

```tsx app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Existing project

#### 1. Install the packages

```sh
npm install @javui/ui @base-ui/react
```

#### 2. Add the token import

Add `@import "@javui/ui/tokens.css";` to your `app/globals.css`. Do not replace the file: your own styles stay as they are.

#### 3. Wrap your providers

If you already have `app/providers.tsx`, wrap your children with `LinkProvider` and `ToastProvider` (same imports as above) instead of creating another file. Keep it marked `"use client"`.

#### 4. Tailwind v4 (optional)

JavUI ships plain CSS Modules, so Tailwind is only needed to use the tokens as utilities. Install the PostCSS plugin:

```sh
npm install tailwindcss @tailwindcss/postcss
```

```js postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

Keep this order in `app/globals.css`:

```css app/globals.css
@import "tailwindcss";
@import "@javui/ui/tokens.css";
@import "@javui/ui/tailwind.css";
```

`tailwind.css` turns the tokens into utilities such as `bg-card` and `text-secondary-foreground`. Two things to know:

- Tailwind's `--radius-*` theme namespace overlaps with JavUI's radius tokens: map or rename one of the two if you use both.
- If some components stay unstyled or the HTML has no `class` attributes, a Tailwind Turbopack loader is processing JavUI's CSS. Remove it and keep the PostCSS plugin (see Troubleshooting).

The tokens only define variables. JavUI adds no page, reset or font styles, and each component loads its own CSS when you import it.

### Troubleshooting

| Symptom                                                | Fix                                                                                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Everything is unstyled                                 | Import `@javui/ui/tokens.css` in `app/globals.css`. With Tailwind, keep the order `tailwindcss`, `tokens.css`, `tailwind.css`.                  |
| The HTML has no `class` attributes                     | A Tailwind loader is applied to every `*.css` file (`turbopack.rules` with `@tailwindcss/turbopack`). Remove it and use `@tailwindcss/postcss`. |
| `useToastManager must be used within <Toast.Provider>` | Mount `ToastProvider` in `app/providers.tsx`.                                                                                                   |
| Functions cannot be passed to Client Components        | Keep `LinkProvider` inside a file marked `"use client"`.                                                                                        |
| `Cannot find module 'shiki'`                           | Install `shiki` if you use `CodeBlock`.                                                                                                         |

### Update

`@javui/ui` is `0.x`: a minor release may include breaking changes. Read `node_modules/@javui/ui/CHANGELOG.md` before updating and pin the version (`~0.1.0` or an exact version).
