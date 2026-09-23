import { useParams } from "react-router";
import { Badge } from "@prumo";
import { Example, KeyboardTable, PropsTable, Section, StateMatrix } from "../components/Blocks";
import { useLang } from "../i18n";
import { localize } from "../localize";
import { docs } from "../registry";
import { usePageTitle } from "../title";
import NotFound from "./NotFound";

export default function ComponentPage() {
  const { lang, t } = useLang();
  const { slug = "" } = useParams();
  const found = docs.find((d) => d.slug === slug);
  const doc = found ? localize(found, lang) : undefined;
  usePageTitle(doc?.name ?? t("notFound"));
  if (!doc) return <NotFound />;
  return (
    <article className="doc-article">
      <p className="doc-eyebrow">{doc.group}</p>
      <h1 tabIndex={-1} className="doc-h1">{doc.name}</h1>
      <p className="doc-lead">{doc.summary}</p>
      <pre className="doc-code doc-code--inline" tabIndex={0} aria-label={t("importLabel")}><code>{`import { ${doc.exports.join(", ")} } from "@kaykesiquara/prumo";`}</code></pre>
      <Section title={t("examples")} id="examples">{doc.examples.map((e) => <Example key={`${lang}-${e}`} slug={doc.slug} name={e} />)}</Section>
      {doc.states && <Section title={t("states")} id="states"><p className="doc-p">{t("statesIntro")}</p><StateMatrix kind={doc.states} /></Section>}
      <Section title={t("props")} id="props"><PropsTable props={doc.props} /></Section>
      {doc.keyboard.length > 0 && <Section title={t("keyboard")} id="keyboard"><KeyboardTable rows={doc.keyboard} /></Section>}
      {doc.a11y.length > 0 && <Section title={t("accessibility")} id="a11y"><ul className="doc-list">{doc.a11y.map((a) => <li key={a}>{a}</li>)}</ul></Section>}
      {(doc.do.length > 0 || doc.dont.length > 0) && (
        <Section title={t("usage")} id="usage">
          <div className="doc-grid">
            {doc.do.length > 0 && <div className="doc-guide" data-kind="do"><Badge tone="success" icon="✓">{t("do")}</Badge><ul className="doc-list">{doc.do.map((x) => <li key={x}>{x}</li>)}</ul></div>}
            {doc.dont.length > 0 && <div className="doc-guide" data-kind="dont"><Badge tone="danger" icon="✕">{t("dont")}</Badge><ul className="doc-list">{doc.dont.map((x) => <li key={x}>{x}</li>)}</ul></div>}
          </div>
        </Section>
      )}
    </article>
  );
}
