import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { space, type ContainerOrListElement, type Radius, type Space } from "../../types";
import styles from "./Box.module.css";

export type BoxProps<T extends ContainerOrListElement = "div"> = {
  /** Element to render. Pick the one that matches the meaning of the content (`section`, `nav`, `li`...). @default "div" */
  as?: T;
  /** Padding on all sides, from the spacing scale. */
  padding?: Space;
  /** Horizontal padding. Overrides `padding` on the inline axis. */
  paddingX?: Space;
  /** Vertical padding. Overrides `padding` on the block axis. */
  paddingY?: Space;
  /** Draws the `surface` background. */
  surface?: boolean;
  /** Draws a 1px border using the `border` color. */
  bordered?: boolean;
  /** Corner radius from the radius scale. */
  radius?: Radius;
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Generic block container with token-based padding, surface, border and radius.
 * Use it when no more specific component fits.
 *
 * @example
 * <Box as="section" padding="6" surface bordered radius="lg">...</Box>
 */
export function Box<T extends ContainerOrListElement = "div">({
  as,
  padding,
  paddingX,
  paddingY,
  surface,
  bordered,
  radius,
  className,
  style,
  ...rest
}: BoxProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties }>;
  const computed: CSSProperties = {
    ...(padding !== undefined && { padding: space(padding) }),
    ...(paddingX !== undefined && { paddingInline: space(paddingX) }),
    ...(paddingY !== undefined && { paddingBlock: space(paddingY) }),
    ...(radius !== undefined && { borderRadius: `var(--radius-${radius})` }),
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.box, surface && styles.surface, bordered && styles.bordered, className)}
      style={computed}
      {...(rest as Record<string, unknown>)}
    />
  );
}
