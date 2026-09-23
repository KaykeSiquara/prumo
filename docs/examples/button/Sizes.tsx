import { Button, Stack } from "@prumo";

export default function Sizes() {
  return (
    <Stack direction="row" gap={2} align="center" wrap>
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  );
}
