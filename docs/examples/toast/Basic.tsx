import { Button, Stack, useToast } from "@prumo";

export default function Basic() {
  const toast = useToast();
  return (
    <Stack direction="row" gap={2} wrap>
      <Button onClick={() => toast("3 documents approved.", { tone: "success" })}>Approve</Button>
      <Button onClick={() => toast("Document archived.", { action: { label: "Undo", onClick: () => toast("Restored.") } })}>Archive</Button>
      <Button onClick={() => toast("The connection failed.", { tone: "danger" })}>Fail</Button>
    </Stack>
  );
}
