import { Button, Stack } from "@prumo";

export default function Basic() {
  return (
    <Stack direction="row" gap={2} justify="flex-end" wrap>
      <Button variant="ghost">Cancelar</Button>
      <Button variant="primary">Salvar</Button>
    </Stack>
  );
}
