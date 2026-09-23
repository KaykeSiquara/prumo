import { Button, Card, Stat } from "@prumo";

export default function Basic() {
  return (
    <Card title="Paid this month" actions={<Button size="sm">View all</Button>} style={{ maxWidth: 360 }}>
      <Stat label="Paid" value="R$ 113.829,17" delta="14% more than last month" trend="up" />
    </Card>
  );
}
