import { Field, TextInput } from "@prumo";

export default function WithError() {
  return (
    <Field label="CNPJ do fornecedor" error="Este CNPJ tem 13 dígitos; precisa de 14.">
      <TextInput defaultValue="1234567800019" />
    </Field>
  );
}
