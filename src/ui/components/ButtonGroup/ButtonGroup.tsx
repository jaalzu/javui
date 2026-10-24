import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupProps = {
  /**
   * Direction the group lays out its children. Horizontal joins buttons side by side;
   * vertical stacks them.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
} & Omit<ComponentProps<"div">, "color">;

/**
 * Joins related buttons into one control. Shared edges, outer-only corner rounding and a focus
 * ring that stays above its neighbours keep the actions readable as a unit. Children can be
 * `Button`, a `Menu` trigger or an `Input` for split-button patterns. Give the group an
 * `aria-label` so its purpose is announced.
 *
 * @example
 * <ButtonGroup aria-label="Document actions">
 *   <Button variant="outline">Save draft</Button>
 *   <Button variant="outline">Preview</Button>
 *   <Button variant="outline">Publish</Button>
 * </ButtonGroup>
 */
export function ButtonGroup({ orientation = "horizontal", className, ...rest }: ButtonGroupProps) {
  return (
    <div
      {...rest}
      role="group"
      data-orientation={orientation}
      className={cx(styles.group, styles[orientation], className)}
    />
  );
}
