import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import * as Icons from "../../icons/icons.generated";
import { Stack } from "../Stack";
import { Text } from "../Text";
import styles from "./Icons.stories.module.css";

type GlyphComponent = (props: { size?: "sm" | "md" | "lg" | "xl"; weight?: "regular" | "fill" }) => ReactNode;

const entries = Object.entries(Icons).filter(([key]) => key.endsWith("Icon")) as [string, GlyphComponent][];

const meta = {
  title: "Atoms/Icons",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every generated icon, regular weight. The set is fixed at build time by `icons.config.json`. */
export const Gallery: Story = {
  render: () => (
    <ul className={styles.grid}>
      {entries.map(([name, Glyph]) => (
        <li key={name} className={styles.cell}>
          <Glyph />
          <span className={styles.name}>{name}</span>
        </li>
      ))}
    </ul>
  ),
};

/** The four sizes, regular and fill, side by side. */
export const SizesAndWeights: Story = {
  render: () => (
    <Stack gap="4">
      {(["regular", "fill"] as const).map((weight) => (
        <Stack key={weight} direction="row" gap="4" align="center" wrap>
          <Text variant="caption" size="lg" tone="muted">{weight}</Text>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <CheckGlyph key={size} name="CheckIcon" Glyph={Icons.CheckIcon} size={size} weight={weight} />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

function CheckGlyph({
  name,
  Glyph,
  size,
  weight,
}: {
  name: string;
  Glyph: GlyphComponent;
  size: "sm" | "md" | "lg" | "xl";
  weight: "regular" | "fill";
}) {
  return (
    <span className={styles.sized} title={`${name} ${size} ${weight}`}>
      <Glyph size={size} weight={weight} />
    </span>
  );
}

export const Dark: Story = { ...Gallery, globals: { theme: "dark" } };
