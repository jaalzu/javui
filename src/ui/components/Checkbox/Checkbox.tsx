"use client";

import { useEffect, useId, type ReactNode } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../../utils/cx";
import type { AccessibleName } from "../../utils/accessibleName";
import { CheckIcon, MinusIcon } from "../../icons/icons.generated";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import { useCheckboxGroupControlState } from "./CheckboxGroup";
import styles from "./Checkbox.module.css";

type CheckboxSharedProps = {
  /**
   * Visual presentation. `card` turns the whole label into a clickable card with a border and
   * background; use it instead of wrapping a Checkbox in a Card. @default "default"
   */
  variant?: "default" | "card";
  /**
   * Marks the checkbox invalid without an error message and tints the label and box with the
   * danger color. Prefer `error` so the reason is announced; use this only when the label itself
   * explains the problem. Inside `Field`, pass `error` to the Field instead. @default false
   */
  invalid?: boolean;
  /**
   * Help text below the label, linked to it with `aria-describedby`. Inside `Field`, use the
   * Field `description` instead.
   */
  description?: ReactNode;
  /**
   * Error message. Marks the checkbox invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: string;
  /**
   * The checkbox must be ticked before the form can be submitted. The label prints "Required".
   * Without a visible label there is nowhere to print it: let `Field` show it instead.
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
} & Omit<
  BaseCheckbox.Root.Props,
  "className" | "children" | "color" | "required" | "readOnly" | "indeterminate"
>;

/** A checkbox with a visible label. */
export type CheckboxWithLabelProps = CheckboxSharedProps & {
  /** Visible label, rendered next to the box. In the card variant it fills the card. */
  label: ReactNode;
};

/**
 * A checkbox without a visible label. Needs an accessible name through `aria-label` or
 * `aria-labelledby`, unless a surrounding `Field` supplies a label.
 */
export type CheckboxWithoutLabelProps = CheckboxSharedProps &
  AccessibleName & {
    /** Omit the visible label and the wrapping `<label>`; only the box is rendered. */
    label?: never;
  };

export type CheckboxProps = CheckboxWithLabelProps | CheckboxWithoutLabelProps;

/**
 * A checkbox with an optional label, built on Base UI Checkbox. With a label, the whole label is
 * clickable. Without one, only the box renders: give it a name with `aria-label`/`aria-labelledby`
 * or let `Field` do it. Inside `Field` it inherits `error`, `required`, `readOnly` and `loading`.
 * Space toggles it, like a native checkbox.
 *
 * The dash is only for the `parent` of a `CheckboxGroup`; Base UI derives it from the group.
 * `variant="card"` turns the label into a card. `invalid` tints the box and label without a
 * message; `error` adds a linked message. `description` renders help text below the label.
 *
 * @example
 * <Checkbox label="Send me product updates" defaultChecked />
 * <Checkbox label="Accept terms" error="You must accept the terms" required />
 * <Checkbox label="Accept the terms" invalid />
 * <Checkbox label="Email notifications" description="We only email about product changes." />
 * <Checkbox label="Product updates" description="New features and improvements." variant="card" />
 * <Checkbox aria-label="Select row 3" />
 */
export function Checkbox({
  label,
  className,
  variant = "default",
  invalid: invalidProp,
  description,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  ...rest
}: CheckboxProps) {
  const group = useCheckboxGroupControlState();
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp ?? (group?.readOnly || undefined),
    loading: loadingProp,
  });
  const invalid = state.invalid || Boolean(invalidProp);
  const hasDescription = description !== undefined && description !== null && description !== "";
  const descriptionId = useId();
  const describedBy =
    [hasDescription ? descriptionId : undefined, state.describedBy]
      .filter(Boolean)
      .join(" ") || undefined;
  const hasLabel = label !== undefined && label !== null;
  const ariaLabel = rest["aria-label"];
  const ariaLabelledBy = rest["aria-labelledby"];
  const fieldHasLabel = state.field?.hasLabel ?? false;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!hasLabel && !ariaLabel && !ariaLabelledBy && !fieldHasLabel) {
      console.warn(
        "Checkbox: checkboxes without a visible label need an accessible name. Pass aria-label or aria-labelledby, or wrap it in a Field with a label.",
      );
    }
  }, [hasLabel, ariaLabel, ariaLabelledBy, fieldHasLabel]);

  const control = (
    <BaseCheckbox.Root
      className={cx(styles.box, !hasLabel && className)}
      {...rest}
      readOnly={state.readOnly || state.loading}
      required={state.required}
      aria-busy={state.loading || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      data-readonly={state.readOnly ? "" : undefined}
      data-loading={state.loading ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
    >
      <BaseCheckbox.Indicator className={styles.indicator}>
        <CheckIcon size="xs" className={styles.checkIcon} />
        <MinusIcon size="xs" className={styles.minusIcon} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  const text = (
    <span className={styles.text}>
      {label}
      {state.showRequired ? (
        <>
          {" "}
          <span className={fieldStyles.required}>Required</span>
        </>
      ) : null}
    </span>
  );

  const spinner = state.loading ? (
    <Spinner
      size="sm"
      label=""
      role="presentation"
      aria-hidden="true"
      className={styles.spinner}
    />
  ) : null;

  const errorMessage =
    state.showError && state.error ? (
      <FieldError id={state.errorId}>{state.error}</FieldError>
    ) : null;

  if (!hasLabel) {
    return (
      <>
        {hasDescription ? (
          <div className={styles.field}>
            {control}
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          </div>
        ) : (
          control
        )}
        {errorMessage}
      </>
    );
  }

  if (variant === "card") {
    return (
      <>
        <label
          className={cx(styles.label, styles.card, className)}
          data-invalid={invalid ? "" : undefined}
        >
          {control}
          <span className={styles.content}>
            {text}
            {hasDescription ? (
              <span
                id={descriptionId}
                className={cx(styles.description, styles.cardDescription)}
              >
                {description}
              </span>
            ) : null}
          </span>
          {spinner}
        </label>
        {errorMessage}
      </>
    );
  }

  const content = (
    <span className={styles.content}>
      {text}
      {hasDescription ? (
        <span id={descriptionId} className={styles.description}>
          {description}
        </span>
      ) : null}
    </span>
  );

  const labelContent = (
    <label
      className={cx(styles.label, className)}
      data-invalid={invalid ? "" : undefined}
    >
      {control}
      {content}
      {spinner}
    </label>
  );

  return (
    <>
      {labelContent}
      {errorMessage}
    </>
  );
}
