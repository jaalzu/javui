import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroupText.module.css";

export type ButtonGroupTextProps = {
  /** The addon text, such as `https://` or `USD`. */
  children: ReactNode;
  /** Extra classes for the addon surface. */
  className?: string;
};

/**
 * A static text addon for a `ButtonGroup`, such as `https://` or `USD`, that matches the height of the controls and shares the group border.
 *
 * @example
 * <ButtonGroup aria-label="Price">
 *   <ButtonGroupText>USD</ButtonGroupText>
 *   <Input aria-label="Amount" inputMode="decimal" />
 * </ButtonGroup>
 */
export function ButtonGroupText({ children, className }: ButtonGroupTextProps) {
  return (
    <div
      data-button-group-text=""
      className={cx(styles.text, className)}
    >
      {children}
    </div>
  );
}
