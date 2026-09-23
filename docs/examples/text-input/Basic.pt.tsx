import { Field, IconSearch, Stack, TextArea, TextInput } from "@prumo";

export default function Basic() {
  return (
    <Stack gap={4}>
      <Field label="Buscar documentos" hideLabel>
        <TextInput iconStart={<IconSearch />} placeholder="Buscar por número ou fornecedor" type="search" />
      </Field>
      <Field label="Motivo da glosa" description="Ele vai para o histórico do documento.">
        <TextArea placeholder="Nota fiscal sem o CNPJ do fornecedor." />
      </Field>
    </Stack>
  );
}
