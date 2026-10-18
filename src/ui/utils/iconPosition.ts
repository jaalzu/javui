import { Children, isValidElement, type ReactNode } from "react";
import { Icon } from "../components/Icon";

export type IconPosition = "only" | "start" | "end" | "both";

const isIcon = (node: ReactNode) =>
  isValidElement(node) && (node.type === Icon || node.type === "svg");

/**
 * Where the icons sit in a button's content, so the CSS can trim the padding on the icon side.
 * `loading` counts as an icon at the start. Returns `undefined` for plain text.
 */
export function iconPosition(
  children: ReactNode,
  loading = false,
): IconPosition | undefined {
  const parts = Children.toArray(children);
  const first = isIcon(parts[0]) || loading;
  const last = parts.length > 1 && isIcon(parts[parts.length - 1]);
  if (parts.length === 1 && isIcon(parts[0]) && !loading) return "only";
  if (first && last) return "both";
  if (first) return "start";
  if (last) return "end";
  return undefined;
}
