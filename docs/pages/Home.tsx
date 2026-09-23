import { Alert, Card, Stat, pairs, palette, semantic } from "@prumo";
import { Section } from "../components/Blocks";
import { Rich, useLang } from "../i18n";
import { docs } from "../registry";
import { usePageTitle } from "../title";

export const COMPONENTS = [
  "Button", "IconButton", "Spinner", "Field", "TextInput", "TextArea", "Select", "Checkbox", "RadioGroup", "Switch", "Badge", "Alert", "Progress", "Skeleton",
  "Card", "Kbd", "Link", "VisuallyHidden", "Stack", "Dialog", "ConfirmDialog", "Sheet", "Popover", "Tooltip", "Menu", "Tabs", "Toast", "Table", "Pagination",
  "Breadcrumb", "Avatar", "EmptyState", "Stat",
];

export default function Home() {
  const { t } = useLang();
  usePageTitle(t("introduction"));
  const primitives = Object.values(palette).reduce((n, f) => n + Object.keys(f).length, 0);
  const principles = [["p1t", "p1d"], ["p2t", "p2d"], ["p3t", "p3d"], ["p4t", "p4d"]] as const;
  return (
    <article className="doc-article">
      <p className="doc-eyebrow">{t("eyebrowDs")}</p>
      <h1 tabIndex={-1} className="doc-h1">Prumo</h1>
      <p className="doc-lead">{t("homeLead")}</p>
      <div className="doc-stats">
        <Card><Stat label={t("statComponents")} value={COMPONENTS.length} delta={t("statComponentsNote", { n: docs.length })} /></Card>
        <Card><Stat label={t("statColors")} value={primitives} delta={t("statColorsNote", { n: Object.keys(semantic.light).length })} /></Card>
        <Card><Stat label={t("statPairs")} value={pairs.length * 2} delta={t("statPairsNote", { n: pairs.length })} /></Card>
      </div>
      <Section title={t("principles")} id="principles">
        <div className="doc-grid">{principles.map(([a, b]) => <Card key={a} title={t(a)} headingLevel={3}><p className="doc-p">{t(b)}</p></Card>)}</div>
      </Section>
      <Section title={t("startTitle")} id="start">
        <pre className="doc-code" tabIndex={0} aria-label={t("installLabel")}><code>{`npm install @kaykesiquara/prumo

import "@kaykesiquara/prumo/styles.css";
import { Button, Field, TextInput } from "@kaykesiquara/prumo";

<Field label="${t("codeComment")}" description="${t("codeHint")}">
  <TextInput />
</Field>
<Button variant="primary">${t("codeSave")}</Button>`}</code></pre>
        <p className="doc-p"><Rich text={t("tailwindNote")} /></p>
        <Alert tone="info" title={t("themesTitle")}><Rich text={t("themesBody")} /></Alert>
      </Section>
      <Section title={t("next")} id="next">
        <ul className="doc-list">{(["nextColor", "nextA11y", "nextButton"] as const).map((k) => <li key={k}><Rich text={t(k)} /></li>)}</ul>
      </Section>
    </article>
  );
}
