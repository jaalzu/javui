"use client";

import { createContext, useContext } from "react";

export type ControlSize = "xs" | "sm" | "md" | "lg";
export const ButtonGroupSizeContext = createContext<ControlSize | null>(null);
export function useButtonGroupSize() {
  return useContext(ButtonGroupSizeContext);
}
