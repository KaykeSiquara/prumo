import { Breadcrumb } from "@prumo";

export default function Basic() {
  return (
    <Breadcrumb label="Você está aqui" items={[{ label: "Programas", href: "#" }, { label: "Primeira Infância", href: "#" }, { label: "NF 2.481" }]} />
  );
}
