"use client";

import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import { useLinkComponent } from "./LinkContext";
import styles from "./Link.module.css";

export type LinkProps = {
  /** Where the link goes. Required: a link without `href` is not a link. */
  href: string;
  /** `default` uses the text color, `muted` the secondary text color, `inherit` the surrounding color. The underline is always there. @default "default" */
  tone?: "default" | "muted" | "inherit";
} & Omit<ComponentProps<"a">, "href" | "color">;

/**
 * A link for navigation. It renders an `a`, or the component given to `LinkProvider` (such as `next/link`).
 * Links always show an underline so they do not rely on color alone. For actions that do not navigate, use `Button`.
 *
 * @example
 * <Link href="/docs">Read the docs</Link>
 */
export function Link({ tone = "default", className, children, ...rest }: LinkProps) {
  const Component = useLinkComponent() as ElementType<ComponentProps<"a">>;
  return (
    <Component className={cx(styles.link, tone === "muted" && styles.muted, tone === "inherit" && styles.inherit, className)} {...rest}>
      {children}
    </Component>
  );
}
