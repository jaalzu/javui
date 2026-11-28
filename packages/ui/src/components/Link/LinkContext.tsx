"use client";

import { createContext, useContext, type AnchorHTMLAttributes, type ComponentType, type ReactNode, type Ref } from "react";

/** Anything that renders an anchor and accepts `href`, for example `next/link`. */
export type LinkComponent = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> }>;

const LinkContext = createContext<LinkComponent | "a">("a");

export type LinkProviderProps = {
  /** The component every `Link`, `Breadcrumb`, `Pagination` and `Menu` link renders with. Pass `next/link` in a Next.js app. */
  component: LinkComponent;
  children: ReactNode;
};

/**
 * Wires navigation once for the whole app. In Next.js pass `next/link` so every library link gets
 * client-side navigation and prefetching, with no `render` prop on each one. Without it links are plain `a` elements.
 *
 * Mount it once at the app root, never inside a `<Link>`.
 *
 * @example
 * "use client";
 * import NextLink from "next/link";
 * <LinkProvider component={NextLink}>{children}</LinkProvider>
 */
export function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;
}

/**
 * The anchor component to render links with: the one from `LinkProvider`, or `a`.
 *
 * Only needed when building your own link components that should follow `LinkProvider`.
 * Run it in a client component and never inside a `<Link>`.
 *
 * @example
 * "use client";
 * import { useLinkComponent } from "@javui/ui";
 *
 * export function CardLink({ href, children }) {
 *   const LinkComponent = useLinkComponent();
 *   return <LinkComponent href={href}>{children}</LinkComponent>;
 * }
 */
export function useLinkComponent() {
  return useContext(LinkContext);
}
