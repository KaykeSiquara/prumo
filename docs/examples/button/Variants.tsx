import { Button, Stack } from "@prumo";

export default function Variants() {
  return (
    <Stack direction="row" gap={2} wrap>
      <Button variant="primary">Save document</Button>
      <Button>Export</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete batch</Button>
    </Stack>
  );
}
