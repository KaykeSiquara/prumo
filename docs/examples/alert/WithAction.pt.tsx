import { Alert, Button } from "@prumo";

export default function WithAction() {
  return (
    <Alert tone="warning" title="3 documentos estão sem comprovante" action={<Button size="sm">Revisar</Button>}>
      Eles só entram na prestação de contas depois que o comprovante for anexado.
    </Alert>
  );
}
