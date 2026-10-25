"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { breakpointFor, type BreakpointName } from "./breakpoints";

type Reading = { width: number; breakpoint: BreakpointName };

const BreakpointContext = createContext<Reading | null>(null);

/** Tracks the current viewport. The value is null until mounted, so SSR and hydration match. */
export function BreakpointProvider({ children }: { children: ReactNode }) {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setReading({ width, breakpoint: breakpointFor(width) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return <BreakpointContext.Provider value={reading}>{children}</BreakpointContext.Provider>;
}

export function useBreakpointReading() {
  return useContext(BreakpointContext);
}
