"use client";

import { Fragment, useEffect } from "react";
import { OTPField } from "@base-ui/react/otp-field";
import { cx } from "../../utils/cx";
import { useFieldControlState } from "../Field/FieldContext";
import { Spinner } from "../Spinner";
import styles from "./InputOTP.module.css";

export type InputOTPProps = {
  /** Number of character slots. @default 6 */
  length?: number;
  /** Slot size: `sm` 2.25rem, `md` 2.75rem. @default "md" */
  size?: "sm" | "md";
  /**
   * Splits the slots into visual chunks with a separator between them, e.g. `[3, 3]` for `123-456`.
   * The numbers must add up to `length`; otherwise they are ignored.
   */
  groups?: readonly number[];
  /**
   * Makes the slots not editable, marks the field `aria-busy` and shows a spinner after the last
   * slot. Use it while the code is being verified. Inside `Field`, pass `loading` to the Field
   * instead. @default false
   */
  loading?: boolean;
  /**
   * Accessible name of each slot after the first, which uses the `Field` label. Pass it to translate
   * the default "Character 2 of 6".
   */
  getSlotLabel?: (slot: number, length: number) => string;
  className?: string;
} & Omit<OTPField.Root.Props, "className" | "children" | "length" | "render" | "style">;

const defaultSlotLabel = (slot: number, length: number) => `Character ${slot} of ${length}`;

/**
 * One-time code entry split into character slots, built on Base UI OTP Field. Typing advances the
 * focus, backspace and arrow keys move it back, and pasting or the browser's SMS autofill
 * (`autoComplete="one-time-code"`, the default) fills every slot. Inside `Field` it is labelled by
 * the Field label and inherits `invalid`, `required`, `readOnly` and `loading`.
 *
 * The first slot takes the label as its name; the others are named "Character n of N" so a screen
 * reader says which slot has focus. Outside `Field`, pass `aria-label` for the first slot.
 *
 * `validationType` is `"numeric"` by default; use `"alphanumeric"` for recovery codes. `mask` hides
 * the characters, which also turns the slots into password inputs, so password managers may react.
 * Use `onValueComplete` to verify the code, or `autoSubmit` to submit the owning form.
 *
 * Styling hook: `--input-radius` (default `--radius-md`).
 *
 * @example
 * <Field label="Verification code" description="Enter the 6 digits we sent you.">
 *   <InputOTP onValueComplete={verify} />
 * </Field>
 * <Field label="Backup code" error={errors.code}>
 *   <InputOTP length={8} groups={[4, 4]} validationType="alphanumeric" normalizeValue={(v) => v.toUpperCase()} />
 * </Field>
 * <Field label="Code" loading>
 *   <InputOTP />
 * </Field>
 * <InputOTP aria-label="Authenticator code" />
 */
export function InputOTP({
  length = 6,
  size = "md",
  groups,
  loading: loadingProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  getSlotLabel = defaultSlotLabel,
  "aria-label": ariaLabel,
  className,
  ...rest
}: InputOTPProps) {
  const field = useFieldControlState();
  const loading = loadingProp ?? field?.loading ?? false;
  const readOnly = readOnlyProp ?? field?.readOnly ?? false;
  const required = requiredProp ?? field?.required ?? false;

  const groupsValid =
    groups !== undefined &&
    groups.every((count) => count > 0) &&
    groups.reduce((sum, count) => sum + count, 0) === length;
  const layout = groupsValid ? groups : [length];
  const starts = layout.map((_, index) => layout.slice(0, index).reduce((sum, count) => sum + count, 0));

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (groups !== undefined && !groupsValid) {
      console.warn(`InputOTP: groups must be positive numbers that add up to length (${length}). Ignoring groups.`);
    }
  }, [groups, groupsValid, length]);

  return (
    <div
      className={cx(styles.wrapper, className)}
      data-size={size}
      data-loading={loading ? "" : undefined}
    >
      <OTPField.Root
        {...rest}
        length={length}
        readOnly={readOnly || loading}
        required={required}
        aria-busy={loading || undefined}
        className={styles.root}
      >
        {layout.map((count, groupIndex) => (
          <Fragment key={groupIndex}>
            {groupIndex > 0 ? <OTPField.Separator className={styles.separator} /> : null}
            <div className={styles.group}>
              {Array.from({ length: count }, (_, offset) => {
                const index = starts[groupIndex] + offset;
                return (
                  <OTPField.Input
                    key={index}
                    className={styles.slot}
                    aria-label={index === 0 ? ariaLabel : getSlotLabel(index + 1, length)}
                  />
                );
              })}
            </div>
          </Fragment>
        ))}
      </OTPField.Root>
      {loading ? (
        <span className={styles.spinner}>
          <Spinner size="sm" label="" />
        </span>
      ) : null}
    </div>
  );
}