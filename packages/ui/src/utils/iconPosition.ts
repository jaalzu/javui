export type IconPosition = "only" | "start" | "end" | "both";

export type IconSlotOptions = {
  /** Icon rendered before the label. */
  startIcon?: unknown;
  /** Icon rendered after the label. */
  endIcon?: unknown;
  /** A busy state occupies an icon slot. */
  loading?: boolean;
  /** Side the loading indicator takes when there is no explicit icon there. @default "start" */
  loadingPosition?: "start" | "end";
  /** Whether there is visible text next to the slots. Without it, the slot is icon-only. @default true */
  hasLabel?: boolean;
};

const present = (node: unknown) => node !== undefined && node !== null && node !== false;

/**
 * Which icon slots a control has, so CSS can trim the padding on the icon side.
 * Explicit `startIcon`/`endIcon` props only: content is never inspected.
 * `loading` counts as an icon in its slot and `hasLabel: false` makes it icon-only.
 */
export function iconPosition({
  startIcon,
  endIcon,
  loading = false,
  loadingPosition = "start",
  hasLabel = true,
}: IconSlotOptions): IconPosition | undefined {
  const hasStart = present(startIcon) || (loading && loadingPosition === "start");
  const hasEnd = present(endIcon) || (loading && loadingPosition === "end");
  if (!hasStart && !hasEnd) return undefined;
  if (!hasLabel) return "only";
  if (hasStart && hasEnd) return "both";
  return hasStart ? "start" : "end";
}
