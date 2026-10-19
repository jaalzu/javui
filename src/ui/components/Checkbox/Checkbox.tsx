import type { ReactNode } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../../utils/cx";
import { CheckIcon, MinusIcon } from "../../icons/icons.generated";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  /** Visible label, rendered next to the box. Required: every control needs an accessible name. */
  label: ReactNode;
  className?: string;
} & Omit<BaseCheckbox.Root.Props, "className" | "children" | "color">;

/**
 * A checkbox with its label, built on Base UI Checkbox (keyboard, focus, form value and
 * indeterminate state come from there). The whole label is clickable.
 *
 * @example
 * <Checkbox label="Send me product updates" defaultChecked />
 * <Checkbox label="Select all" indeterminate />
 */
export function Checkbox({ label, className, indeterminate, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.label, className)}>
      <BaseCheckbox.Root className={styles.box} indeterminate={indeterminate} {...rest}>
        <BaseCheckbox.Indicator className={styles.indicator}>
          {indeterminate ? <MinusIcon size="sm" /> : <CheckIcon size="sm" />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className={styles.text}>{label}</span>
    </label>
  );
}
