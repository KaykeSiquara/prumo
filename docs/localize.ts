import type { Lang } from "./i18n";
import { docs, type Doc } from "./registry";
import { groupsPt, pt } from "./registry.pt";

export function localize(doc: Doc, lang: Lang): Doc {
  if (lang === "en") return doc;
  const p = pt[doc.slug];
  return {
    ...doc,
    name: p.name,
    group: groupsPt[doc.group] ?? doc.group,
    summary: p.summary,
    props: doc.props.map((x) => ({ ...x, description: p.props?.[x.name] ?? x.description })),
    keyboard: p.keyboard ?? doc.keyboard,
    a11y: p.a11y ?? doc.a11y,
    do: p.do ?? doc.do,
    dont: p.dont ?? doc.dont,
  };
}

export const groupName = (group: string, lang: Lang) => (lang === "pt" ? groupsPt[group] ?? group : group);
export const localDocs = (lang: Lang) => docs.map((d) => localize(d, lang));
