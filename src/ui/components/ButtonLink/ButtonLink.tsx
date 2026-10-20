"use client";

import type { ComponentProps, ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { useLinkComponent } from "../Link/LinkContext";
import type { ButtonSize, ButtonVariant } from "../Button";
import buttonStyles from "../Button/Button.module.css";
import styles from "./ButtonLink.module.css";

export type ButtonLinkProps = {
  /** Where the link goes. Required. */
  href: string;
  /**
   * Visual emphasis, the same as `Button`. `primary` is the main call to action (one per view).
   * @default "primary"
   */
  variant?: ButtonVariant;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: ButtonSize;
  /** Icon before the label. Pass a generated icon without `size`; the link sizes it. @default undefined */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the link sizes it. @default undefined */
  endIcon?: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "color">;

/**
 * A link that looks like a `Button`. It renders an `a` (or the component given to `LinkProvider`, such as
 * `next/link`), because something that navigates is a link, not a button. For actions use `Button`.
 * Put icons in `startIcon`/`endIcon`; an icon-only link needs `aria-label`.
 *
 * @example
 * <ButtonLink href="/docs/installation">Get started</ButtonLink>
 * <ButtonLink href="/docs" variant="secondary" endIcon={<ArrowRightIcon />}>Docs</ButtonLink>
 * <ButtonLink href="/docs" aria-label="Next page" startIcon={<ArrowRightIcon />} />
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const Component = useLinkComponent() as ElementType<ComponentProps<"a">>;
  const hasLabel =
    children !== undefined && children !== null && children !== false;
  const position = getIconSlots({ startIcon, endIcon, hasLabel });
  return (
    <Component
      {...rest}
      className={cx(
        buttonStyles.button,
        buttonStyles[variant],
        buttonStyles[size],
        styles.link,
        className,
      )}
      data-icon={position}
    >
      <IconSlot>{startIcon}</IconSlot>
      {children}
      <IconSlot>{endIcon}</IconSlot>
    </Component>
  );
}
