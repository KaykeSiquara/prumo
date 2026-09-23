import { Field, TextInput } from "@prumo";

export default function WithHint() {
  return (
    <Field label="Valor do documento" description="Use vírgula para os centavos." required>
      <TextInput inputMode="decimal" placeholder="1.240,00" />
    </Field>
  );
}
