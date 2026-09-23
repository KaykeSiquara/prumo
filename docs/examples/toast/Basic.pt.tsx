import { Button, Stack, useToast } from "@prumo";

export default function Basic() {
  const toast = useToast();
  return (
    <Stack direction="row" gap={2} wrap>
      <Button onClick={() => toast("3 documentos aprovados.", { tone: "success" })}>Aprovar</Button>
      <Button onClick={() => toast("Documento arquivado.", { action: { label: "Desfazer", onClick: () => toast("Restaurado.") } })}>Arquivar</Button>
      <Button onClick={() => toast("A conexão falhou.", { tone: "danger" })}>Falhar</Button>
    </Stack>
  );
}
