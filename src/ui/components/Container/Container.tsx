import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import type { ContainerElement } from "../../types";
import styles from "./Container.module.css";

export type ContainerProps<T extends ContainerElement = "div"> = {
  /** Element to render. Use `main` once per page for the primary content. @default "div" */
  as?: T;
  /** Maximum content width: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem. @default "lg" */
  size?: "sm" | "md" | "lg" | "xl";
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Centers content and limits its width, with side padding from the spacing scale.
 *
 * @example
 * <Container as="main" size="md">...</Container>
 */
export function Container<T extends ContainerElement = "div">({
  as,
  size = "lg",
  className,
  style,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties }>;
  return (
    <Component
      className={cx(styles.container, className)}
      style={{ maxWidth: `var(--container-${size})`, ...(style as CSSProperties | undefined) }}
      {...(rest as Record<string, unknown>)}
    />
  );
}
