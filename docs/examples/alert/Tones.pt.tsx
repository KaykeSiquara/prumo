import { Alert, Stack } from "@prumo";

export default function Tones() {
  return (
    <Stack gap={3}>
      <Alert tone="info" title="A prestação de contas fecha no dia 5">Documentos lançados depois disso entram no mês seguinte.</Alert>
      <Alert tone="success" title="42 documentos aprovados" />
      <Alert tone="warning" title="Dois documentos vencem hoje">Aprove ou glose antes das 18h.</Alert>
      <Alert tone="danger" title="A exportação falhou">A conexão caiu. Nada foi perdido.</Alert>
    </Stack>
  );
}
