"use client";

import type { ComponentProps, ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import styles from "./Textarea.module.css";

export type TextareaProps = {
  /**
   * Visual treatment. `inline` is invisible at rest and shows the Input hover background on hover
   * and focus. `ghost` shows nothing at all, only the focus ring. @default "default"
   */
  variant?: "default" | "inline" | "ghost";
  /**
   * Resize behavior. `vertical` shows the drag handle, `none` fixes the height and `auto` grows
   * with the content (`field-sizing: content`; `rows` becomes the minimum height). @default "vertical"
   */
  resize?: "vertical" | "none" | "auto";
  /** Icon before the text. Pass a generated icon without `size`; the textarea sizes it. */
  startIcon?: ReactNode;
  /** Icon after the text. Pass a generated icon without `size`; the textarea sizes it. */
  endIcon?: ReactNode;
  /**
   * Shows a small spinner at the end and makes the textarea not editable. `aria-busy` is set.
   * Inside `Field`, omit it and pass `loading` to the Field instead. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<ComponentProps<"textarea">, "className" | "color">;

/**
 * A native `textarea` that works with `Field` the same way `Input` does, including
 * `required`, `readOnly` and `loading`. Needs an accessible name inside or outside `Field`.
 * Icons use the 20px medium size (the textarea has no size variants).
 *
 * @example
 * <Field label="Message"><Textarea rows={4} /></Field>
 * <Field label="Notes" readOnly><Textarea defaultValue="Locked for review." /></Field>
 * <Textarea aria-label="Comment" variant="inline" resize="auto" />
 */
export function Textarea({
  variant = "default",
  resize = "vertical",
  startIcon,
  endIcon,
  loading: loadingProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  className,
  rows = 3,
  ...rest
}: TextareaProps) {
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
    <span
      className={styles.root}
      data-icon={position}
      data-appearance={variant}
    >
      <IconSlot className={styles.startSlot}>
        {startIcon}
      </IconSlot>
      <BaseInput
        render={<textarea rows={rows} />}
        className={cx(styles.textarea, className)}
        readOnly={readOnly || loading}
        required={required}
        aria-busy={loading || undefined}
        data-resize={resize}
        data-readonly={readOnly ? "" : undefined}
        data-loading={loading ? "" : undefined}
        {...(rest as Record<string, unknown>)}
      />
      {loading ? (
        <span
          className={cx(
            styles.spinnerSlot,
          )}
        >
          <Spinner size="sm" label="" role="presentation" aria-hidden="true" />
        </span>
      ) : (
        <IconSlot className={styles.endSlot}>
          {endIcon}
        </IconSlot>
      )}
    </span>
  );
}
