import { Field, TextInput } from "@prumo";

export default function WithHint() {
  return (
    <Field label="Document amount" description="Use a period for the cents." required>
      <TextInput inputMode="decimal" placeholder="1,240.00" />
    </Field>
  );
}
