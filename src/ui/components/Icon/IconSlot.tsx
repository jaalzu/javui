import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import {
  iconPosition,
  type IconPosition,
  type IconSlotOptions,
} from "../../utils/iconPosition";
import styles from "./IconSlot.module.css";

export type IconSlotProps = {
  /** The glyph to render. Prefer a generated icon and never pass `size`: the control sets it. */
  children?: ReactNode;
  className?: string;
};

/**
 * Internal wrapper for an icon passed through a `startIcon`/`endIcon` prop. It is decorative,
 * follows the control's `--icon-size`, and shrinks to the glyph.
 */
export function IconSlot({ children, className }: IconSlotProps) {
  if (children === undefined || children === null || children === false)
    return null;
  return (
    <span className={cx(styles.slot, className)} aria-hidden="true">
      {children}
    </span>
  );
}

/**
 * Returns the icon-slot position for a control. Internal; components use the result for `data-icon`.
 * This is not a React hook: it is a pure function that delegates to `iconPosition`.
 */
export function getIconSlots(
  options: IconSlotOptions,
): IconPosition | undefined {
  return iconPosition(options);
}
