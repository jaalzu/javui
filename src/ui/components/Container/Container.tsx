import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { responsiveVars, type Responsive } from "../../utils/responsive";
import { space, type LayoutElement, type Space } from "../../types";
import styles from "./Container.module.css";

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ContainerProps<T extends LayoutElement = "div"> = {
  /** Element to render. @default "div" */
  as?: T;
  /** Maximum content width. Accepts per-breakpoint values. @default "xl" */
  size?: Responsive<ContainerSize>;
  /** Horizontal gutter from the spacing scale. Accepts per-breakpoint values. @default "4" */
  gutter?: Responsive<Space>;
} & Omit<ComponentProps<T>, "as" | "color">;

const containerSize = (value: ContainerSize) => `var(--container-${value})`;

/**
 * Centers content, constrains its readable width and applies responsive horizontal gutters.
 *
 * @example
 * <Container size="lg" gutter={{ base: "4", md: "8" }}>Page content</Container>
 */
export function Container<T extends LayoutElement = "div">({
  as,
  size = "xl",
  gutter = "4",
  className,
  style,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties }>;
  const vars: CSSProperties = {
    ...responsiveVars("container-max-width", size, containerSize),
    ...responsiveVars("container-gutter", gutter, space),
    ...(style as CSSProperties | undefined),
  };
  return <Component className={cx(styles.container, className)} style={vars} {...(rest as Record<string, unknown>)} />;
}
