"use client";

import type { ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import styles from "./Input.module.css";
import { useButtonGroupSize } from "../ButtonGroup/ButtonGroupContext";

export type InputProps = {
  /** Control height: `xs` 1.5rem, `sm` 1.75rem, `md` 2rem, `lg` 2.5rem. @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
  /** Visual treatment: `ghost` removes the resting chrome for low-emphasis fields. @default "default" */
  variant?: "default" | "ghost";
  /** Icon before the text. Pass a generated icon without `size`; the input sizes it. */
  startIcon?: ReactNode;
  /** Icon after the text. Pass a generated icon without `size`; the input sizes it. */
  endIcon?: ReactNode;
  /**
   * Shows a small spinner at the end and makes the input not editable. `aria-busy` is set.
   * Inside `Field`, omit it and pass `loading` to the Field instead. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseInput.Props, "className" | "size" | "color">;

/**
 * A native text input built on Base UI Input. Inside `Field` it is labelled and wired to its
 * description and error automatically, and it inherits `required`, `readOnly` and `loading`.
 * Outside `Field` it needs an accessible name (`aria-label` or an associated `label`).
 * Icons follow the control size: xs 12px, sm 16px, md 20px, lg 24px.
 * Styling hooks: set `--input-radius` or `--input-px` on the input wrapper or an ancestor; they
 * default to `--radius-md` and `--space-3` and are useful when composing with ButtonGroup.
 *
 * @example
 * <Field label="Email"><Input type="email" autoComplete="email" /></Field>
 * <Input aria-label="Search" startIcon={<MagnifyingGlassIcon />} />
 * <Field label="Tax ID" loading><Input /></Field>
 */
export function Input({
  size: sizeProp,
  variant = "default",
  startIcon,
  endIcon,
  loading: loadingProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  className,
  ...rest
}: InputProps) {
  const groupSize = useButtonGroupSize();
  const size = sizeProp ?? groupSize ?? "md";
  const field = useFieldControlState();
  const loading = loadingProp ?? field?.loading ?? false;
  const readOnly = readOnlyProp ?? field?.readOnly ?? false;
  const required = requiredProp ?? field?.required ?? false;
  const position = getIconSlots({
    startIcon,
    endIcon,
    loading,
    loadingPosition: "end",
  });

  return (
    <span className={styles.wrapper} data-icon={position} data-size={size} data-variant={variant}>
      <IconSlot className={styles.startSlot}>{startIcon}</IconSlot>
      <BaseInput
        className={cx(styles.input, styles[size], className)}
        readOnly={readOnly || loading}
        required={required}
        aria-busy={loading || undefined}
        data-readonly={readOnly ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...rest}
      />
      {loading ? (
        <span className={cx(styles.endSlot, styles.spinnerSlot)}>
          <Spinner
            size="sm"
            label=""
            role="presentation"
            aria-hidden="true"
          />
        </span>
      ) : (
        <IconSlot className={styles.endSlot}>{endIcon}</IconSlot>
      )}
    </span>
  );
}
