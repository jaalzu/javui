# @javui/ui for agents

Machine-readable docs ship in the package: `@javui/ui/agent/manifest.json` and `tokens.json`. The manifest's `exports` array is the flat index of every public export with its import path (`@javui/ui`, or `@javui/ui/server` for `CodeBlock`); `components` and `foundations` group them for documentation. The same guide is in the package README.

Use the shipped docs instead of guessing. Start with `README.md`; consult `agent/manifest.json` for components and `agent/tokens.json` for the theme. They are the package's only machine-readable data.

## Copy this into your project's AGENTS.md or CLAUDE.md

```md
## @javui/ui
- Read `node_modules/@javui/ui/README.md`, then consult `node_modules/@javui/ui/agent/manifest.json` for components and `tokens.json` for theme values before writing UI.
- Look up each component in `node_modules/@javui/ui/agent/manifest.json`; use only components, props and variants listed there.
- Do not invent components, props, variants or CSS variables. Do not copy APIs from shadcn, Radix or MUI.
- Import from `@javui/ui`; import `CodeBlock` only from `@javui/ui/server`.
- Use semantic tokens (`--color-*`, `--space-*`, `--text-*`). Never hardcode colors, spacing or fonts, and never use `--primitive-*`.
- Every control needs an accessible name: `Field label`, the component's `label`/`legend`, or `aria-label`.
- Pages are Server Components by default. Add `"use client"` only where state, effects, event handlers or Base UI behavior are needed.
- If a component, prop or token is missing, stop and ask or report it. Do not improvise.
```

## How to look things up

Run these in the consuming project. JSON lookup uses `node`; use `jq` instead if you have it.

```sh
# Every public export and its import path (one line each)
node -e 'const m=require("@javui/ui/agent/manifest.json");for(const e of m.exports)console.log(e.name+"  "+e.import)'

# One top-level component: import, props, defaults, examples
node -e 'const c=require("@javui/ui/agent/manifest.json").components.find(c=>c.name==="Select");console.log(JSON.stringify(c,null,2))'

# One part, provider, hook or foundation (compound parts are nested)
node -e 'const m=require("@javui/ui/agent/manifest.json");const all=[...m.components.flatMap(c=>[c,...(c.parts??[])]),...m.foundations,...m.providersAndHooks];console.log(JSON.stringify(all.find(c=>c.name==="ModalContent"),null,2))'

```

`manifest.json` keeps `components` (top level), `.parts` inside compound components, `foundations`, `providersAndHooks` and `exports` (the flat index). The `.d.ts` files under `node_modules/@javui/ui/dist/components/<Name>/` are the source of truth for types when the JSON is ambiguous.

## Common mistakes

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

## Icons

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
