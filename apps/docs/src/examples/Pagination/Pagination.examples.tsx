import { Pagination, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Pagination page={2} pageCount={9} hrefTemplate="/docs/components?page={page}" />`,
  <Pagination page={2} pageCount={9} hrefTemplate="/docs/components?page={page}" />,
);

export const examples: Example[] = [
  ex(
    "Page numbers only",
    `<Pagination
  page={3}
  pageCount={7}
  hrefTemplate="/docs/components?page={page}"
  showPreviousNext={false}
/>`,
    <Stack align="center">
      <Pagination
        page={3}
        pageCount={5}
        hrefTemplate="/docs/components?page={page}"
        showPreviousNext={false}
      />
    </Stack>,
    "Use this compact version when Previous and Next are redundant.",
  ),
  ex(
    "Icon steps",
    `<Pagination
  page={3}
  pageCount={7}
  hrefTemplate="/docs/components?page={page}"
  showPageNumbers={false}
  iconSteps
/>`,
    <Stack align="center">
      <Pagination
        page={3}
        pageCount={5}
        hrefTemplate="/docs/components?page={page}"
        showPageNumbers={false}
        iconSteps
      />
    </Stack>,
    "Use icon-only Previous and Next controls when the page numbers are shown elsewhere.",
  ),
];
