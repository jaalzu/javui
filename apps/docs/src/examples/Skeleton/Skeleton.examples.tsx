import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
  Stack,
  Table,
  VisuallyHidden,
} from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Skeleton.examples.module.css";

export const hero = defineHero(
  `<Stack direction="row" gap="3" align="center" aria-busy="true">
  <Skeleton shape="circle" />
  <Stack gap="2" className={styles.content}>
    <Skeleton width="60%" />
    <Skeleton width="35%" />
  </Stack>
</Stack>`,
  <Stack direction="row" gap="3" align="center" aria-busy="true">
    <Skeleton shape="circle" />
    <Stack gap="2" className={styles.content}>
      <Skeleton width="60%" />
      <Skeleton width="35%" />
    </Stack>
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Card",
    `<Card as="article" aria-busy="true">
  <CardHeader>
    <Stack gap="2">
      <Skeleton width="45%" height="1.25rem" />
      <Skeleton width="70%" />
    </Stack>
  </CardHeader>
  <CardContent>
    <Skeleton shape="rect" height="8rem" />
  </CardContent>
  <CardFooter>
    <Skeleton width="6rem" height="2.25rem" />
  </CardFooter>
</Card>`,
    <div className={styles.card}>
      <Card as="article" aria-busy="true">
        <CardHeader>
          <Stack gap="2">
            <Skeleton width="45%" height="1.25rem" />
            <Skeleton width="70%" />
          </Stack>
        </CardHeader>
        <CardContent>
          <Skeleton shape="rect" height="8rem" />
        </CardContent>
        <CardFooter>
          <Skeleton width="6rem" height="2.25rem" />
        </CardFooter>
      </Card>
    </div>,
    "The skeleton follows the shape of the card that is about to replace it.",
  ),
  ex(
    "Form",
    `<Stack gap="4" aria-busy="true">
  <Stack gap="2">
    <Skeleton width="4rem" height="0.875rem" />
    <Skeleton height="2.25rem" />
  </Stack>
  <Stack gap="2">
    <Skeleton width="5rem" height="0.875rem" />
    <Skeleton height="2.25rem" />
  </Stack>
  <Stack direction="row" gap="3">
    <Stack gap="2" style={{ flex: 1 }}>
      <Skeleton width="4rem" height="0.875rem" />
      <Skeleton height="2.25rem" />
    </Stack>
    <Stack gap="2" style={{ flex: 1 }}>
      <Skeleton width="4rem" height="0.875rem" />
      <Skeleton height="2.25rem" />
    </Stack>
  </Stack>
  <Skeleton width="7rem" height="2.25rem" />
</Stack>`,
    <Stack gap="4" aria-busy="true" className={styles.form}>
      <Stack gap="2">
        <Skeleton width="4rem" height="0.875rem" />
        <Skeleton height="2.25rem" />
      </Stack>
      <Stack gap="2">
        <Skeleton width="5rem" height="0.875rem" />
        <Skeleton height="2.25rem" />
      </Stack>
      <Stack direction="row" gap="3">
        <Stack gap="2" style={{ flex: 1 }}>
          <Skeleton width="4rem" height="0.875rem" />
          <Skeleton height="2.25rem" />
        </Stack>
        <Stack gap="2" style={{ flex: 1 }}>
          <Skeleton width="4rem" height="0.875rem" />
          <Skeleton height="2.25rem" />
        </Stack>
      </Stack>
      <Skeleton width="7rem" height="2.25rem" />
    </Stack>,
    "One skeleton per label, field and submit control keeps the layout stable while the form loads.",
  ),
  ex(
    "Table",
    `<div aria-busy="true">
  <Table
    caption="Loading invoices"
    columns={[
      { key: "invoice", header: "Invoice" },
      { key: "status", header: "Status" },
      { key: "amount", header: "Amount", align: "end" },
    ]}
    rows={[
      {
        invoice: (
          <>
            <VisuallyHidden>Invoice 1</VisuallyHidden>
            <Skeleton width="8rem" />
          </>
        ),
        status: <Skeleton width="5rem" />,
        amount: <Skeleton width="4rem" />,
      },
      {
        invoice: (
          <>
            <VisuallyHidden>Invoice 2</VisuallyHidden>
            <Skeleton width="7rem" />
          </>
        ),
        status: <Skeleton width="4rem" />,
        amount: <Skeleton width="3.5rem" />,
      },
      {
        invoice: (
          <>
            <VisuallyHidden>Invoice 3</VisuallyHidden>
            <Skeleton width="9rem" />
          </>
        ),
        status: <Skeleton width="5rem" />,
        amount: <Skeleton width="4rem" />,
      },
    ]}
  />
</div>`,
    <div aria-busy="true">
      <Table
        caption="Loading invoices"
        columns={[
          { key: "invoice", header: "Invoice" },
          { key: "status", header: "Status" },
          { key: "amount", header: "Amount", align: "end" },
        ]}
        rows={[
          {
            invoice: (
              <>
                <VisuallyHidden>Invoice 1</VisuallyHidden>
                <Skeleton width="8rem" />
              </>
            ),
            status: <Skeleton width="5rem" />,
            amount: <Skeleton width="4rem" />,
          },
          {
            invoice: (
              <>
                <VisuallyHidden>Invoice 2</VisuallyHidden>
                <Skeleton width="7rem" />
              </>
            ),
            status: <Skeleton width="4rem" />,
            amount: <Skeleton width="3.5rem" />,
          },
          {
            invoice: (
              <>
                <VisuallyHidden>Invoice 3</VisuallyHidden>
                <Skeleton width="9rem" />
              </>
            ),
            status: <Skeleton width="5rem" />,
            amount: <Skeleton width="4rem" />,
          },
        ]}
      />
    </div>,
    "Keep the real column headers and skeleton only the cells, so the table keeps its structure and accessible name.",
  ),
];
