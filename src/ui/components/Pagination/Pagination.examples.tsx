import { Pagination } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Pagination page={2} pageCount={9} hrefTemplate="/docs/components?page={page}" />`,
  <Pagination page={2} pageCount={9} hrefTemplate="/docs/components?page={page}" />,
);

export const examples: Example[] = [];
