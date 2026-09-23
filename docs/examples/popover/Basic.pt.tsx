import { Button, Popover, Stack } from "@prumo";

export default function Basic() {
  return (
    <Popover label="Filtrar por estado" trigger={<Button>Filtros</Button>}>
      <Stack gap={2}>
        <strong>Filtros</strong>
        <span>Popovers guardam conteúdo pequeno e interativo. O Esc fecha.</span>
      </Stack>
    </Popover>
  );
}
