import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { space, type ContainerElement, type Space } from "../../types";
import styles from "./Container.module.css";

export type ContainerProps<T extends ContainerElement = "div"> = {
  /** Element to render. Use `main` once per page for the primary content. @default "div" */
  as?: T;
  /** Maximum content width: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem. @default "lg" */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Side padding from the spacing scale. Override `--container-padding` for a custom value.
   * @default "6"
   */
  padding?: Space;
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Centers content and limits its width, with side padding from the spacing scale.
 * The maximum width applies to the content, not to the padding.
 *
 * @example
 * <Container as="main" size="md">...</Container>
 * <Container size="lg" padding="4">...</Container>
 */
export function Container<T extends ContainerElement = "div">({
  as,
  size = "lg",
  padding,
  className,
  style,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties }>;
  const vars: CSSProperties = {
    ["--container-max" as string]: `var(--container-${size})`,
    ...(padding !== undefined && { ["--container-padding" as string]: space(padding) }),
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.container, className)}
      style={vars}
      {...(rest as Record<string, unknown>)}
    />
  );
}
