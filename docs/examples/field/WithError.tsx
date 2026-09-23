import { Field, TextInput } from "@prumo";

export default function WithError() {
  return (
    <Field label="Supplier tax ID" error="This tax ID has 13 digits; it needs 14.">
      <TextInput defaultValue="1234567800019" />
    </Field>
  );
}
