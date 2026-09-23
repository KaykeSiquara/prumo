import { useState } from "react";
import { Button, ConfirmDialog } from "@prumo";

export default function Confirm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete batch</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete 6 documents?"
        description="This cannot be undone. Their history stays in the audit log."
        confirmLabel="Delete batch"
        tone="danger"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}
