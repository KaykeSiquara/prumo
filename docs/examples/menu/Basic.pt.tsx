import { Button, IconChevronDown, Menu, MenuItem, MenuLabel, MenuSeparator } from "@prumo";

export default function Basic() {
  return (
    <Menu label="Ações do documento" trigger={<Button iconEnd={<IconChevronDown />}>Ações</Button>}>
      <MenuLabel>NF 2.481</MenuLabel>
      <MenuItem shortcut="E">Exportar CSV</MenuItem>
      <MenuItem>Duplicar</MenuItem>
      <MenuSeparator />
      <MenuItem tone="danger">Excluir</MenuItem>
    </Menu>
  );
}
