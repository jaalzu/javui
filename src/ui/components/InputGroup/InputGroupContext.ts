"use client";

import { createContext, useContext } from "react";

export type InputGroupState = {
  size: "sm" | "md" | "lg" | "xl";
  /** Resolved from the `loading` prop or the surrounding Field. */
  loading: boolean;
};

export const InputGroupContext = createContext<InputGroupState | null>(null);

/** Reads the surrounding InputGroup; returns `null` outside one. */
export function useInputGroup() {
  return useContext(InputGroupContext);
}
