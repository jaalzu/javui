import { cx } from "../../utils/cx";
import styles from "./Separator.module.css";

export type SeparatorProps = { orientation?: "horizontal" | "vertical"; decorative?: boolean; className?: string };

/** Divides sections. Use gap for spacing and ButtonGroupSeparator inside ButtonGroup. */
export function Separator({ orientation = "horizontal", decorative = true, className }: SeparatorProps) {
  const props = { className: cx(styles.separator, className), role: decorative ? "presentation" : "separator", ...(decorative ? {} : { "aria-orientation": orientation }) };
  return orientation === "vertical" ? <div {...props} data-orientation={orientation} /> : <hr {...props} data-orientation={orientation} />;
}
