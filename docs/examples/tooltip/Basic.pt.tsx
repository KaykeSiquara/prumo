import { IconButton, IconSearch, Tooltip } from "@prumo";

export default function Basic() {
  return (
    <Tooltip content="Buscar documentos (Ctrl K)">
      <IconButton label="Buscar documentos"><IconSearch /></IconButton>
    </Tooltip>
  );
}
