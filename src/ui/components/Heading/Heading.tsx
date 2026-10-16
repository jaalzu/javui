import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Heading.module.css";

/** Heading elements. The element sets the document outline; `size` sets only the look. */
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

const defaultSize: Record<HeadingElement, HeadingSize> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h4",
  h6: "h4",
};

export type HeadingProps = {
  /**
   * Heading level in the document outline. Keep one `h1` per page and do not skip levels.
   * @default "h2"
   */
  as?: HeadingElement;
  /**
   * Visual text style, independent from the level. Defaults to the style that matches `as`
   * (`h5` and `h6` use `h4`). Use it to get an `h2` that looks like an `h4`.
   */
  size?: HeadingSize;
} & Omit<ComponentProps<"h2">, "as" | "color">;

/**
 * A heading. Separates semantics (`as`) from appearance (`size`).
 *
 * @example
 * <Heading as="h1">Page title</Heading>
 * <Heading as="h2" size="h4">Small-looking section title</Heading>
 */
export function Heading({ as: Component = "h2", size, className, ...rest }: HeadingProps) {
  return <Component className={cx(styles.heading, styles[size ?? defaultSize[Component]], className)} {...rest} />;
}
