import { Field, Select } from "@prumo";

export default function Basic() {
  return (
    <Field label="Competência">
      <Select defaultValue="2026-03">
        <option value="2026-01">Janeiro de 2026</option>
        <option value="2026-02">Fevereiro de 2026</option>
        <option value="2026-03">Março de 2026</option>
      </Select>
    </Field>
  );
}
