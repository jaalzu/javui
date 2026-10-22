"use client";

import type { ReactNode } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../../utils/cx";
import { CheckIcon, MinusIcon } from "../../icons/icons.generated";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  /** Visible label, rendered next to the box. Required: every control needs an accessible name. */
  label: ReactNode;
  /**
   * Error message. Marks the checkbox invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: string;
  /**
   * The checkbox must be ticked before the form can be submitted. The label prints "Required".
   * Inside `Field`, omit it and pass `required` to the Field instead. @default false
   */
  required?: boolean;
  /**
   * The checkbox can be focused and read but not changed. Uses the sunken background and keeps
   * the label text at full contrast. Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner next to the label, sets `aria-busy`, and makes the checkbox not
   * interactive. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseCheckbox.Root.Props, "className" | "children" | "color" | "required" | "readOnly">;

/**
 * A checkbox with its label, built on Base UI Checkbox (keyboard, focus, form value and
 * indeterminate state come from there). The whole label is clickable. Inside `Field` it
 * inherits `error`, `required`, `readOnly` and `loading`.
 *
 * @example
 * <Checkbox label="Send me product updates" defaultChecked />
 * <Checkbox label="Select all" indeterminate />
 * <Checkbox label="Accept terms" error="You must accept the terms" required />
 */
export function Checkbox({
  label,
  className,
  indeterminate,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  ...rest
}: CheckboxProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });

  return (
    <>
      <label className={cx(styles.label, className)}>
        <BaseCheckbox.Root
          className={styles.box}
          indeterminate={indeterminate}
          {...rest}
          readOnly={state.readOnly || state.loading}
          required={state.required}
          aria-busy={state.loading || undefined}
          aria-invalid={state.invalid || undefined}
          aria-describedby={state.describedBy}
          data-readonly={state.readOnly ? "" : undefined}
          data-loading={state.loading ? "" : undefined}
          data-invalid={state.invalid ? "" : undefined}
        >
          <BaseCheckbox.Indicator className={styles.indicator}>
            {indeterminate ? <MinusIcon size="sm" /> : <CheckIcon size="sm" />}
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        <span className={styles.text}>
          {label}
          {state.showRequired ? (
            <>
              {" "}
              <span className={fieldStyles.required}>Required</span>
            </>
          ) : null}
        </span>
        {state.loading ? (
          <Spinner
            size="sm"
            label=""
            role="presentation"
            aria-hidden="true"
            className={styles.spinner}
          />
        ) : null}
      </label>
      {state.showError && state.error ? (
        <FieldError id={state.errorId}>{state.error}</FieldError>
      ) : null}
    </>
  );
}
