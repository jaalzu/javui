"use client";

import { createContext, useContext, type AnchorHTMLAttributes, type ComponentType, type ReactNode, type Ref } from "react";

/** Anything that renders an anchor and accepts `href`, for example `next/link`. */
export type LinkComponent = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> }>;

const LinkContext = createContext<LinkComponent | "a">("a");

export type LinkProviderProps = {
  /** The component every `Link`, `ButtonLink`, `Breadcrumb`, `Pagination` and `Menu` link renders with. Pass `next/link` in a Next.js app. */
  component: LinkComponent;
  children: ReactNode;
};

/**
 * Wires navigation once for the whole app. In Next.js pass `next/link` so every library link gets
 * client-side navigation and prefetching, with no `render` prop on each one. Without it links are plain `a` elements.
 *
 * @example
 * "use client";
 * import NextLink from "next/link";
 * <LinkProvider component={NextLink}>{children}</LinkProvider>
 */
export function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;
}

/** The anchor component to render links with: the one from `LinkProvider`, or `a`. */
export function useLinkComponent() {
  return useContext(LinkContext);
}
