import { Link } from "@prumo";

export default function Basic() {
  return (
    <p style={{ margin: 0 }}>
      Read the <Link href="#">contribution guide</Link> or the <Link href="https://www.w3.org/TR/WCAG21/" external>WCAG 2.1 recommendation</Link>.
    </p>
  );
}
