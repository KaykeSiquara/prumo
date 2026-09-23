import { IconButton, IconSearch, Tooltip } from "@prumo";

export default function Basic() {
  return (
    <Tooltip content="Search documents (Ctrl K)">
      <IconButton label="Search documents"><IconSearch /></IconButton>
    </Tooltip>
  );
}
