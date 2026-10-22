import type { CSSProperties, ReactNode } from "react";
import { VisuallyHidden } from "../components/VisuallyHidden";

export type StateName =
  | "rest"
  | "hover"
  | "active"
  | "selected"
  | "focus"
  | "disabled";

const columns: { state: StateName; label: string }[] = [
  { state: "rest", label: "Rest" },
  { state: "hover", label: "Hover" },
  { state: "active", label: "Pressed" },
  { state: "selected", label: "Selected" },
  { state: "focus", label: "Focus visible" },
  { state: "disabled", label: "Disabled" },
];

export type StateRow = {
  label: string;
  render: (state: StateName) => ReactNode;
};

export type ForceProps = {
  "data-force"?: StateName;
  disabled?: boolean;
};

export function forceProps(state: StateName): ForceProps {
  return {
    "data-force": state === "rest" || state === "disabled" ? undefined : state,
    ...(state === "disabled" ? { disabled: true } : {}),
  };
}

const cell: CSSProperties = {
  padding: "var(--space-2) var(--space-3)",
  borderBottom: "var(--border-width-thin) solid var(--color-border-default)",
  verticalAlign: "middle",
  textAlign: "start",
};

const head: CSSProperties = {
  ...cell,
  color: "var(--color-secondary-foreground)",
  fontSize: "var(--text-caption-lg-size)",
  fontWeight: "var(--font-weight-medium)",
  whiteSpace: "nowrap",
};

const rowHead: CSSProperties = {
  ...cell,
  color: "var(--color-primary-foreground)",
  fontSize: "var(--text-body-sm-size)",
  fontWeight: "var(--font-weight-medium)",
  whiteSpace: "nowrap",
};

export function StateMatrix({ rows }: { rows: StateRow[] }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scrollable region needs keyboard focus.
    <div tabIndex={0} style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th scope="col" style={head}>
              <VisuallyHidden>Variant</VisuallyHidden>
            </th>
            {columns.map(({ state, label }) => (
              <th key={state} scope="col" style={head}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" style={rowHead}>
                {row.label}
              </th>
              {columns.map(({ state }) => (
                <td key={state} style={cell}>
                  {row.render(state)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
