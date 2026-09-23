import { IconButton, IconMoreHorizontal, IconSearch, IconX, Stack } from "@prumo";

export default function IconOnly() {
  return (
    <Stack direction="row" gap={1}>
      <IconButton label="Search"><IconSearch /></IconButton>
      <IconButton label="More actions"><IconMoreHorizontal /></IconButton>
      <IconButton label="Close panel"><IconX /></IconButton>
    </Stack>
  );
}
