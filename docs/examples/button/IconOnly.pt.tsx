import { IconButton, IconMoreHorizontal, IconSearch, IconX, Stack } from "@prumo";

export default function IconOnly() {
  return (
    <Stack direction="row" gap={1}>
      <IconButton label="Buscar"><IconSearch /></IconButton>
      <IconButton label="Mais ações"><IconMoreHorizontal /></IconButton>
      <IconButton label="Fechar painel"><IconX /></IconButton>
    </Stack>
  );
}
