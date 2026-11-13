"use client";

import { useEffect, useId, type ReactNode } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../../utils/cx";
import type { AccessibleName } from "../../utils/accessibleName";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import type { FieldErrorProp } from "../Field/fieldErrors";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Switch.module.css";

type SwitchSharedProps = {
  /**
   * Track size. `sm` is 2rem × 1.25rem and `md` is 2.5rem × 1.5rem. @default "md"
   */
  size?: "sm" | "md";
  /**
   * Visual presentation. `card` turns the whole label into a clickable card with a border and
   * background, with the label and description on the left and the switch on the right.
   * @default "default"
   */
  variant?: "default" | "card";
  /**
   * Marks the switch invalid without an error message and tints the track with the danger color.
   * Prefer `error` so the reason is announced; use this only when the label itself explains the
   * problem. `aria-invalid` also works. Inside `Field`, pass `error` to the Field instead.
   * @default false
   */
  invalid?: boolean;
  /**
   * Help text below the label, linked to it with `aria-describedby`. Inside `Field`, use the
   * Field `description` instead.
   */
  description?: ReactNode;
  /**
   * Error message. Marks the switch invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: FieldErrorProp;
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

/** A switch with a visible label. */
export type SwitchWithLabelProps = SwitchSharedProps & {
  /** Visible label, rendered next to the switch. In the card variant it fills the card. */
  label: ReactNode;
};

/**
 * A switch without a visible label. Needs an accessible name through `aria-label` or
 * `aria-labelledby`, unless a surrounding `Field` supplies a label.
 */
export type SwitchWithoutLabelProps = SwitchSharedProps &
  AccessibleName & {
    /** Omit the visible label and the wrapping `<label>`; only the track is rendered. */
    label?: never;
  };

export type SwitchProps = SwitchWithLabelProps | SwitchWithoutLabelProps;

/**
 * An on/off switch for a setting that applies immediately, built on Base UI Switch.
 * For choices that are submitted with a form, prefer `Checkbox`. Inside `Field` it inherits
 * `error`, `required`, `readOnly` and `loading`.
 *
 * With a label, the whole label is clickable. Without one, only the track renders: give it a name
 * with `aria-label`/`aria-labelledby` or let `Field` do it. `variant="card"` turns the label into a
 * card. `invalid` tints the track without a message; `error` adds a linked message. `description`
 * renders help text below the label.
 *
 * @example
 * <Switch label="Dark mode" />
 * <Switch label="Notifications" description="Email and push alerts." defaultChecked />
 * <Switch label="Product updates" description="New features and improvements." variant="card" />
 * <Switch label="Notifications" invalid />
 * <Field label="Notifications"><Switch aria-label="Notifications" /></Field>
 */
export function Switch({
  label,
  className,
  variant = "default",
  size = "md",
  invalid: invalidProp,
  description,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  "aria-invalid": ariaInvalidProp,
  ...rest
}: SwitchProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });
  const invalid =
    state.invalid ||
    Boolean(invalidProp) ||
    ariaInvalidProp === true ||
    ariaInvalidProp === "true";
  const hasLabel = label !== undefined && label !== null;
  const hasDescription = description !== undefined && description !== null && description !== "";
  const descriptionId = useId();
  const describedBy =
    [hasDescription ? descriptionId : undefined, state.describedBy]
      .filter(Boolean)
      .join(" ") || undefined;
  const ariaLabel = rest["aria-label"];
  const ariaLabelledBy = rest["aria-labelledby"];
  const fieldHasLabel = state.field?.hasLabel ?? false;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!hasLabel && !ariaLabel && !ariaLabelledBy && !fieldHasLabel) {
      console.warn(
        "Switch: switches without a visible label need an accessible name. Pass aria-label or aria-labelledby, or wrap it in a Field with a label.",
      );
    }
  }, [hasLabel, ariaLabel, ariaLabelledBy, fieldHasLabel]);

  const control = (
    <BaseSwitch.Root
      className={cx(styles.track, !hasLabel && className)}
      {...rest}
      readOnly={state.readOnly || state.loading}
      required={state.required}
      aria-busy={state.loading || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      data-size={size}
      data-readonly={state.readOnly ? "" : undefined}
      data-loading={state.loading ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
    >
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
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
    state.showError && state.errors.length ? (
      <FieldError id={state.errorId} errors={state.errors} />
    ) : null;

  if (!hasLabel) {
    return (
      <>
        {control}
        {hasDescription ? (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        ) : null}
        {errorMessage}
      </>
    );
  }

  return (
    <>
      <label
        className={cx(styles.label, variant === "card" && styles.card, className)}
        data-variant={variant}
        data-size={size}
        data-invalid={invalid ? "" : undefined}
      >
        {control}
        <span className={styles.content}>
          <span className={styles.text}>
            {label}
            {state.showRequired ? (
              <>
                {" "}
                <span className={fieldStyles.required}>Required</span>
              </>
            ) : null}
          </span>
          {hasDescription ? (
            <span id={descriptionId} className={styles.description}>
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
