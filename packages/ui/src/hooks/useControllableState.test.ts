import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("manages an uncontrolled value", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: false }));
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });

  it("does not replace a controlled value internally", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ value: false, defaultValue: true, onChange }));
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
