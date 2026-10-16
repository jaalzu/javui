import type { ComponentProps } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import inputStyles from "../Input/Input.module.css";
import styles from "./Textarea.module.css";

export type TextareaProps = {
  className?: string;
} & Omit<ComponentProps<"textarea">, "className" | "color">;

/**
 * A native `textarea` that works with `Field` the same way `Input` does.
 * Needs an accessible name inside or outside `Field`.
 *
 * @example
 * <Field label="Message"><Textarea rows={4} /></Field>
 */
export function Textarea({ className, rows = 3, ...rest }: TextareaProps) {
  return (
    <BaseInput
      render={<textarea rows={rows} />}
      className={cx(inputStyles.input, styles.textarea, className)}
      {...(rest as Record<string, unknown>)}
    />
  );
}
