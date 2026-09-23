import { Stack, Stat } from "@prumo";

export default function Grid() {
  return (
    <Stack direction="row" gap={8} wrap>
      <Stat label="Aguardando aprovação" value="R$ 131.545,39" delta="57 documentos" />
      <Stat label="Glosado em 30 dias" value="R$ 30.141,32" delta="3% a menos que no mês anterior" trend="down" />
      <Stat label="Vencem em 7 dias" value="4" delta="Sem variação" trend="flat" />
    </Stack>
  );
}
