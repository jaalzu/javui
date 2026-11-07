import { Alert, Button } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Alert.examples.module.css";

export const hero = defineHero(
  `<Alert title="A new dashboard is available">
  Your reports moved to the new overview.
</Alert>`,
  <Alert title="A new dashboard is available">
    Your reports moved to the new overview.
  </Alert>,
);

export const examples: Example[] = [
  ex(
    "Basic",
    `<Alert title="A new dashboard is available">
  Your reports moved to the new overview.
</Alert>`,
    <Alert title="A new dashboard is available">
      Your reports moved to the new overview.
    </Alert>,
    "The neutral tone for a general message.",
  ),
  ex(
    "Error",
    `<Alert tone="error" title="Could not save">Check your connection and try again.</Alert>`,
    <Alert tone="error" title="Could not save">
      Check your connection and try again.
    </Alert>,
    "Error and warning are announced right away by screen readers.",
  ),
  ex(
    "Info",
    `<Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>`,
    <Alert tone="info" title="Heads up">
      Your trial ends in 3 days.
    </Alert>,
  ),
  ex(
    "Action",
    `<Alert tone="warning" title="Storage almost full" action={<Button size="xs">Upgrade</Button>}>
  You have used 90% of your plan.
</Alert>`,
    <Alert
      tone="warning"
      title="Storage almost full"
      action={<Button size="xs">Upgrade</Button>}
    >
      You have used 90% of your plan.
    </Alert>,
    "A button at the end, aligned with the title. For several actions, put them in the content.",
  ),
  ex(
    "Custom color",
    `<Alert title="Beta" className={styles.custom}>
  This page is part of the beta program.
</Alert>`,
    <Alert title="Beta" className={styles.custom}>
      This page is part of the beta program.
    </Alert>,
    "The example keeps its custom tone in Alert.examples.module.css, separate from the Alert component styles.",
  ),
];
