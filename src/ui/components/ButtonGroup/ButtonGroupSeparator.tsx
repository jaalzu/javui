import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupSeparatorProps = {
  /**
   * Direction of the divider line. Use `vertical` between side-by-side buttons (default) and
   * `horizontal` between stacked buttons.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
} & Omit<ComponentProps<"div">, "color" | "role">;

/**
 * Divides adjacent buttons in a group. Use it with non-outline variants, whose shared edge has
 * no visible border; outline buttons already show the division. The orientation describes the
 * line itself, so a horizontal group uses a vertical separator.
 *
 * @example
 * <ButtonGroup aria-label="Export">
 *   <Button variant="secondary">CSV</Button>
 *   <Button variant="secondary">JSON</Button>
 *   <ButtonGroupSeparator />
 *   <Button variant="secondary">More</Button>
 * </ButtonGroup>
 */
export function ButtonGroupSeparator({
  orientation = "vertical",
  className,
  ...rest
}: ButtonGroupSeparatorProps) {
  return (
    <div
      {...rest}
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={cx(styles.separator, className)}
    />
  );
}
