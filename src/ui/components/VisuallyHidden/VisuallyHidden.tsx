import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import styles from "./VisuallyHidden.module.css";

export type VisuallyHiddenProps = {
  /** Element to render. @default "span" */
  as?: "span" | "div";
} & Omit<ComponentProps<"span">, "as" | "color">;

/**
 * Hides content visually but keeps it in the accessibility tree, so screen readers still read it.
 * Never use `display: none` or `aria-hidden` for this purpose.
 *
 * @example
 * <button><Icon .../><VisuallyHidden>Close</VisuallyHidden></button>
 */
export function VisuallyHidden({ as = "span", className, ...rest }: VisuallyHiddenProps) {
  const Component = as as ElementType<{ className?: string }>;
  return <Component className={cx(styles.hidden, className)} {...(rest as Record<string, unknown>)} />;
}
