"use client";

import styles from "./Card.examples.module.css";
import type { CSSProperties } from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonGroupText,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Link,
  MinusIcon,
  PlusIcon,
  Stack,
  Text,
} from "@javui/ui";

const sizes = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "custom", label: "Custom" },
] as const;

type Size = (typeof sizes)[number]["value"];

const MIN = 0;
const MAX = 64;
const STEP = 4;

/** Docs-only demo: `sm` and `default` set `size`; `lg` and `custom` set `--card-spacing`. */
export function CardSizeExample() {
  const [size, setSize] = useState<Size>("default");
  const [px, setPx] = useState(24);

  const change = (delta: number) =>
    setPx((value) => Math.min(MAX, Math.max(MIN, value + delta)));

  const style: CSSProperties | undefined =
    size === "lg"
      ? ({ "--card-spacing": "var(--space-8)" } as CSSProperties)
      : size === "custom"
        ? ({ "--card-spacing": `${px}px` } as CSSProperties)
        : undefined;

  return (
    <Stack gap="4">
      <Stack direction="row" gap="2" wrap align="center">
        <Stack
          direction="row"
          gap="2"
          wrap
          align="center"
          role="group"
          aria-label="Card size"
        >
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

        {size === "custom" ? (
          <ButtonGroup
            className={styles.counter}
            aria-label="Custom card spacing"
            size="xs"
          >
            <Button
              variant="outline"
              aria-label="Decrease spacing"
              startIcon={<MinusIcon />}
              disabled={px <= MIN}
              onClick={() => change(-STEP)}
            />
            <ButtonGroupText className={styles.counterValue}>
              {px}px
            </ButtonGroupText>
            <Button
              variant="outline"
              aria-label="Increase spacing"
              startIcon={<PlusIcon />}
              disabled={px >= MAX}
              onClick={() => change(STEP)}
            />
          </ButtonGroup>
        ) : null}
      </Stack>

      <Card
        variant="surface"
        size={size === "sm" ? "sm" : "default"}
        style={style}
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
