import manifest from "../../../../public/agent/manifest.json";

export type NavLink = { href: string; label: string };

/** General documentation pages, in reading order. */
export const generalSections: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
];

export const foundationSections: NavLink[] = [
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/colors", label: "Colors" },
  { href: "/docs/surfaces", label: "Surfaces" },
  { href: "/docs/typography", label: "Typography" },
];

export const layoutSections: NavLink[] = [
  { href: "/docs/layout", label: "Layout" },
];

/** Flat list used by the global search and mobile header. The sidebar uses grouped navigation. */
export const sections: NavLink[] = [
  ...generalSections,
  ...foundationSections,
  ...layoutSections,
];

export const componentsIndex: NavLink = {
  href: "/docs/components",
  label: "Components",
};

/** Every component, sorted by name. The same order is used in the sidebar, the index and Previous/Next. */
const layoutCategories = new Set(["layout", "patterns", "utility"]);

/** Documented later; kept in the library but hidden from the docs catalog for now. */
const hiddenComponents = new Set(["Sidebar"]);

/** Structural components and semantic patterns belong to Layout & Utilities, not Components. */
export const layoutComponentLinks: NavLink[] = manifest.components
  .filter((c) => layoutCategories.has(c.category) && !hiddenComponents.has(c.name))
  .map((c) => ({ href: `/docs/components/${c.name}`, label: c.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

/** Components are the component/atom catalog; layout and utility primitives are listed separately. */
export const componentLinks: NavLink[] = manifest.components
  .filter((c) => !layoutCategories.has(c.category) && !hiddenComponents.has(c.name))
  .map((c) => ({ href: `/docs/components/${c.name}`, label: c.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

/** Providers and hooks: documented pages, but not components. */
const providersAndHooks =
  (manifest as unknown as { providersAndHooks?: { name: string }[] }).providersAndHooks ?? [];

export const providerLinks: NavLink[] = providersAndHooks.map((c) => ({
  href: `/docs/components/${c.name}`,
  label: c.name,
}));

/** Reading order for Previous and Next. */
export const pageOrder: NavLink[] = [
  ...generalSections,
  ...foundationSections,
  ...layoutSections,
  componentsIndex,
  ...componentLinks,
  ...layoutComponentLinks,
  ...providerLinks,
];

export function neighbors(href: string): { prev?: NavLink; next?: NavLink } {
  const i = pageOrder.findIndex((p) => p.href === href);
  if (i === -1) return {};
  return { prev: pageOrder[i - 1], next: pageOrder[i + 1] };
}
