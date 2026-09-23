import { Button, Card, Stat } from "@prumo";

export default function Basic() {
  return (
    <Card title="Pago este mês" actions={<Button size="sm">Ver todos</Button>} style={{ maxWidth: 360 }}>
      <Stat label="Pago" value="R$ 113.829,17" delta="14% a mais que no mês anterior" trend="up" />
    </Card>
  );
}
