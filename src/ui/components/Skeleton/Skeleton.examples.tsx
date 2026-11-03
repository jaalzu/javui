import { Skeleton, Stack } from "@/ui";
import { defineHero, type Example } from "@/docs/example";
import styles from "./Skeleton.examples.module.css";

export const hero = defineHero(
  `<Stack direction="row" gap="3" align="center" aria-busy="true">
  <Skeleton shape="circle" />
  <Stack gap="2" className={styles.content}>
    <Skeleton width="60%" />
    <Skeleton width="35%" />
  </Stack>
</Stack>`,
  <Stack direction="row" gap="3" align="center" aria-busy="true">
    <Skeleton shape="circle" />
    <Stack gap="2" className={styles.content}>
      <Skeleton width="60%" />
      <Skeleton width="35%" />
    </Stack>
  </Stack>,
);

export const examples: Example[] = [];
