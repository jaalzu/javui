import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";
import { Stack } from "../Stack";
import { Table } from "../Table";
import { VisuallyHidden } from "../VisuallyHidden";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <Stack as="section" aria-busy="true" aria-label="Loading profile" gap="3">
      <Stack direction="row" gap="3" align="center">
        <Skeleton shape="circle" />
        <Stack gap="2" style={{ flex: 1 }}>
          <Skeleton width="40%" />
          <Skeleton width="25%" />
        </Stack>
      </Stack>
      <Skeleton shape="rect" />
    </Stack>
  ),
};

export const Form: Story = {
  render: () => (
    <Stack as="section" gap="4" aria-busy="true" aria-label="Loading form" style={{ maxWidth: "24rem" }}>
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
    </Stack>
  ),
};

export const TableSkeleton: Story = {
  name: "Table",
  render: () => (
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
    </div>
  ),
};

export const Dark: Story = { ...Card, globals: { theme: "dark" } };
