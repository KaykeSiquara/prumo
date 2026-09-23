import { Button, Stack } from "@prumo";

export default function Variants() {
  return (
    <Stack direction="row" gap={2} wrap>
      <Button variant="primary">Salvar documento</Button>
      <Button>Exportar</Button>
      <Button variant="ghost">Cancelar</Button>
      <Button variant="danger">Excluir lote</Button>
    </Stack>
  );
}
