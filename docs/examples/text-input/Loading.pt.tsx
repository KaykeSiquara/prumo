import { Field, TextInput } from "@prumo";

export default function Loading() {
  return (
    <Field label="Fornecedor" description="Consultando o cadastro enquanto você digita.">
      <TextInput loading defaultValue="Distribuidora Aur" />
    </Field>
  );
}
