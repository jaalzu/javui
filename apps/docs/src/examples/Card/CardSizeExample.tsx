"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Link,
  Stack,
  Text,
} from "@javui/ui";

const sizes = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
] as const;

type Size = (typeof sizes)[number]["value"];

/** Docs-only demo: the selected step sets `size`, and the largest one uses a custom `--card-spacing`. */
export function CardSizeExample() {
  const [size, setSize] = useState<Size>("default");

  return (
    <Stack gap="4">
      <Stack direction="row" gap="2" wrap align="center" role="group" aria-label="Card size">
        {sizes.map((option) => (
          <Button
            key={option.value}
            size="sm"
            variant={size === option.value ? "primary" : "secondary"}
            aria-pressed={size === option.value}
            onClick={() => setSize(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </Stack>
      <Card
        variant="surface"
        size={size === "sm" ? "sm" : "default"}
        style={
          size === "lg"
            ? ({ "--card-spacing": "var(--space-8)" } as CSSProperties)
            : undefined
        }
      >
        <CardHeader>
          <CardTitle>Release notes</CardTitle>
          <CardDescription>What changed in this version.</CardDescription>
          <CardAction>
            <Badge variant="brand">New</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Text>Body content sits between the header and the footer.</Text>
        </CardContent>
        <CardFooter>
          <Link href="#" standalone>
            View all
          </Link>
        </CardFooter>
      </Card>
    </Stack>
  );
}
