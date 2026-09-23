import { Progress, Skeleton, Spinner, Stack } from "@prumo";

export default function Loading() {
  return (
    <Stack gap={4}>
      <Progress label="Importando documentos" />
      <Stack direction="row" gap={3} align="center"><Spinner label="Carregando documentos" /><span>Carregando documentos</span></Stack>
      <Stack gap={2}><Skeleton width="70%" /><Skeleton width="45%" /></Stack>
    </Stack>
  );
}
