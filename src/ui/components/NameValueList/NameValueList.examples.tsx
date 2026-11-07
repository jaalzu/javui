import { NameValueList } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const items = [
  { label: "Status", value: "Shipped" },
  { label: "Owner", value: "Ada Lovelace" },
];

export const hero = defineHero(
  `<NameValueList layout="horizontal" items={items} />`,
  <NameValueList layout="horizontal" items={items} />,
);

export const examples: Example[] = [
  ex("Stacked", `<NameValueList layout="stacked" items={items} />`, <NameValueList layout="stacked" items={items} />),
];
