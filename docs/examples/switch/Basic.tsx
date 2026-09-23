import { Stack, Switch } from "@prumo";

export default function Basic() {
  return (
    <Stack gap={4}>
      <Switch label="Simulate network failures" description="Every read fails while this is on." />
      <Switch label="Compact tables" defaultChecked />
      <Switch label="Two-factor sign-in" description="Managed by your organization." disabled />
    </Stack>
  );
}
