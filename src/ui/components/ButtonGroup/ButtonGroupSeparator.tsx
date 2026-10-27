import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupSeparatorProps = {
  /**
   * Direction of the line for assistive technology. The visible line follows the group's active
   * axis, including `stackBelow`.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
} & Omit<ComponentProps<"div">, "color" | "role">;

/**
 * A 1px divider between controls, for a filled variant (`primary`, `accent`, `danger`) that hides the default border; it follows the group's active axis.
 *
 * @example
 * <ButtonGroup aria-label="Export">
 *   <Button>CSV</Button>
 *   <ButtonGroupSeparator />
 *   <Button>JSON</Button>
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
