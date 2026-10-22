"use client";

import { createContext, useContext } from "react";

/** Validation and interaction state that Field passes to its control. */
export type FieldControlState = {
  /** Error message from Field, if any. */
  error?: string;
  /** Whether the control is invalid. */
  invalid: boolean;
  /** The control must be filled before the form can be submitted. */
  required: boolean;
  /** The value can be read and selected but not edited. */
  readOnly: boolean;
  /** A value is being loaded; the control is not editable. */
  loading: boolean;
  /** Whether Field renders its own visible label. */
  hasLabel: boolean;
};

export const FieldControlContext = createContext<FieldControlState | null>(null);

/** Reads the state Field provides; returns `null` outside a Field. */
export function useFieldControlState() {
  return useContext(FieldControlContext);
}
