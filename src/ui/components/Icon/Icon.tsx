import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Icon.module.css";

export type IconProps = {
  /**
   * Accessible name. Provide it when the icon carries meaning on its own (no visible text next to it).
   * Without `label` the icon is decorative and hidden from assistive technology.
   */
  label?: string;
  /** Size relative to the surrounding text: `sm` 1em, `md` 1.25em, `lg` 1.5em. @default "md" */
  size?: "sm" | "md" | "lg";
  /** SVG viewBox of the glyph. @default "0 0 24 24" */
  viewBox?: string;
} & Omit<ComponentProps<"svg">, "color" | "viewBox">;

/**
 * SVG icon wrapper. Pass the glyph paths as children; it uses `currentColor`.
 *
 * @example
 * <Icon><path d="M5 12l5 5L20 7" /></Icon>
 * <Icon label="Success"><path d="M5 12l5 5L20 7" /></Icon>
 */
export function Icon({ label, size = "md", viewBox = "0 0 24 24", className, children, ...rest }: IconProps) {
  const labelled = typeof label === "string" && label.length > 0;
  return (
    <svg
      className={cx(styles.icon, styles[size], className)}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : true}
      {...rest}
    >
      {children}
    </svg>
  );
}
