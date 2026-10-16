import type { ReactNode } from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "../../utils/cx";
import styles from "./Field.module.css";

export type FieldProps = {
  /** Visible label. Required: every control needs an accessible name. */
  label: ReactNode;
  /** Help text shown under the control and linked with `aria-describedby`. */
  description?: ReactNode;
  /** Error message. When set, the field is marked invalid and the message is linked to the control. */
  error?: ReactNode;
  /** The control: `Input`, `Textarea` or `Select`. */
  children: ReactNode;
  className?: string;
} & Omit<BaseField.Root.Props, "className" | "children" | "invalid">;

/**
 * Wraps one control with its label, description and error, wired for accessibility by Base UI Field
 * (`label` association, `aria-describedby`, `aria-invalid`). For groups of checkboxes or radios use `RadioGroup`
 * or one `Checkbox` per option instead.
 *
 * @example
 * <Field label="Email" description="We never share it." error={errors.email}>
 *   <Input type="email" autoComplete="email" />
 * </Field>
 */
export function Field({ label, description, error, children, className, ...rest }: FieldProps) {
  const hasError = error !== undefined && error !== null && error !== false && error !== "";
  return (
    <BaseField.Root invalid={hasError ? true : undefined} className={cx(styles.field, className)} {...rest}>
      <BaseField.Label className={styles.label}>{label}</BaseField.Label>
      {children}
      {description ? <BaseField.Description className={styles.description}>{description}</BaseField.Description> : null}
      {hasError ? (
        <BaseField.Error match className={styles.error}>
          {error}
        </BaseField.Error>
      ) : (
        <BaseField.Error className={styles.error} />
      )}
    </BaseField.Root>
  );
}
