import type { CSSProperties } from "react";

export const breakpointNames = ["sm", "md", "lg", "xl"] as const;
export type Breakpoint = "base" | (typeof breakpointNames)[number];
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

/** Turns a value or a per-breakpoint object into CSS variables: --name, --name-sm, --name-md... */
export function responsiveVars<T extends string | number | boolean>(
  name: string,
  value: Responsive<T>,
  map: (v: T) => string = String,
): CSSProperties {
  const vars: Record<string, string> = {};
  if (typeof value === "object" && value !== null) {
    for (const [bp, v] of Object.entries(value)) {
      if (v === undefined) continue;
      vars[bp === "base" ? `--${name}` : `--${name}-${bp}`] = map(v as T);
    }
  } else {
    vars[`--${name}`] = map(value as T);
  }
  return vars as CSSProperties;
}
