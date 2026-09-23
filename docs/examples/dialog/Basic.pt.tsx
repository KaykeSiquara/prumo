import { Button, Dialog, Field, Stack, TextInput } from "@prumo";

export default function Basic() {
  return (
    <Dialog
      title="Convidar alguém"
      description="A pessoa recebe um e-mail e entra com o papel escolhido."
      closeLabel="Fechar"
  trigger={<Button variant="primary">Convidar</Button>}
      footer={<Button variant="primary">Enviar convite</Button>}
    >
      <Stack gap={4}>
        <Field label="Nome"><TextInput /></Field>
        <Field label="E-mail"><TextInput type="email" /></Field>
      </Stack>
    </Dialog>
  );
}
