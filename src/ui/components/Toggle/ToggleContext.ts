import { createContext, useContext } from "react";
import type { ButtonSize } from "../Button";

export type ToggleGroupContextValue = {
  size: ButtonSize;
  variant: "default" | "outline";
};

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

export function useToggleGroupContext() {
  return useContext(ToggleGroupContext);
}
