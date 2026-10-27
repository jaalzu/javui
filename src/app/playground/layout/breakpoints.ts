// Must match --breakpoint-* in the tokens (sm 40rem, md 48rem, lg 64rem, xl 80rem at 16px).
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
export type BreakpointName = "base" | keyof typeof BREAKPOINTS;
export function breakpointFor(width: number): BreakpointName {
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "base";
}
