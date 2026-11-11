"use client";

import { useState } from "react";
import { Field, Text, ToggleGroup, ToggleGroupItem } from "@/ui";
import styles from "./ToggleGroupFontWeightExample.module.css";

const weights = [
  { value: "light", label: "Light", cssWeight: "regular" as const },
  { value: "normal", label: "Normal", cssWeight: "regular" as const },
  { value: "medium", label: "Medium", cssWeight: "medium" as const },
  { value: "bold", label: "Bold", cssWeight: "semibold" as const },
];

export function ToggleGroupFontWeightExample() {
  const [fontWeight, setFontWeight] = useState("normal");

  return (
    <Field
      label="Font weight"
      description={
        <>
          Use <Text as="code" variant="code">font-{fontWeight}</Text> to set the font weight.
        </>
      }
    >
      <ToggleGroup
        aria-label="Font weight"
        value={[fontWeight]}
        onValueChange={(value) => setFontWeight(value[0] ?? fontWeight)}
        size="lg"
        spacing="md"
      >
        {weights.map((weight) => (
          <ToggleGroupItem
            key={weight.value}
            value={weight.value}
            aria-label={weight.label}
            className={styles.weightItem}
          >
            <span className={styles.sample} data-weight={weight.cssWeight}>Aa</span>
            <span className={styles.weightLabel}>{weight.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}
