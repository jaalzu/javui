import type { ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import styles from "./Input.module.css";

export type InputProps = {
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon before the text. Pass a generated icon without `size`; the input sizes it. */
  startIcon?: ReactNode;
  /** Icon after the text. Pass a generated icon without `size`; the input sizes it. */
  endIcon?: ReactNode;
  className?: string;
} & Omit<BaseInput.Props, "className" | "size" | "color">;

/**
 * A native text input built on Base UI Input. Inside `Field` it is labelled and wired to its
 * description and error automatically. Outside `Field` it needs an accessible name
 * (`aria-label` or an associated `label`).
 *
 * @example
 * <Field label="Email"><Input type="email" autoComplete="email" /></Field>
 * <Input aria-label="Search" startIcon={<MagnifyingGlassIcon />} />
 */
export function Input({
  size = "md",
  startIcon,
  endIcon,
  className,
  ...rest
}: InputProps) {
  const position = getIconSlots({ startIcon, endIcon });
  return (
    <span className={styles.wrapper} data-icon={position}>
      <IconSlot className={styles.startSlot}>{startIcon}</IconSlot>
      <BaseInput className={cx(styles.input, styles[size], className)} {...rest} />
      <IconSlot className={styles.endSlot}>{endIcon}</IconSlot>
    </span>
  );
}
