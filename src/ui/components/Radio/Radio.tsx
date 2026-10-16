import type { ReactNode } from "react";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cx } from "../../utils/cx";
import styles from "./Radio.module.css";

export type RadioGroupProps = {
  /** Visible group label, rendered as the `legend` of a `fieldset`. Required: the group needs a name. */
  legend: ReactNode;
  /** Layout of the options. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** The `Radio` options. */
  children: ReactNode;
  className?: string;
} & Omit<BaseRadioGroup.Props, "className" | "children" | "color">;

/**
 * A group of mutually exclusive options. Renders a `fieldset` with a `legend`, driven by Base UI RadioGroup.
 *
 * @example
 * <RadioGroup legend="Plan" defaultValue="free">
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 */
export function RadioGroup({ legend, orientation = "vertical", children, className, ...rest }: RadioGroupProps) {
  return (
    <BaseFieldset.Root render={<BaseRadioGroup {...rest} />} className={cx(styles.group, className)}>
      <BaseFieldset.Legend className={styles.legend}>{legend}</BaseFieldset.Legend>
      <div className={cx(styles.options, orientation === "horizontal" && styles.horizontal)}>{children}</div>
    </BaseFieldset.Root>
  );
}

export type RadioProps = {
  /** Value submitted and reported when this option is selected. */
  value: string;
  /** Visible label for this option. */
  label: ReactNode;
  className?: string;
} & Omit<BaseRadio.Root.Props, "className" | "children" | "value" | "color">;

/**
 * One option inside a `RadioGroup`, built on Base UI Radio. The whole label is clickable.
 */
export function Radio({ value, label, className, ...rest }: RadioProps) {
  return (
    <label className={cx(styles.label, className)}>
      <BaseRadio.Root value={value} className={styles.radio} {...rest}>
        <BaseRadio.Indicator className={styles.indicator} />
      </BaseRadio.Root>
      <span className={styles.text}>{label}</span>
    </label>
  );
}
