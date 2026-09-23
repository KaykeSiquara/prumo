import { Badge, Stack } from "@prumo";

export default function Status() {
  return (
    <Stack direction="row" gap={2} wrap>
      <Badge tone="success" icon="●">Paid</Badge>
      <Badge tone="warning" icon="◐">Pending</Badge>
      <Badge tone="danger" icon="◆">Rejected</Badge>
      <Badge tone="info">New</Badge>
      <Badge>Draft</Badge>
    </Stack>
  );
}
