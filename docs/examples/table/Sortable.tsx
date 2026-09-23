import { useState } from "react";
import { Badge, Card, Table, Td, Th } from "@prumo";

export default function Sortable() {
  const [dir, setDir] = useState<"ascending" | "descending">("descending");
  const data = [
    { id: "NF 2.481", supplier: "Distribuidora Aurora", amount: 1240, state: "Pending", tone: "warning" as const, icon: "◐" },
    { id: "RPA 118", supplier: "Payroll", amount: 3180.5, state: "Paid", tone: "success" as const, icon: "●" },
    { id: "NF 2.494", supplier: "Gráfica Horizonte", amount: 612.9, state: "Rejected", tone: "danger" as const, icon: "◆" },
  ];
  const rows = [...data].sort((a, b) => (dir === "ascending" ? a.amount - b.amount : b.amount - a.amount));
  return (
    <Card padded={false}>
      <Table caption={`Documents, sorted by amount, ${dir}`}>
        <thead>
          <tr>
            <Th>Document</Th>
            <Th>Supplier</Th>
            <Th numeric sort={dir} onSort={() => setDir(dir === "ascending" ? "descending" : "ascending")}>Amount</Th>
            <Th>State</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <Td label="Document"><strong>{r.id}</strong></Td>
              <Td label="Supplier">{r.supplier}</Td>
              <Td label="Amount" numeric>{r.amount.toLocaleString("en", { style: "currency", currency: "BRL" })}</Td>
              <Td label="State"><Badge tone={r.tone} icon={r.icon}>{r.state}</Badge></Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
