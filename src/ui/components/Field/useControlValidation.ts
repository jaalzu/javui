"use client";

import { useId } from "react";
import { useFieldControlState } from "./FieldContext";

/** Validation props accepted directly by a control. */
export type ControlValidationProps = {
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
};

/**
 * Resolves a control's validation props against the surrounding `Field`.
 * Direct props win; `Field` fills in the rest.
 */
export function useControlValidation({
  error,
  required,
  readOnly,
  loading,
}: ControlValidationProps) {
  const field = useFieldControlState();
  const invalid = (field?.invalid ?? false) || Boolean(error);
  const showError = Boolean(error) && !(field?.invalid ?? false);
  const effectiveRequired = required ?? field?.required ?? false;
  const fieldShowsRequired = Boolean(field?.required) && (field?.hasLabel ?? false);
  const showRequired = effectiveRequired && !fieldShowsRequired;
  const errorId = useId();

  return {
    field,
    error: error ?? field?.error,
    errorId,
    invalid,
    showError,
    showRequired,
    describedBy: showError ? errorId : undefined,
    required: effectiveRequired,
    readOnly: readOnly ?? field?.readOnly ?? false,
    loading: loading ?? field?.loading ?? false,
  };
}
