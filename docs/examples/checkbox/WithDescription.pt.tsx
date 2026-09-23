import { Checkbox } from "@prumo";

export default function WithDescription() {
  return (
    <Checkbox label="Avisar por e-mail quando um documento vencer" description="Uma mensagem por dia, às 8h, só quando algo vence." defaultChecked />
  );
}
