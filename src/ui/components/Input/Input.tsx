import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import styles from "./Input.module.css";

export type InputProps = {
  /** Control height: `sm` 2rem, `md` 2.5rem, `lg` 3rem. @default "md" */
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<BaseInput.Props, "className" | "size" | "color">;

/**
 * A native text input built on Base UI Input. Inside `Field` it is labelled and wired to its
 * description and error automatically. Outside `Field` it needs an accessible name
 * (`aria-label` or an associated `label`).
 *
 * @example
 * <Field label="Email"><Input type="email" autoComplete="email" /></Field>
 */
export function Input({ size = "md", className, ...rest }: InputProps) {
  return <BaseInput className={cx(styles.input, styles[size], className)} {...rest} />;
}
