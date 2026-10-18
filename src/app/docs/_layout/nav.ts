import manifest from "../../../../public/agent/manifest.json";

export type NavLink = { href: string; label: string };

/** Documentation pages that are not components, in reading order. */
export const sections: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/usage", label: "Usage" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/colors", label: "Colors" },
  { href: "/docs/typography", label: "Typography" },
  { href: "/docs/agents", label: "For agents" },
];

export const componentsIndex: NavLink = {
  href: "/docs/components",
  label: "Components",
};

/** Every component, sorted by name. The same order is used in the sidebar, the index and Previous/Next. */
export const componentLinks: NavLink[] = manifest.components
  .map((c) => ({ href: `/docs/components/${c.name}`, label: c.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

/** Reading order for Previous and Next. */
export const pageOrder: NavLink[] = [
  ...sections,
  componentsIndex,
  ...componentLinks,
];

export function neighbors(href: string): { prev?: NavLink; next?: NavLink } {
  const i = pageOrder.findIndex((p) => p.href === href);
  if (i === -1) return {};
  return { prev: pageOrder[i - 1], next: pageOrder[i + 1] };
}
