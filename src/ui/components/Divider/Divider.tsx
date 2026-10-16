import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Divider.module.css";

export type DividerProps = {
  /**
   * Direction of the line. A vertical divider is still an `hr` and sets `aria-orientation`.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
} & Omit<ComponentProps<"hr">, "color" | "children">;

/**
 * A thematic break between groups of content. Renders a native `hr`.
 * Do not use it for pure decoration; use spacing instead.
 *
 * @example
 * <Divider />
 */
export function Divider({ orientation = "horizontal", className, ...rest }: DividerProps) {
  return (
    <hr
      className={cx(styles.divider, orientation === "vertical" ? styles.vertical : styles.horizontal, className)}
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      {...rest}
    />
  );
}
