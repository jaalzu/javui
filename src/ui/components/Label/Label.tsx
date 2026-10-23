import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Label.module.css";

export type LabelProps = {
  /** Text of the label. */
  children: ReactNode;
  /** The id of the control this label belongs to. */
  htmlFor?: string;
  /** Prints "Required" after the text. The control still needs its own `required` attribute. @default false */
  required?: boolean;
  /** Dims the label and removes the pointer cursor. Use only when the control is disabled. @default false */
  disabled?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"label">, "className" | "children">;

/**
 * A visible label for a form control, in the shared `label` text style.
 * Prefer `Field`, which also wires the description, error and required state.
 * Use this when you build a custom composition outside Field.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="name" required>Name</Label>
 */
export function Label({ children, required = false, disabled = false, className, ...rest }: LabelProps) {
  return (
    <label
      className={cx(styles.label, disabled && styles.disabled, className)}
      data-disabled={disabled ? "" : undefined}
      {...rest}
    >
      {children}
      {required ? <span className={styles.required}>Required</span> : null}
    </label>
  );
}
