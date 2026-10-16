import type { ReactNode } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../../utils/cx";
import styles from "./Switch.module.css";

export type SwitchProps = {
  /** Visible label, rendered next to the switch. Required: every control needs an accessible name. */
  label: ReactNode;
  className?: string;
} & Omit<BaseSwitch.Root.Props, "className" | "children" | "color">;

/**
 * An on/off switch for a setting that applies immediately, built on Base UI Switch.
 * For choices that are submitted with a form, prefer `Checkbox`.
 *
 * @example
 * <Switch label="Dark mode" />
 */
export function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label className={cx(styles.label, className)}>
      <BaseSwitch.Root className={styles.track} {...rest}>
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
      <span className={styles.text}>{label}</span>
    </label>
  );
}
