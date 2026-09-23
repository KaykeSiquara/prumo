import { Breadcrumb } from "@prumo";

export default function Basic() {
  return (
    <Breadcrumb items={[{ label: "Programs", href: "#" }, { label: "Primeira Infância", href: "#" }, { label: "NF 2.481" }]} />
  );
}
