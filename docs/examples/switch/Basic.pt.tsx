import { Stack, Switch } from "@prumo";

export default function Basic() {
  return (
    <Stack gap={4}>
      <Switch label="Simular falhas de rede" description="Toda leitura falha enquanto estiver ligado." />
      <Switch label="Tabelas compactas" defaultChecked />
      <Switch label="Login em duas etapas" description="Gerenciado pela sua organização." disabled />
    </Stack>
  );
}
