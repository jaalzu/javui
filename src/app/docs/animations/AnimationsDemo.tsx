"use client";

import { useState, type ReactNode } from "react";
import { Button, Heading, Text } from "@/ui";
import s from "./animations.module.css";

const cx = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ");

const durations = [
  {
    name: "Fast",
    token: "--motion-duration-fast",
    className: s.fast,
    note: "Hover, color and focus.",
  },
  {
    name: "Base",
    token: "--motion-duration-base",
    className: s.base,
    note: "Menus, popovers and selects.",
  },
  {
    name: "Slow",
    token: "--motion-duration-slow",
    className: s.slow,
    note: "Dialogs and their backdrop.",
  },
];

const easings = [
  {
    name: "Standard",
    token: "--motion-easing-standard",
    className: s.standard,
    note: "Color and hover.",
  },
  {
    name: "Out",
    token: "--motion-easing-out",
    className: s.out,
    note: "Entrances and anything that answers the user.",
  },
  {
    name: "In",
    token: "--motion-easing-in",
    className: s.in,
    note: "Exits only.",
  },
  {
    name: "In-out",
    token: "--motion-easing-in-out",
    className: s.inOut,
    note: "Elements that move or morph on screen.",
  },
];

const scales = [
  {
    name: "Press",
    token: "--motion-scale-press",
    className: s.pressScale,
    note: "Pressed buttons.",
  },
  {
    name: "Popup",
    token: "--motion-scale-popup",
    className: s.popupScale,
    note: "Menu, select and popover.",
  },
  {
    name: "Tooltip",
    token: "--motion-scale-tooltip",
    className: s.tooltipScale,
    note: "Tooltip.",
  },
  {
    name: "Modal",
    token: "--motion-scale-modal",
    className: s.modalScale,
    note: "Dialog, still centered.",
  },
];

/** One motion group with its own replay control, so each token can be watched on its own. */
function ReplaySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [run, setRun] = useState(0);

  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <Heading as="h2" size={6}>
          {title}
        </Heading>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setRun((value) => value + 1)}
        >
          Play again
        </Button>
      </div>
      <div key={run} className={s.list}>
        {children}
      </div>
    </section>
  );
}

/** Replays each motion group in place, so the difference between tokens can be compared. */
export function AnimationsDemo() {
  return (
    <div className={s.sections}>
      <ReplaySection title="Durations">
        {durations.map((duration) => (
          <div key={duration.name} className={s.card}>
            <div className={s.cardHead}>
              <Text>{duration.name}</Text>
              <span className={s.token}>{duration.token}</span>
            </div>
            <div className={s.track}>
              <span className={cx(s.dot, duration.className)} />
            </div>
            <Text variant="caption" size="lg" tone="muted">
              {duration.note}
            </Text>
          </div>
        ))}
      </ReplaySection>

      <ReplaySection title="Easing">
        {easings.map((easing) => (
          <div key={easing.name} className={s.card}>
            <div className={s.cardHead}>
              <Text>{easing.name}</Text>
              <span className={s.token}>{easing.token}</span>
            </div>
            <div className={s.track}>
              <span className={cx(s.dot, s.slow, easing.className)} />
            </div>
            <Text variant="caption" size="lg" tone="muted">
              {easing.note}
            </Text>
          </div>
        ))}
      </ReplaySection>

      <ReplaySection title="Scale">
        {scales.map((scale) => (
          <div key={scale.name} className={s.card}>
            <div className={s.cardHead}>
              <Text>{scale.name}</Text>
              <span className={s.token}>{scale.token}</span>
            </div>
            <div className={s.stage}>
              <span className={cx(s.square, scale.className)} />
            </div>
            <Text variant="caption" size="lg" tone="muted">
              {scale.note}
            </Text>
          </div>
        ))}
      </ReplaySection>
    </div>
  );
}
