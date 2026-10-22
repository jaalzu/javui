import type { CSSProperties, ReactNode } from "react";
import { VisuallyHidden } from "../components/VisuallyHidden";

export type ValidationState =
  | "default"
  | "focus"
  | "invalid"
  | "required"
  | "readOnly"
  | "loading"
  | "disabled";

const columns: { state: ValidationState; label: string }[] = [
  { state: "default", label: "Default" },
  { state: "focus", label: "Focus" },
  { state: "invalid", label: "Invalid" },
  { state: "required", label: "Required" },
  { state: "readOnly", label: "Read-only" },
  { state: "loading", label: "Loading" },
  { state: "disabled", label: "Disabled" },
];

export type ValidationRow = {
  label: string;
  render: (state: ValidationState) => ReactNode;
};

const cell: CSSProperties = {
  padding: "var(--space-2) var(--space-3)",
  borderBottom: "var(--border-width-thin) solid var(--color-border-default)",
  verticalAlign: "top",
  textAlign: "start",
  minWidth: "12rem",
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

/** Story helper: every validation state in a table, used by the form controls. */
export function ValidationMatrix({ rows }: { rows: ValidationRow[] }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scrollable region needs keyboard focus.
    <div tabIndex={0} style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th scope="col" style={head}>
              <VisuallyHidden>Control</VisuallyHidden>
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

/** Field props for each validation state. */
export function validationFieldProps(state: ValidationState) {
  switch (state) {
    case "invalid":
      return { error: "Enter a valid value" };
    case "required":
      return { required: true };
    case "readOnly":
      return { readOnly: true };
    case "loading":
      return { loading: true };
    case "disabled":
      return { disabled: true };
    default:
      return {};
  }
}

/** Attributes for a control that can show the focus state without stealing focus. */
export function validationControlProps(state: ValidationState) {
  return state === "focus" ? { "data-force": "focus" as const } : {};
}
