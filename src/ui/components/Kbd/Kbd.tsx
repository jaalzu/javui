import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Kbd.module.css";

export type KbdProps = Omit<ComponentProps<"kbd">, "color" | "size"> & {
  /** Visual size of the key. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** Surface treatment. @default "default" */
  variant?: "default" | "inverted";
};

/**
 * A keyboard key or shortcut. Renders a native `kbd`. Use one `Kbd` per key and join keys with text.
 *
 * @example
 * <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
 */
export function Kbd({ children, className, size = "md", variant = "default", ...rest }: KbdProps) {
  const singleCharacter = typeof children === "string" && [...children].length === 1;
  return <kbd aria-hidden="true" data-size={size} data-variant={variant} data-single={singleCharacter ? "true" : undefined} className={cx(styles.kbd, className)} {...rest}>{children}</kbd>;
}
