"use client";

import type { ComponentProps, ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { useLinkComponent } from "./LinkContext";
import styles from "./Link.module.css";

export type LinkProps = {
  /** Where the link goes. Required: a link without `href` is not a link. */
  href: string;
  /** `default` uses the text color, `muted` the secondary text color, `inherit` the surrounding color. The underline is always there. @default "default" */
  tone?: "default" | "muted" | "inherit";
  /** Marks a standalone action link (not inline in a sentence) so it gets a 44px hit area on touch devices. @default false */
  standalone?: boolean;
  /** Icon before the label. Pass a generated icon without `size`; the link sizes it. */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the link sizes it. */
  endIcon?: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "color" | "standalone">;

/**
 * A link for navigation. It renders an `a`, or the component given to `LinkProvider` (such as `next/link`).
 * Links with a label always show an underline so they do not rely on color alone. For actions that do not navigate, use `Button`.
 * Put icons in `startIcon`/`endIcon`. An icon on its own is a valid link (`startIcon` + `aria-label`).
 *
 * @example
 * <Link href="/docs">Read the docs</Link>
 * <Link href="/docs" endIcon={<ArrowRightIcon />}>Read the docs</Link>
 * <Link href="/next" aria-label="Next page" startIcon={<ArrowRightIcon />} />
 */
export function Link({ tone = "default", standalone = false, startIcon, endIcon, className, children, ...rest }: LinkProps) {
  const Component = useLinkComponent() as ElementType<ComponentProps<"a">>;
  const hasLabel =
    children !== undefined && children !== null && children !== false;
  const position = getIconSlots({ startIcon, endIcon, hasLabel });
  return (
    <Component
      {...rest}
      className={cx(styles.link, tone === "muted" && styles.muted, tone === "inherit" && styles.inherit, standalone && styles.standalone, className)}
      data-icon={position}
    >
      <IconSlot className={styles.startIcon}>{startIcon}</IconSlot>
      {children}
      <IconSlot className={styles.endIcon}>{endIcon}</IconSlot>
    </Component>
  );
}
