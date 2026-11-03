# Distribution plan

The v1 system is intentionally an internal design system first. It is not published as a stable
npm package and it does not expose a source-install CLI yet.

## Current consumption

The repository consumes the library through the `@/ui` path alias. A consumer app must import the
semantic token stylesheet, global styles and fonts, and must provide `LinkProvider` when its
navigation should use framework links. Static primitives remain Server Component-compatible;
interactive Base UI components require a client boundary.

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
