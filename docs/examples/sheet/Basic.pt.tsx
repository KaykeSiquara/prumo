import { Badge, Button, Sheet, Stack } from "@prumo";

export default function Basic() {
  return (
    <Sheet closeLabel="Fechar" title="NF 2.481" description="Distribuidora Aurora" trigger={<Button>Abrir documento</Button>}>
      <Stack gap={3}>
        <Badge tone="warning" icon="◐">Pendente</Badge>
        <p style={{ margin: 0 }}>R$ 1.240,00, com vencimento em 12 de março.</p>
      </Stack>
    </Sheet>
  );
}
