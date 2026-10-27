"use client";

import { useBreakpointReading } from "./BreakpointProvider";
import styles from "./playground.module.css";

/** Live viewport readout for embed mode, sharing the breakpoint provider with the expected tables. */
export function LiveIndicator() {
  const reading = useBreakpointReading();

  return (
    <div className={styles.indicator} aria-live="polite">
      {reading ? `${reading.width}px · ${reading.breakpoint}` : "— px · —"}
    </div>
  );
}
