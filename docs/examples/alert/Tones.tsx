import { Alert, Stack } from "@prumo";

export default function Tones() {
  return (
    <Stack gap={3}>
      <Alert tone="info" title="Reports close on the 5th">Documents added after that go into next month.</Alert>
      <Alert tone="success" title="42 documents approved" />
      <Alert tone="warning" title="Two documents are due today">Approve or reject them before 6 pm.</Alert>
      <Alert tone="danger" title="The export failed">The connection dropped. Nothing was lost.</Alert>
    </Stack>
  );
}
