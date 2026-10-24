"use client";

import { useMemo, type ReactNode } from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "../../utils/cx";
import { WarningIcon } from "../../icons/icons.generated";
import { FieldControlContext } from "./FieldContext";
import styles from "./Field.module.css";
import labelStyles from "../Label/Label.module.css";

export type FieldProps = {
  /**
   * Visible label. Required unless the control renders its own label or legend
   * (Checkbox, RadioGroup, Switch, Slider).
   */
  label?: ReactNode;
  /** Help text shown under the control and linked with `aria-describedby`. */
  description?: ReactNode;
  /**
   * Error message. When set, the field is marked invalid and the message is linked to the control.
   * Pass an empty string when there is no error. Show it from validation that runs on blur or submit,
   * not on the first keystroke (Field defaults to `validationMode="onBlur"`).
   */
  error?: string;
  /**
   * Marks the control as required and prints "Required" next to the label. The control also gets
   * `required` so browsers and assistive technology enforce it. @default false
   */
  required?: boolean;
  /**
   * Makes the control read-only: sunken background, no hover, text not dimmed, still focusable and
   * selectable. Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner at the end of the control, marks it `aria-busy`, and makes it not editable.
   * @default false
   */
  loading?: boolean;
  /**
   * The control: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch` or `Slider`.
   * Controls that carry their own label or legend also accept these validation props directly.
   */
  children: ReactNode;
  className?: string;
} & Omit<BaseField.Root.Props, "className" | "children" | "invalid">;

/**
 * Wraps one control with its label, description and error, wired for accessibility by Base UI Field
 * (`label` association, `aria-describedby`, `aria-invalid`). Pass `error`, `required`, `readOnly` and
 * `loading` here; never wire `aria-describedby` or show a loose red error text by hand. When the
 * control renders its own label or legend, omit `label`; the control prints Required and keeps its
 * accessible name.
 *
 * Errors are shown after the field is blurred or the form is submitted, not on the first keystroke.
 *
 * @example
 * <Field label="Email" description="We never share it." error={errors.email} required>
 *   <Input type="email" autoComplete="email" />
 * </Field>
 * <Field label="API key" readOnly>
 *   <Input defaultValue="sk-live-…" />
 * </Field>
 * <Field label="Tax ID" loading>
 *   <Input />
 * </Field>
 * <Field error="Turn this on to continue" required>
 *   <Switch label="Notifications" />
 * </Field>
 */
export function Field({
  label,
  description,
  error,
  required = false,
  readOnly = false,
  loading = false,
  validationMode = "onBlur",
  children,
  className,
  ...rest
}: FieldProps) {
  const hasError = typeof error === "string" && error.length > 0;
  const hasLabel = label !== undefined && label !== null;
  const context = useMemo(
    () => ({
      error: hasError ? error : undefined,
      invalid: hasError,
      required,
      readOnly,
      loading,
      hasLabel,
    }),
    [error, hasError, required, readOnly, loading, hasLabel],
  );

  return (
    <BaseField.Root
      invalid={hasError ? true : undefined}
      validationMode={validationMode}
      className={cx(styles.field, className)}
      {...rest}
    >
      {hasLabel ? (
        <BaseField.Label className={labelStyles.label}>
          {label}
          {required ? <span className={labelStyles.required}>Required</span> : null}
        </BaseField.Label>
      ) : null}
      <FieldControlContext.Provider value={context}>{children}</FieldControlContext.Provider>
      {description ? (
        <BaseField.Description className={styles.description}>{description}</BaseField.Description>
      ) : null}
      {hasError ? (
        <BaseField.Error match className={styles.error} aria-live="polite">
          <WarningIcon size="sm" />
          <span>{error}</span>
        </BaseField.Error>
      ) : (
        <BaseField.Error className={styles.error} />
      )}
    </BaseField.Root>
  );
}
