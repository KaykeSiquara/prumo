import { useState } from "react";
import { Button, Stack } from "@prumo";

export default function Loading() {
  const [saving, setSaving] = useState(false);
  return (
    <Stack direction="row" gap={2} wrap>
      <Button variant="primary" loading={saving} onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 1500); }}>
        Save document
      </Button>
      <Button disabled>Disabled</Button>
    </Stack>
  );
}
