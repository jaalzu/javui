import type { Metadata } from "next";
import { Heading } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";
import s from "./color.module.css";

export const metadata: Metadata = { title: "Colors" };

type Token = [name: string, description: string];

const groups: { title: string; note?: string; tokens: Token[] }[] = [
  {
    title: "Surfaces",
    note: "Backgrounds for the page and the blocks on it. At rest, use a border or a lift shadow, never both. Page, card and sunken are already three nested levels.",
    tokens: [
      ["page", "The page itself. Everything sits on it."],
      ["card", "Content blocks on the page: cards, panels, table rows."],
      ["sunken", "Recessed areas inside a card: code blocks, wells, inset fields."],
      [
        "highlight",
        "Highlighted panel inside a card: a metric, total or goal. Dark: lighter than the card; light: soft gray.",
      ],
      ["modal", "Layers above the page: dialog, menu, select list, popover."],
      ["overlay", "Backdrop behind dialogs."],
    ],
  },
  {
    title: "Component",
    note: "Controls at rest and their states.",
    tokens: [
      [
        "component",
        "Background of interactive controls at rest: inputs, secondary buttons, toggles.",
      ],
      ["component-hover", "Component hovered."],
      ["component-active", "Component pressed."],
      [
        "component-on-sunken",
        "Component placed on a sunken area, so it still stands out.",
      ],
    ],
  },
  {
    title: "Transparent",
    note: "Ghost controls and list items. No background until you interact.",
    tokens: [
      ["transparent-hover", "Ghost control or list item hovered."],
      [
        "transparent-active",
        "Ghost control pressed, or list item selected or highlighted.",
      ],
    ],
  },
  {
    title: "Foreground",
    note: "Text and icons.",
    tokens: [
      ["primary-foreground", "Main text and icons."],
      ["secondary-foreground", "Supporting text."],
      ["tertiary-foreground", "Hints, placeholders, metadata."],
    ],
  },
  {
    title: "Inverted",
    note: "The main button and its text.",
    tokens: [
      ["inverted-solid", "Primary action background: the main button."],
      ["inverted-solid-hover", "Inverted solid hovered."],
      ["inverted-solid-active", "Inverted solid pressed."],
      ["on-inverted-foreground", "Text on inverted solid surfaces."],
    ],
  },
  {
    title: "Brand",
    tokens: [
      ["brand-solid", "Brand source: change this one to rebrand the family."],
      ["brand-solid-hover", "Brand solid hovered, derived from brand-solid."],
      ["brand-subtle", "Soft brand tint, derived from brand-solid."],
      ["brand-foreground", "Brand text and icons, derived from brand-solid."],
      ["brand-foreground-soft", "Brand text on brand-subtle, derived from brand-solid."],
      ["on-brand-solid-foreground", "Text on brand solid."],
      ["brand-border-default", "Brand border: selected card, active field."],
      ["brand-border-focus", "Focus ring. Stays text-colored."],
    ],
  },
  {
    title: "Positive",
    tokens: [
      ["positive-solid", "Positive background for strong feedback."],
      ["positive-solid-hover", "Positive solid hovered."],
      ["positive-subtle", "Soft positive tint behind text or icons."],
      ["positive-foreground", "Positive colored text and icons."],
      ["on-positive-solid-foreground", "Text on positive solid."],
      ["positive-border-default", "Positive border."],
    ],
  },
  {
    title: "Warning",
    tokens: [
      ["warning-solid", "Warning background for strong feedback."],
      ["warning-solid-hover", "Warning solid hovered."],
      ["warning-subtle", "Soft warning tint behind text or icons."],
      ["warning-foreground", "Warning colored text and icons."],
      ["on-warning-solid-foreground", "Text on warning solid."],
      ["warning-border-default", "Warning border."],
    ],
  },
  {
    title: "Info",
    tokens: [
      ["info-solid", "Info background for strong feedback."],
      ["info-solid-hover", "Info solid hovered."],
      ["info-subtle", "Soft info tint behind text or icons."],
      ["info-foreground", "Info colored text and icons."],
      ["on-info-solid-foreground", "Text on info solid."],
      ["info-border-default", "Info border."],
    ],
  },
  {
    title: "Danger",
    tokens: [
      ["danger-solid", "Danger background for strong feedback."],
      ["danger-solid-hover", "Danger solid hovered."],
      ["danger-solid-active", "Danger solid pressed."],
      ["danger-subtle", "Soft danger tint behind text or icons."],
      [
        "danger-subtle-hover",
        "Danger subtle hovered, e.g. destructive menu item.",
      ],
      ["danger-foreground", "Danger colored text and icons."],
      ["on-danger-solid-foreground", "Text on danger solid."],
      ["danger-border-default", "Danger border."],
    ],
  },
  {
    title: "Border",
    tokens: [
      ["border-default", "Default borders: cards and dividers."],
      [
        "border-strong",
        "Edges of form controls, checked at 3:1 contrast.",
      ],
    ],
  },
  {
    title: "Disabled",
    tokens: [
      ["disabled", "Background of disabled controls."],
      ["disabled-foreground", "Text and icons of disabled controls."],
      ["border-disabled", "Borders of disabled controls."],
    ],
  },
];

const shadows: {
  name: string;
  token: string;
  use: string;
  yes: string[];
  no: string;
}[] = [
  {
    name: "Inset ring",
    token: "shadow-inset-ring",
    use: "A quiet 1px ring drawn inside the edge, so it never grows the box.",
    yes: ["Outline badges and chips", "Selected states"],
    no: "Anything that needs a visible border or a lift.",
  },
  {
    name: "Default",
    token: "shadow-default",
    use: "A small lift for controls that feel pressable or draggable.",
    yes: ["Slider thumb"],
    no: "Big surfaces. A large card with this looks heavy.",
  },
  {
    name: "Raised",
    token: "shadow-raised",
    use: "A raised look for secondary controls.",
    yes: ["Secondary buttons"],
    no: "Floating panels. Menus and dialogs get Large or Extra large.",
  },
  {
    name: "Large",
    token: "shadow-large",
    use: "Floating panels tied to a trigger. They close when you click away.",
    yes: ["Menu and context menu", "Select list", "Popover", "Toast"],
    no: "Full-screen layers. Those get Extra large.",
  },
  {
    name: "Extra large",
    token: "shadow-extra-large",
    use: "Surfaces above the whole page, usually with an overlay behind.",
    yes: ["Dialog and alert dialog", "Search palette"],
    no: "Small floating things. A menu with this feels too heavy.",
  },
];

export default function Colors() {
  return (
    <DocPage
      href="/docs/colors"
      title="Colors"
      description="Every color is a semantic token. Light and dark values switch automatically."
    >
      {groups.map((g) => (
        <section key={g.title}>
          <Heading as="h2" size={6}>
            {g.title}
          </Heading>
          {g.note ? <p>{g.note}</p> : null}
          <div className={s.grid}>
            {g.tokens.map(([name, desc]) => (
              <div key={name} className={s.item}>
                <div
                  className={s.swatch}
                  style={{ background: `var(--color-${name})` }}
                />
                <span className={s.name}>--color-{name}</span>
                <span className={s.desc}>{desc}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <Heading as="h2" size={6}>
        Shadows
      </Heading>
      <p>
        Four elevation levels plus a quiet inset ring. Each elevation starts
        with a 1px ring so the edge reads on any surface.
      </p>
      <div className={s.shadows}>
        {shadows.map((sh) => (
          <div key={sh.token} className={s.card}>
            <div
              className={s.box}
              style={{ boxShadow: `var(--${sh.token})` }}
            />
            <strong>{sh.name}</strong>
            <span className={s.name}>--{sh.token}</span>
            <p>{sh.use}</p>
            <ul className={s.list}>
              {sh.yes.map((y) => (
                <li key={y}>{y}</li>
              ))}
            </ul>
            <p className={s.no}>Not for: {sh.no}</p>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
