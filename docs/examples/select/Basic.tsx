import { Field, Select } from "@prumo";

export default function Basic() {
  return (
    <Field label="Accounting period">
      <Select defaultValue="2026-03">
        <option value="2026-01">January 2026</option>
        <option value="2026-02">February 2026</option>
        <option value="2026-03">March 2026</option>
      </Select>
    </Field>
  );
}
