import { isValidElement, type ReactNode } from "react";

/** Plain text inside a React node tree, used to derive deterministic heading ids. */
export function textFromNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join(" ");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}

/**
 * URL fragment for a heading. Pure and deterministic: the same text becomes the same id
 * on the server and on the client, so headings can be rendered with their id directly.
 */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}
