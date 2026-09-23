import { Field, TextInput } from "@prumo";

export default function Loading() {
  return (
    <Field label="Supplier" description="Looking up the registry as you type.">
      <TextInput loading defaultValue="Distribuidora Aur" />
    </Field>
  );
}
