import { Link as RouterLink } from "react-router";
import { EmptyState } from "@prumo";
import { useLang } from "../i18n";
import { usePageTitle } from "../title";

export default function NotFound() {
  const { t } = useLang();
  usePageTitle(t("notFound"));
  return (
    <article className="doc-article">
      <h1 tabIndex={-1} className="doc-h1">{t("notFoundTitle")}</h1>
      <EmptyState title={t("notFoundEmpty")} action={<RouterLink to="/" className="pr-button" data-variant="primary" data-size="md">{t("backHome")}</RouterLink>}>{t("notFoundBody")}</EmptyState>
    </article>
  );
}
