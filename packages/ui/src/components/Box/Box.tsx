import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import type { LayoutElement } from "../../types";
import styles from "./Box.module.css";

export type BoxSize = "default" | "sm" | "xs" | "xxs";
export type BoxSurface = "none" | "card" | "sunken" | "highlight";

export type BoxProps<T extends LayoutElement = "div"> = {
  /** Element to render. @default "div" */
  as?: T;
  /** Inset from the spacing scale. @default "default" */
  size?: BoxSize;
  /** Surface inside the box. @default "none" */
  surface?: BoxSurface;
  /** Whether to show the default border. @default true */
  bordered?: boolean;
} & Omit<ComponentProps<T>, "as" | "color">;

/** A bordered content region with token-based inset and optional semantic surface. */
export function Box<T extends LayoutElement = "div">({
  as,
  size = "default",
  surface = "none",
  bordered = true,
  className,
  ...rest
}: BoxProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cx(styles.box, styles[`size-${size}`], styles[`surface-${surface}`], !bordered && styles.borderless, className)}
      {...(rest as Record<string, unknown>)}
    />
  );
}
