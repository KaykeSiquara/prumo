import { useState } from "react";
import { Checkbox, Stack } from "@prumo";

export default function Group() {
  const [picked, setPicked] = useState<string[]>(["a"]);
  const all = picked.length === 3;
  const some = picked.length > 0 && !all;
  return (
    <Stack gap={3}>
      <Checkbox label="Todos os documentos pendentes" checked={all} indeterminate={some} onChange={(e) => setPicked(e.target.checked ? ["a", "b", "c"] : [])} />
      <Stack gap={2} style={{ paddingLeft: 28 }}>
        {["a", "b", "c"].map((id, i) => (
          <Checkbox key={id} label={`Nota fiscal 2.48${i + 1}`} checked={picked.includes(id)} onChange={(e) => setPicked(e.target.checked ? [...picked, id] : picked.filter((x) => x !== id))} />
        ))}
      </Stack>
    </Stack>
  );
}
