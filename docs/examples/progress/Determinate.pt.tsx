import { Progress, Stack } from "@prumo";

export default function Determinate() {
  return (
    <Stack gap={4}>
      <Progress label="Orçamento executado" value={62} showValue />
      <Progress label="Acima do orçamento" value={104} showValue tone="danger" />
    </Stack>
  );
}
