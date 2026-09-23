import { Button, IconChevronDown, Menu, MenuItem, MenuLabel, MenuSeparator } from "@prumo";

export default function Basic() {
  return (
    <Menu label="Document actions" trigger={<Button iconEnd={<IconChevronDown />}>Actions</Button>}>
      <MenuLabel>NF 2.481</MenuLabel>
      <MenuItem shortcut="E">Export CSV</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem tone="danger">Delete</MenuItem>
    </Menu>
  );
}
