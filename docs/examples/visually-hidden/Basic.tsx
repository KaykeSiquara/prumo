import { IconButton, IconX, VisuallyHidden } from "@prumo";

export default function Basic() {
  return (
    <p style={{ margin: 0 }}>
      3 new <VisuallyHidden>documents awaiting approval</VisuallyHidden>
      <IconButton label="Dismiss" size="sm"><IconX /></IconButton>
    </p>
  );
}
