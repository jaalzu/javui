"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Button, Select } from "@/ui";
import { cx } from "@/ui/utils/cx";
import { BREAKPOINTS, breakpointFor, type BreakpointName } from "./breakpoints";
import styles from "./playground.module.css";

const MIN_WIDTH = 280;
const SNAP_DISTANCE = 8;
const CASE_COUNT = 16;

const presetEntries = Object.entries(BREAKPOINTS) as Array<[BreakpointName, number]>;

const caseItems = [
  { value: "all", label: "All cases" },
  ...Array.from({ length: CASE_COUNT }, (_, i) => ({ value: String(i + 1), label: `Case ${i + 1}` })),
];

function clampWidth(value: number, max: number) {
  return Math.min(max, Math.max(MIN_WIDTH, value));
}

function snapWidth(value: number, max: number, snap: boolean) {
  if (snap) {
    for (const [, breakpoint] of presetEntries) {
      if (Math.abs(value - breakpoint) <= SNAP_DISTANCE) return breakpoint;
    }
  }
  return clampWidth(value, max);
}

/** Width selector, ruler and draggable iframe preview. The iframe has its own viewport, so media queries fire. */
export function LayoutPlayground() {
  const [width, setWidth] = useState<number | null>(null);
  const [max, setMax] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [caseNumber, setCaseNumber] = useState<number | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startW: number } | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const observer = new ResizeObserver((entries) => {
      const next = Math.floor(entries[0].contentRect.width);
      setMax(next);
      setWidth((current) => (current === null ? current : clampWidth(current, next)));
    });
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "[" && event.key !== "]") return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")
      ) {
        return;
      }
      event.preventDefault();
      const direction = event.key === "]" ? 1 : -1;
      setCaseNumber((current) => {
        if (current === null) return direction === 1 ? 1 : CASE_COUNT;
        const next = current + direction;
        return next < 1 ? CASE_COUNT : next > CASE_COUNT ? 1 : next;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const displayWidth = width ?? max;
  const breakpoint = breakpointFor(displayWidth);
  const src = caseNumber === null ? "/playground/layout?embed=1" : `/playground/layout?embed=1&case=${caseNumber}`;
  const shellStyle = { "--frame-width": width === null ? "100%" : `${width}px` } as CSSProperties;

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (max === 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, startW: width ?? max };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || max === 0) return;
    const next = Math.round(drag.current.startW + (event.clientX - drag.current.startX));
    setWidth(snapWidth(next, max, !event.altKey));
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(false);
  };

  const onHandleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.shiftKey ? 50 : 10;
    const next = (width ?? max) + (event.key === "ArrowRight" ? step : -step);
    setWidth(clampWidth(next, max));
  };

  return (
    <div className={styles.playground}>
      <div className={styles.toolbar} role="toolbar" aria-label="Layout preview controls">
        <span className={styles.toolbarLabel}>Preview width</span>
        {presetEntries.map(([name, value]) => (
          <Button
            key={name}
            size="sm"
            variant={width === value ? "primary" : "secondary"}
            aria-pressed={width === value}
            onClick={() => setWidth(value)}
          >
            {name} {value}
          </Button>
        ))}
        <Button
          size="sm"
          variant={width === null ? "primary" : "secondary"}
          aria-pressed={width === null}
          onClick={() => setWidth(null)}
        >
          Full
        </Button>
        <Select
          label="Case"
          size="sm"
          items={caseItems}
          value={caseNumber === null ? "all" : String(caseNumber)}
          onValueChange={(value) => setCaseNumber(value === "all" ? null : Number(value))}
          className={styles.caseSelect}
        />
        <span className={styles.toolbarValue} aria-live="polite">
          {displayWidth > 0 ? `${displayWidth}px · ${breakpoint}` : "— px · —"}
        </span>
      </div>

      <div className={styles.shell} ref={shellRef} style={shellStyle}>
        <div className={styles.ruler} aria-hidden={max === 0}>
          {presetEntries.map(([name, value]) =>
            value <= max ? (
              <button
                key={name}
                type="button"
                className={styles.tick}
                style={{ left: `${(value / max) * 100}%` }}
                onClick={() => setWidth(value)}
                aria-label={`Set width to ${value}px (${name})`}
              >
                <span className={styles.tickLabel}>
                  {name} {value}
                </span>
              </button>
            ) : null,
          )}
          {max > 0 ? (
            <span
              className={styles.marker}
              style={{ left: `${(Math.min(displayWidth, max) / max) * 100}%` }}
              aria-hidden="true"
            />
          ) : null}
        </div>

        <div className={styles.frameWrap}>
          <div className={styles.frameBox}>
            <iframe
              title="Responsive layout preview"
              src={src}
              className={cx(styles.frame, dragging && styles.dragging)}
            />
            {/* A window splitter is a focusable separator; the ARIA pattern needs these handlers and tabIndex. */}
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize preview"
              aria-valuemin={MIN_WIDTH}
              aria-valuemax={Math.max(max, MIN_WIDTH)}
              aria-valuenow={Math.round(width ?? max)}
              tabIndex={0}
              className={styles.handle}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
              onLostPointerCapture={() => {
                drag.current = null;
                setDragging(false);
              }}
              onKeyDown={onHandleKeyDown}
              onDoubleClick={() => setWidth(null)}
            >
              <span className={styles.grip} aria-hidden="true" />
            </div>
            {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
          </div>
        </div>
      </div>
    </div>
  );
}
