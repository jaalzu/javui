import type { ComponentProps, ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import inputStyles from "../Input/Input.module.css";
import styles from "./Textarea.module.css";

export type TextareaProps = {
  /** Icon before the text. Pass a generated icon without `size`; the textarea sizes it. */
  startIcon?: ReactNode;
  /** Icon after the text. Pass a generated icon without `size`; the textarea sizes it. */
  endIcon?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"textarea">, "className" | "color">;

/**
 * A native `textarea` that works with `Field` the same way `Input` does.
 * Needs an accessible name inside or outside `Field`.
 *
 * @example
 * <Field label="Message"><Textarea rows={4} /></Field>
 */
export function Textarea({
  startIcon,
  endIcon,
  className,
  rows = 3,
  ...rest
}: TextareaProps) {
  const position = getIconSlots({ startIcon, endIcon });
  return (
    <span className={inputStyles.wrapper} data-icon={position}>
      <IconSlot className={cx(inputStyles.startSlot, styles.slot)}>
        {startIcon}
      </IconSlot>
      <BaseInput
        render={<textarea rows={rows} />}
        className={cx(inputStyles.input, styles.textarea, className)}
        {...(rest as Record<string, unknown>)}
      />
      <IconSlot className={cx(inputStyles.endSlot, styles.slot)}>
        {endIcon}
      </IconSlot>
    </span>
  );
}
