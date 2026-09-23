import { useState } from "react";
import { Badge, Card, Table, Td, Th } from "@prumo";

export default function Sortable() {
  const [dir, setDir] = useState<"ascending" | "descending">("descending");
  const data = [
    { id: "NF 2.481", supplier: "Distribuidora Aurora", amount: 1240, state: "Pendente", tone: "warning" as const, icon: "◐" },
    { id: "RPA 118", supplier: "Folha de pagamento", amount: 3180.5, state: "Pago", tone: "success" as const, icon: "●" },
    { id: "NF 2.494", supplier: "Gráfica Horizonte", amount: 612.9, state: "Glosado", tone: "danger" as const, icon: "◆" },
  ];
  const rows = [...data].sort((a, b) => (dir === "ascending" ? a.amount - b.amount : b.amount - a.amount));
  return (
    <Card padded={false}>
      <Table caption={`Documentos, ordenados por valor, ${dir === "ascending" ? "crescente" : "decrescente"}`}>
        <thead>
          <tr>
            <Th>Documento</Th>
            <Th>Fornecedor</Th>
            <Th numeric sort={dir} onSort={() => setDir(dir === "ascending" ? "descending" : "ascending")}>Valor</Th>
            <Th>Estado</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <Td label="Documento"><strong>{r.id}</strong></Td>
              <Td label="Fornecedor">{r.supplier}</Td>
              <Td label="Valor" numeric>{r.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Td>
              <Td label="Estado"><Badge tone={r.tone} icon={r.icon}>{r.state}</Badge></Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
