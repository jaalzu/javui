/** Keys of the spacing scale (`space.4` = 1rem). Maps to `--space-<key>`. */
export type Space = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "28" | "36";

/** Keys of the radius scale. Maps to `--radius-<key>`. */
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/** Elements that are safe layout roots. */
export type LayoutElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "nav"
  | "aside"
  | "header"
  | "footer";

/** Layout elements plus lists. Children of `ul` and `ol` must be `li` elements. */
export type LayoutOrListElement = LayoutElement | "ul" | "ol" | "li";

export const space = (key: Space) => `var(--space-${key})`;
