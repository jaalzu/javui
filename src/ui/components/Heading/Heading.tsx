import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { slugify, textFromNode } from "../../utils/slugify";
import styles from "./Heading.module.css";

/** Heading elements. The element sets the document outline; `size` sets only the look. */
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Visual size, 1 (largest) to 6 (smallest). Sizes shrink on small screens. */
export type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

const defaultSize: Record<HeadingElement, HeadingSize> = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

export type HeadingProps = {
  /**
   * Heading level in the document outline. Keep one `h1` per page and do not skip levels.
   * @default "h2"
   */
  as?: HeadingElement;
  /**
   * Visual size from 1 (56px) to 6 (20px) on wide screens. Defaults to the size that matches `as`.
   * Use it to get an `h2` that looks like a size 4.
   */
  size?: HeadingSize;
  /** Font weight. There is no light; headings are semibold unless you set another. @default "semibold" */
  weight?: "regular" | "medium" | "semibold";
} & Omit<ComponentProps<"h2">, "as" | "color">;

/**
 * A heading. Separates semantics (`as`) from appearance (`size`). Headings are always upright and semibold.
 * When `id` is omitted, a stable slug of the text is used, so anchors render the same on the server and the client.
 *
 * @example
 * <Heading as="h1">Page title</Heading>
 * <Heading as="h2" size={4}>Smaller-looking section title</Heading>
 */
export function Heading({ as: Component = "h2", size, weight, className, id, children, ...rest }: HeadingProps) {
  const text = textFromNode(children).trim();
  const headingId = id ?? (text ? slugify(text) : undefined);
  return <Component id={headingId} className={cx(styles.heading, styles[`s${size ?? defaultSize[Component]}`], weight && styles[`weight-${weight}`], className)} {...rest}>{children}</Component>;
}
