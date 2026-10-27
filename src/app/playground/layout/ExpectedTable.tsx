"use client";

import { BREAKPOINTS, type BreakpointName } from "./breakpoints";
import { useBreakpointReading } from "./BreakpointProvider";
import styles from "./playground.module.css";

const names: BreakpointName[] = ["base", ...(Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>)];

/** Expected behavior by breakpoint. Missing entries read "inherits"; the active column is highlighted. */
export function ExpectedTable({
  caption,
  expected,
}: {
  caption: string;
  expected: Partial<Record<BreakpointName, string>>;
}) {
  const reading = useBreakpointReading();
  const active = reading?.breakpoint ?? null;

  return (
    <div className={styles.expectedWrap}>
      <table className={styles.expectedTable}>
        <caption className={styles.srOnly}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Expected</th>
            {names.map((name) => (
              <th key={name} scope="col" data-active={active === name ? "true" : undefined}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Behavior</th>
            {names.map((name) => (
              <td key={name} data-active={active === name ? "true" : undefined}>
                {expected[name] ?? "inherits"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
