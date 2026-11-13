import { DescriptionList, DescriptionListDetails, DescriptionListTerm } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<DescriptionList layout="horizontal">
  <DescriptionListTerm>Status</DescriptionListTerm>
  <DescriptionListDetails>Shipped</DescriptionListDetails>
</DescriptionList>`,
  <DescriptionList layout="horizontal">
    <DescriptionListTerm>Status</DescriptionListTerm>
    <DescriptionListDetails>Shipped</DescriptionListDetails>
  </DescriptionList>,
);

export const examples: Example[] = [
  ex(
    "Inline",
    `<DescriptionList layout="inline">
  <DescriptionListTerm>Owner</DescriptionListTerm>
  <DescriptionListDetails>Ada Lovelace</DescriptionListDetails>
</DescriptionList>`,
    <DescriptionList layout="inline">
      <DescriptionListTerm>Owner</DescriptionListTerm>
      <DescriptionListDetails>Ada Lovelace</DescriptionListDetails>
    </DescriptionList>,
  ),
];
