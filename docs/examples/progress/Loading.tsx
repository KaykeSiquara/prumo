import { Progress, Skeleton, Spinner, Stack } from "@prumo";

export default function Loading() {
  return (
    <Stack gap={4}>
      <Progress label="Importing documents" />
      <Stack direction="row" gap={3} align="center"><Spinner label="Loading documents" /><span>Loading documents</span></Stack>
      <Stack gap={2}><Skeleton width="70%" /><Skeleton width="45%" /></Stack>
    </Stack>
  );
}
