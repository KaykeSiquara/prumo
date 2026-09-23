import { Badge, Stack } from "@prumo";

export default function Status() {
  return (
    <Stack direction="row" gap={2} wrap>
      <Badge tone="success" icon="●">Pago</Badge>
      <Badge tone="warning" icon="◐">Pendente</Badge>
      <Badge tone="danger" icon="◆">Glosado</Badge>
      <Badge tone="info">Novo</Badge>
      <Badge>Rascunho</Badge>
    </Stack>
  );
}
