import { Button, Dialog, Field, Stack, TextInput } from "@prumo";

export default function Basic() {
  return (
    <Dialog
      title="Invite someone"
      description="They get an email and join with the role you pick."
      trigger={<Button variant="primary">Invite</Button>}
      footer={<Button variant="primary">Send invitation</Button>}
    >
      <Stack gap={4}>
        <Field label="Name"><TextInput /></Field>
        <Field label="Email"><TextInput type="email" /></Field>
      </Stack>
    </Dialog>
  );
}
