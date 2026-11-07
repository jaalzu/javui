# ui-lib architecture contract

This document describes the rules for the internal v1 design system. It is intentionally
stricter than a general-purpose React component library: the goal is a predictable system for
the app and for future source installation.

## Component patterns

### Compound components

Use a compound API when parts share state or a semantic relationship. The root owns shared
context and the parts own their markup. Do not turn simple components such as `Badge`, `Alert`,
`Heading` or `Spinner` into compound components without a real shared state or semantic
relationship.

### Hooks

Hooks own reusable state, effects, context reads and integration policy. Components own HTML,
ARIA, visual states and composition. Extract a hook when logic is reused, independently testable,
or makes a component difficult to reason about.

The shared controlled/uncontrolled policy is `useControllableState`. Domain guards remain in the
component: for example, `Modal` decides whether a close is allowed before committing the next
open state.

### Container and presentational code

Do not split every component into `Container` and `View` files. Prefer hooks plus compound parts.
Use a separate presentational component only when the stateful container is genuinely complex or
the view is reused independently.

## Server Components

Components are Server Component-compatible by default. A component requires `"use client"` only
when it uses state, effects, event handlers, context, browser APIs, Base UI behavior, or a client
hook. Static primitives such as `Text`, `Heading`, `Stack`, `Grid`, `Container` and `Card` should
remain usable from Server Components.

`CodeBlock` has a server-only entry point and must be imported from `@/ui/server`. Consumers using
Next.js should not add `"use client"` to an entire page just to render a server-only component.

## Styling hooks

Public hooks are component-level custom properties documented in component TSDoc. They are the
supported visual extension points and default to semantic tokens:

```css
.card {
  --card-spacing: var(--space-6);
  padding: var(--card-spacing);
}
```

Internal variables such as `--icon-size` or generated responsive variables are implementation
details. Consumers should customize hooks or pass `className`, not target hashed CSS Module
selectors.

## API and state contracts

- Every component has predictable defaults and forwards valid native attributes.
- Controlled and uncontrolled props use the same state transition semantics.
- Invalid, required, read-only and loading states use the same Field contract.
- Every interactive state has a non-color signal where needed and an accessible name.
- Components do not require application-specific providers except documented integrations such as
  `LinkProvider`.
- Integrations are opt-in: routing, theme management and data fetching are not hard dependencies
  of static primitives.

## Performance

Do not add memoization, `useTransition` or virtualization preemptively. First measure a real slow
render. Use `useTransition` for non-urgent UI updates such as filtering or navigation feedback,
memoize expensive pure subtrees when their props are stable, and virtualize only long repeated
lists where rendering all rows is measurably expensive. Preserve keyboard navigation and screen
reader semantics when virtualizing.
