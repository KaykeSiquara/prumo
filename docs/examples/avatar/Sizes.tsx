import { Avatar, Stack } from "@prumo";

export default function Sizes() {
  return (
    <Stack direction="row" gap={2} align="center">
      <Avatar name="Marina Duarte" size="sm" />
      <Avatar name="Rita Almeida" />
      <Avatar name="Caio Mendes" size="lg" />
    </Stack>
  );
}
