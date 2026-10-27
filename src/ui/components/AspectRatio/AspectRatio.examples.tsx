import { AspectRatio, Grid } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./AspectRatio.examples.module.css";

const Tile = () => <div className={styles.tile} />;

export const hero = defineHero(
  `<AspectRatio ratio={16 / 9}>
  <div />
</AspectRatio>`,
  <AspectRatio ratio={16 / 9}>
    <Tile />
  </AspectRatio>,
);

export const examples: Example[] = [
  ex(
    "Square",
    `<AspectRatio ratio={1}>
  <div />
</AspectRatio>`,
    <div className={styles.narrow}>
      <AspectRatio ratio={1}>
        <Tile />
      </AspectRatio>
    </div>,
  ),
  ex(
    "Portrait",
    `<AspectRatio ratio={3 / 4}>
  <div />
</AspectRatio>`,
    <div className={styles.narrow}>
      <AspectRatio ratio={3 / 4}>
        <Tile />
      </AspectRatio>
    </div>,
  ),
  ex(
    "Gallery",
    `<Grid columns={2} gap="3">
  <AspectRatio ratio={16 / 9}><div /></AspectRatio>
  <AspectRatio ratio={16 / 9}><div /></AspectRatio>
  <AspectRatio ratio={16 / 9}><div /></AspectRatio>
  <AspectRatio ratio={16 / 9}><div /></AspectRatio>
</Grid>`,
    <div className={styles.wide}>
      <Grid columns={2} gap="3">
        <AspectRatio ratio={16 / 9}>
          <Tile />
        </AspectRatio>
        <AspectRatio ratio={16 / 9}>
          <Tile />
        </AspectRatio>
        <AspectRatio ratio={16 / 9}>
          <Tile />
        </AspectRatio>
        <AspectRatio ratio={16 / 9}>
          <Tile />
        </AspectRatio>
      </Grid>
    </div>,
  ),
];
