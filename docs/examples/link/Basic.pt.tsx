import { Link } from "@prumo";

export default function Basic() {
  return (
    <p style={{ margin: 0 }}>
      Leia o <Link href="#">guia de contribuição</Link> ou a <Link href="https://www.w3.org/TR/WCAG21/" external externalLabel="abre em nova aba">recomendação WCAG 2.1</Link>.
    </p>
  );
}
