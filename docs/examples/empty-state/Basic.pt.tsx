import { Button, Card, EmptyState, IconSearch } from "@prumo";

export default function Basic() {
  return (
    <Card padded={false}>
      <EmptyState title="Nenhum documento com esses filtros" icon={<IconSearch />} action={<Button>Limpar filtros</Button>}>
        Tente outro estado ou programa, ou busque pelo nome do fornecedor.
      </EmptyState>
    </Card>
  );
}
