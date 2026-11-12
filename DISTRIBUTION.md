# Distribution plan

The package is consumed from its built `dist` output and public exports.

## Current consumption

Consumer apps import `@javui/ui` or `@javui/ui/server`, never `@/ui`. Import `tokens.css` and optionally
`base.css`, `fonts.css`, `tailwind.css` or `styles.css`; `CodeBlock` exists only in the server entry.
The package has no Next-specific directives and works with or without `cacheComponents`. In Next App
Router, mount `LinkProvider` inside a `use client` provider because `next/link` is a function.

## Package gate

Before publishing a package, verify all of the following in a clean Next.js app:

- a real `dist` or equivalent build output exists;
- public exports do not depend on the repository `@/` alias;
- CSS Modules and token CSS load without importing the docs app;
- peer dependencies and client/server entry points are explicit;
- light/dark themes work without `next-themes` as a library dependency;
- `LinkProvider` is the only required routing integration;
- the component, story, test and agent manifests agree.

## Future source registry

When the component APIs are stable, each registry item can describe:

- source `.tsx` and `.module.css` files;
- internal component dependencies;
- npm dependencies such as Base UI;
- token and global-style setup;
- the intended target path in the consumer app.

The registry must distribute the same source that is tested in this repository. It must not become
a second implementation. Until the stability gate passes, consumers should use the internal
package/workspace workflow instead of copying components into applications.
