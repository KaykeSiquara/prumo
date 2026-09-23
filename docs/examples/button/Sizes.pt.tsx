import { Button, Stack } from "@prumo";

export default function Sizes() {
  return (
    <Stack direction="row" gap={2} align="center" wrap>
      <Button size="sm">Pequeno</Button>
      <Button>Médio</Button>
      <Button size="lg">Grande</Button>
    </Stack>
  );
}
