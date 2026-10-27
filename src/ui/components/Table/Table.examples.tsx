import { Table } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Table
  caption="Plans"
  columns={[
    { key: "name", header: "Plan" },
    { key: "seats", header: "Seats", align: "end" },
    { key: "price", header: "Price", align: "end" },
  ]}
  rows={[
    { name: "Free", seats: "1", price: "$0" },
    { name: "Team", seats: "10", price: "$12" },
  ]}
/>`,
  <Table
    caption="Plans"
    columns={[
      { key: "name", header: "Plan" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "price", header: "Price", align: "end" },
    ]}
    rows={[
      { name: "Free", seats: "1", price: "$0" },
      { name: "Team", seats: "10", price: "$12" },
    ]}
  />,
);

export const examples: Example[] = [];
