import type { ReactNode } from "react";
import { Icon, type IconProps } from "./Icon";

export type IconWeight = "regular" | "fill";

export type GlyphProps = Omit<IconProps, "children"> & {
  /**
   * `regular` by default. Use `fill` for active or selected states (current nav item, selected tab).
   * @default "regular"
   */
  weight?: IconWeight;
};

/** A generated icon component. The `isIcon` flag lets layout components recognise it like `Icon`. */
export type IconComponent = ((props: GlyphProps) => ReactNode) & { readonly isIcon: true };

/** Builds a named icon component from its Phosphor glyphs. Used only by the generated file. */
export function createIcon(name: string, glyphs: Record<IconWeight, ReactNode>): IconComponent {
  return Object.assign(
    ({ weight = "regular", ...props }: GlyphProps) => <Icon {...props}>{glyphs[weight]}</Icon>,
    { displayName: `${name}Icon`, isIcon: true as const },
  );
}
