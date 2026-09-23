import { Progress, Stack } from "@prumo";

export default function Determinate() {
  return (
    <Stack gap={4}>
      <Progress label="Budget used" value={62} showValue />
      <Progress label="Over budget" value={104} showValue tone="danger" />
    </Stack>
  );
}
