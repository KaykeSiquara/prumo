import { Badge, Button, Sheet, Stack } from "@prumo";

export default function Basic() {
  return (
    <Sheet title="NF 2.481" description="Distribuidora Aurora" trigger={<Button>Open document</Button>}>
      <Stack gap={3}>
        <Badge tone="warning" icon="◐">Pending</Badge>
        <p style={{ margin: 0 }}>R$ 1.240,00, due on March 12.</p>
      </Stack>
    </Sheet>
  );
}
