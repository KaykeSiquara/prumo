import { Button, Card, EmptyState, IconSearch } from "@prumo";

export default function Basic() {
  return (
    <Card padded={false}>
      <EmptyState title="No documents match these filters" icon={<IconSearch />} action={<Button>Clear filters</Button>}>
        Try another state or program, or search by the supplier's name.
      </EmptyState>
    </Card>
  );
}
