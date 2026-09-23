import { Field, IconSearch, Stack, TextArea, TextInput } from "@prumo";

export default function Basic() {
  return (
    <Stack gap={4}>
      <Field label="Search documents" hideLabel>
        <TextInput iconStart={<IconSearch />} placeholder="Search by number or supplier" type="search" />
      </Field>
      <Field label="Reason for rejection" description="It goes into the document's history.">
        <TextArea placeholder="Invoice without the supplier's tax ID." />
      </Field>
    </Stack>
  );
}
