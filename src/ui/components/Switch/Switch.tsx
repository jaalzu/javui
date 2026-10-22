"use client";

import type { ReactNode } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Switch.module.css";

export type SwitchProps = {
  /** Visible label, rendered next to the switch. Required: every control needs an accessible name. */
  label: ReactNode;
  /**
   * Error message. Marks the switch invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: string;
  /**
   * The switch must be on before the form can be submitted. The label prints "Required".
   * Inside `Field`, omit it and pass `required` to the Field instead. @default false
   */
  required?: boolean;
  /**
   * The switch can be focused and read but not changed. Uses the sunken background when off and
   * keeps the label text at full contrast. Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner next to the label, sets `aria-busy`, and makes the switch not
   * interactive. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseSwitch.Root.Props, "className" | "children" | "color" | "required" | "readOnly">;

/**
 * An on/off switch for a setting that applies immediately, built on Base UI Switch.
 * For choices that are submitted with a form, prefer `Checkbox`. Inside `Field` it inherits
 * `error`, `required`, `readOnly` and `loading`.
 *
 * @example
 * <Switch label="Dark mode" />
 * <Switch label="Notifications" error="Turn on notifications to continue" required />
 */
export function Switch({
  label,
  className,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  ...rest
}: SwitchProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });

  return (
    <>
      <label className={cx(styles.label, className)}>
        <BaseSwitch.Root
          className={styles.track}
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
          <BaseSwitch.Thumb className={styles.thumb} />
        </BaseSwitch.Root>
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
