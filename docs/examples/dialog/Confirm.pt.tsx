import { useState } from "react";
import { Button, ConfirmDialog } from "@prumo";

export default function Confirm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Excluir lote</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Excluir 6 documentos?"
        description="Isso não pode ser desfeito. O histórico continua no registro de auditoria."
        confirmLabel="Excluir lote"
        tone="danger"
    cancelLabel="Cancelar"
    closeLabel="Fechar"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}
