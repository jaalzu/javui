import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Kbd.module.css";

export type KbdProps = Omit<ComponentProps<"kbd">, "color">;

/**
 * A keyboard key or shortcut. Renders a native `kbd`. Use one `Kbd` per key and join keys with text.
 *
 * @example
 * <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
 */
export function Kbd({ className, ...rest }: KbdProps) {
  return <kbd className={cx(styles.kbd, className)} {...rest} />;
}
