import manifest from "../../../../public/agent/manifest.json";

export type NavLink = { href: string; label: string };

/** General documentation pages, in reading order. */
export const generalSections: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/usage", label: "Usage" },
];

export const foundationSections: NavLink[] = [
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/colors", label: "Colors" },
  { href: "/docs/surfaces", label: "Surfaces" },
  { href: "/docs/typography", label: "Typography" },
  { href: "/docs/animations", label: "Motion" },
];

export const layoutSections: NavLink[] = [
  { href: "/docs/layout", label: "Layout" },
  { href: "/docs/utilities", label: "Utilities" },
  { href: "/docs/alignment", label: "Alignment" },
  { href: "/docs/box", label: "Box" },
  { href: "/docs/margin", label: "Margin" },
  { href: "/docs/padding", label: "Padding" },
  { href: "/docs/position", label: "Position" },
  { href: "/docs/sizing", label: "Sizing" },
  { href: "/docs/truncation", label: "Truncation" },
  { href: "/docs/visibility", label: "Visibility" },
];

export const generalSectionsEnd: NavLink[] = [
  { href: "/docs/agents", label: "For agents" },
];

/** Flat list used by the global search and mobile header. The sidebar uses grouped navigation. */
export const sections: NavLink[] = [
  ...generalSections,
  ...foundationSections,
  ...layoutSections,
  ...generalSectionsEnd,
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
  ...generalSectionsEnd,
  componentsIndex,
  ...layoutComponentLinks,
  ...componentLinks,
  ...providerLinks,
];

export function neighbors(href: string): { prev?: NavLink; next?: NavLink } {
  const i = pageOrder.findIndex((p) => p.href === href);
  if (i === -1) return {};
  return { prev: pageOrder[i - 1], next: pageOrder[i + 1] };
}
