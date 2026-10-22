"use client";

import { useEffect, type ComponentProps, type ElementType, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { AccessibleName } from "../../utils/accessibleName";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { useLinkComponent } from "../Link/LinkContext";
import type { ButtonSize, ButtonVariant } from "../Button";
import buttonStyles from "../Button/Button.module.css";
import styles from "./ButtonLink.module.css";

type ButtonLinkBaseProps = {
  /** Where the link goes. Required. */
  href: string;
  /**
   * Visual emphasis, the same as `Button`. `primary` is the main call to action (one per view).
   * @default "primary"
   */
  variant?: ButtonVariant;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: ButtonSize;
} & Omit<ComponentProps<"a">, "href" | "color" | "children">;

/**
 * A link with a visible label. Icons are optional.
 */
export type ButtonLinkWithLabelProps = ButtonLinkBaseProps & {
  /** The visible label. */
  children: ReactNode;
  /** Icon before the label. Pass a generated icon without `size`; the link sizes it. @default undefined */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the link sizes it. @default undefined */
  endIcon?: ReactNode;
};

/**
 * An icon-only link. `startIcon` is required, and so is an accessible name through
 * `aria-label` or `aria-labelledby`.
 */
export type ButtonLinkIconOnlyProps = ButtonLinkBaseProps &
  AccessibleName & {
    /** Icon-only links have no visible children. */
    children?: never;
    /** The visible icon and accessible name. Pass a generated icon without `size`. */
    startIcon: ReactNode;
    /** Icon after the label. Pass a generated icon without `size`; the link sizes it. @default undefined */
    endIcon?: ReactNode;
  };

export type ButtonLinkProps = ButtonLinkWithLabelProps | ButtonLinkIconOnlyProps;

/**
 * A link that looks like a `Button`. It renders an `a` (or the component given to `LinkProvider`, such as
 * `next/link`), because something that navigates is a link, not a button. For actions use `Button`.
 * Put icons in `startIcon`/`endIcon`. An icon-only link is valid only with `startIcon` and an
 * accessible name (`aria-label` or `aria-labelledby`); with visible children both icons are optional.
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
  const ariaLabel = rest["aria-label"];
  const ariaLabelledBy = rest["aria-labelledby"];

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (position === "only" && !ariaLabel && !ariaLabelledBy) {
      console.warn(
        "ButtonLink: icon-only links need an accessible name. Pass aria-label or aria-labelledby.",
      );
    }
  }, [position, ariaLabel, ariaLabelledBy]);

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
