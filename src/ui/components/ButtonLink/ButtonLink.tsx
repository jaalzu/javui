"use client";

import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
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
  /** Control height: `sm` 2rem, `md` 2.5rem, `lg` 3rem. @default "md" */
  size?: ButtonSize;
} & Omit<ComponentProps<"a">, "href" | "color">;

/**
 * A link that looks like a `Button`. It renders an `a` (or the component given to `LinkProvider`, such as
 * `next/link`), because something that navigates is a link, not a button. For actions use `Button`.
 *
 * @example
 * <ButtonLink href="/docs/installation">Get started</ButtonLink>
 * <ButtonLink href="/docs" variant="secondary">Docs</ButtonLink>
 */
export function ButtonLink({ variant = "primary", size = "md", className, children, ...rest }: ButtonLinkProps) {
  const Component = useLinkComponent() as ElementType<ComponentProps<"a">>;
  return (
    <Component className={cx(buttonStyles.button, buttonStyles[variant], buttonStyles[size], styles.link, className)} {...rest}>
      {children}
    </Component>
  );
}
