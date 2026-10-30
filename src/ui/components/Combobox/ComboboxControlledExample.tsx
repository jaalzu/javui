"use client";

import { useState } from "react";
import { Button, Combobox } from "@/ui";

const items = [
  { value: "ada", label: "Ada Lovelace" },
  { value: "grace", label: "Grace Hopper" },
  { value: "alan", label: "Alan Turing" },
];

export function ComboboxControlledExample() {
  const [value, setValue] = useState("ada");
  return <div><Combobox label="Assignee" items={items} value={value} onValueChange={setValue} /><Button variant="secondary" size="sm" onClick={() => setValue("")}>Clear</Button></div>;
}
