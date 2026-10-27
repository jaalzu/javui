import type { CSSProperties } from "react";
import { Alert, Button, Link, Stack, Text } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex(
      "Basic",
      `<Alert title="A new dashboard is available">
  Your reports moved to the new overview.
</Alert>`,
      <Alert title="A new dashboard is available">Your reports moved to the new overview.</Alert>,
      "The neutral tone for a general message.",
    ),
    ex(
      "Error",
      `<Alert tone="error" title="Could not save">Check your connection and try again.</Alert>`,
      <Alert tone="error" title="Could not save">Check your connection and try again.</Alert>,
      "Error and warning are announced right away by screen readers.",
    ),
    ex(
      "Info",
      `<Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>`,
      <Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>,
    ),
    ex(
      "Action",
      `<Alert tone="warning" title="Storage almost full">
  You have used 90% of your plan.
  <Stack direction="row" gap="3" align="center">
    <Button size="sm">Upgrade</Button>
    <Text as="span" variant="body" size="sm">
      <Link href="/docs" tone="muted">Compare plans</Link>
    </Text>
  </Stack>
</Alert>`,
      <Alert tone="warning" title="Storage almost full">
        <Stack gap="3">
          You have used 90% of your plan.
          <Stack direction="row" gap="3" align="center">
            <Button size="sm">Upgrade</Button>
            <Text as="span" variant="body" size="sm">
              <Link href="/docs" tone="muted">Compare plans</Link>
            </Text>
          </Stack>
        </Stack>
      </Alert>,
      "Actions go in the content, left aligned: a primary button and a muted secondary link.",
    ),
    ex(
      "Custom color",
      `<Alert style={{ "--alert-tone": "oklch(55% 0.19 350)" }} title="Beta">
  This page is part of the beta program.
</Alert>`,
      <Alert style={{ "--alert-tone": "oklch(55% 0.19 350)" } as CSSProperties} title="Beta">
        This page is part of the beta program.
      </Alert>,
      "Override `--alert-tone` with any color: icon, title, border and background follow it.",
    ),
];
