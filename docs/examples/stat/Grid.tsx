import { Stack, Stat } from "@prumo";

export default function Grid() {
  return (
    <Stack direction="row" gap={8} wrap>
      <Stat label="Awaiting approval" value="R$ 131.545,39" delta="57 documents" />
      <Stat label="Rejected in 30 days" value="R$ 30.141,32" delta="3% less than the month before" trend="down" />
      <Stat label="Due in 7 days" value="4" delta="No change" trend="flat" />
    </Stack>
  );
}
