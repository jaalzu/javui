"use client";

import type { ReactNode } from "react";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Radio.module.css";

export type RadioGroupProps = {
  /** Visible group label, rendered as the `legend` of a `fieldset`. Required: the group needs a name. */
  legend: ReactNode;
  /** Layout of the options. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** The `Radio` options. */
  children: ReactNode;
  /**
   * Error message. Marks the group invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: string;
  /**
   * The group must have a selection before the form can be submitted. The legend prints "Required".
   * Inside `Field`, omit it and pass `required` to the Field instead. @default false
   */
  required?: boolean;
  /**
   * The group can be focused and read but not changed. Keeps the options at full contrast.
   * Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner next to the legend, sets `aria-busy`, and makes the group not
   * interactive. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseRadioGroup.Props, "className" | "children" | "color" | "required" | "readOnly">;

/**
 * A group of mutually exclusive options. Renders a `fieldset` with a `legend`, driven by Base UI
 * RadioGroup. Inside `Field` it inherits `error`, `required`, `readOnly` and `loading`.
 *
 * @example
 * <RadioGroup legend="Plan" defaultValue="free">
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 * <RadioGroup legend="Plan" error="Choose a plan" required>
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 */
export function RadioGroup({
  legend,
  orientation = "vertical",
  children,
  className,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  ...rest
}: RadioGroupProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });

  return (
    <>
      <BaseFieldset.Root
        render={
          <BaseRadioGroup
            {...rest}
            readOnly={state.readOnly || state.loading}
            required={state.required}
            aria-busy={state.loading || undefined}
            aria-invalid={state.invalid || undefined}
            aria-describedby={state.describedBy}
            data-readonly={state.readOnly ? "" : undefined}
            data-loading={state.loading ? "" : undefined}
            data-invalid={state.invalid ? "" : undefined}
          />
        }
        className={cx(styles.group, className)}
      >
        <BaseFieldset.Legend className={styles.legend}>
          {legend}
          {state.showRequired ? (
            <>
              {" "}
              <span className={fieldStyles.required}>Required</span>
            </>
          ) : null}
          {state.loading ? (
            <Spinner
              size="sm"
              label=""
              role="presentation"
              aria-hidden="true"
              className={styles.spinner}
            />
          ) : null}
        </BaseFieldset.Legend>
        <div className={cx(styles.options, orientation === "horizontal" && styles.horizontal)}>{children}</div>
      </BaseFieldset.Root>
      {state.showError && state.error ? (
        <FieldError id={state.errorId}>{state.error}</FieldError>
      ) : null}
    </>
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
 * Validation state comes from the `RadioGroup` (`error`, `required`, `readOnly`, `loading`).
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
