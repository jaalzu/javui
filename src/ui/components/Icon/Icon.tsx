import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Icon.module.css";

export type IconProps = {
  /**
   * Accessible name. Provide it when the icon carries meaning on its own (no visible text next to it).
   * Without `label` the icon is decorative and hidden from assistive technology.
   */
  label?: string;
  /**
   * Fixed size: `xs` 12px, `sm` 16px, `md` 20px, `lg` 24px, `xl` 32px. Without it the icon is
   * 20px, or the size its parent sets (inside a `Button` it follows the button). `xs` is for
   * standalone use: inline with text or in small badges.
   * @default undefined
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & Omit<
  ComponentProps<"svg">,
  "color" | "viewBox" | "fill" | "stroke" | "role" | "aria-label" | "aria-hidden"
>;

/**
 * Container for a Phosphor glyph (256x256 grid, filled shapes, `currentColor`).
 * Do not use it with hand-written paths: import a named icon (`ArrowRightIcon`) instead.
 *
 * @example
 * <Icon label="Success">{glyph}</Icon>
 */
export function Icon({ label, size, className, children, ...rest }: IconProps) {
  const labelled = typeof label === "string" && label.length > 0;
  return (
    <svg
      className={cx(styles.icon, size && styles[size], className)}
      viewBox="0 0 256 256"
      fill="currentColor"
      focusable="false"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : true}
      {...rest}
    >
      {children}
    </svg>
  );
}
