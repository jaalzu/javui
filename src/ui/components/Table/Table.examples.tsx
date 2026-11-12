import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Table.examples.module.css";
const people = [
  ["Alice Johnson", "alice@example.com", "Admin", "Active"],
  ["Bob Smith", "bob@example.com", "Editor", "Active"],
  ["Carol White", "carol@example.com", "Viewer", "Inactive"],
  ["Dan Brown", "dan@example.com", "Editor", "Active"],
  ["Eve Davis", "eve@example.com", "Admin", "Pending"],
] as const;

const invoices = [
  ["INV-001", "Paid", "$250.00"],
  ["INV-002", "Pending", "$150.00"],
  ["INV-003", "Paid", "$350.00"],
] as const;

function PeopleTable() {
  return (
    <div className={styles.stage}>
      <Table aria-label="Team members">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map(([name, email, role, status]) => (
            <TableRow key={email}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InvoiceTable() {
  return (
    <div className={styles.stage}>
      <Table aria-label="Invoices">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(([id, status, amount]) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export const hero = defineHero(
  `<Table aria-label="Team members">
  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
  <TableBody>{data.map((row) => <TableRow key={row.email}>...</TableRow>)}</TableBody>
</Table>`,
  <PeopleTable />,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Table aria-label="Team members">
  <TableHeader>...</TableHeader>
  <TableBody>{data.map((row) => <TableRow key={row.email}>...</TableRow>)}</TableBody>
</Table>`,
    <PeopleTable />,
  ),
  ex(
    "With footer",
    `<Table aria-label="Invoices">
  <TableHeader>...</TableHeader>
  <TableBody>{invoices.map((row) => <TableRow key={row.id}>...</TableRow>)}</TableBody>
  <TableFooter><TableRow><TableCell colSpan={2}>Total</TableCell><TableCell>$750.00</TableCell></TableRow></TableFooter>
</Table>`,
    <InvoiceTable />,
    "Use the footer for totals or other summary values.",
  ),
];
