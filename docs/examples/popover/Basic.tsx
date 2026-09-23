import { Button, Popover, Stack } from "@prumo";

export default function Basic() {
  return (
    <Popover label="Filter by state" trigger={<Button>Filters</Button>}>
      <Stack gap={2}>
        <strong>Filters</strong>
        <span>Popovers hold small, interactive content. Esc closes them.</span>
      </Stack>
    </Popover>
  );
}
