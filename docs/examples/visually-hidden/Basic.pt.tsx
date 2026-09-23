import { IconButton, IconX, VisuallyHidden } from "@prumo";

export default function Basic() {
  return (
    <p style={{ margin: 0 }}>
      3 novos <VisuallyHidden>documentos aguardando aprovação</VisuallyHidden>
      <IconButton label="Dispensar" size="sm"><IconX /></IconButton>
    </p>
  );
}
