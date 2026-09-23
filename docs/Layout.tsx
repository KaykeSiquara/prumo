import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { Button, IconButton, Menu, MenuItem, Sheet, Switch } from "@prumo";
import { useLang, type Key } from "./i18n";
import { groupName, localDocs } from "./localize";
import { groups } from "./registry";

export const FOUNDATIONS: { slug: string; key: Key }[] = [
  { slug: "color", key: "fColor" }, { slug: "typography", key: "fTypography" }, { slug: "spacing", key: "fSpacing" },
  { slug: "elevation", key: "fElevation" }, { slug: "layers", key: "fLayers" }, { slug: "accessibility", key: "fAccessibility" },
];

type Theme = "light" | "dark" | "system";
const read = (k: string, d: string) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { return; } };

function useChrome() {
  const [theme, setTheme] = useState<Theme>(() => read("prumo:theme", "system") as Theme);
  const [compact, setCompact] = useState(() => read("prumo:density", "comfortable") === "compact");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.prTheme; else root.dataset.prTheme = theme;
    write("prumo:theme", theme);
  }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    if (compact) root.dataset.prDensity = "compact"; else delete root.dataset.prDensity;
    write("prumo:density", compact ? "compact" : "comfortable");
  }, [compact]);
  return { theme, setTheme, compact, setCompact };
}

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const { lang, t } = useLang();
  const docs = localDocs(lang);
  const link = ({ isActive }: { isActive: boolean }) => (isActive ? "doc-nav__link is-active" : "doc-nav__link");
  return (
    <nav aria-label={t("docsNav")} className="doc-nav">
      <p className="doc-nav__group">{t("start")}</p>
      <ul><li><NavLink to="/" end className={link} onClick={onNavigate}>{t("introduction")}</NavLink></li></ul>
      <p className="doc-nav__group">{t("foundations")}</p>
      <ul>{FOUNDATIONS.map((f) => <li key={f.slug}><NavLink to={`/foundations/${f.slug}`} className={link} onClick={onNavigate}>{t(f.key)}</NavLink></li>)}</ul>
      {groups.map((g) => (
        <div key={g}>
          <p className="doc-nav__group">{groupName(g, lang)}</p>
          <ul>{docs.filter((d) => d.group === groupName(g, lang)).map((d) => <li key={d.slug}><NavLink to={`/components/${d.slug}`} className={link} onClick={onNavigate}>{d.name}</NavLink></li>)}</ul>
        </div>
      ))}
    </nav>
  );
}

export function Layout() {
  const chrome = useChrome();
  const { lang, setLang, t } = useLang();
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const first = useRef(true);
  const themeLabel: Record<Theme, string> = { light: t("light"), dark: t("dark"), system: t("system") };
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.querySelector<HTMLElement>("#main h1")?.focus());
  }, [location.pathname]);
  return (
    <div className="doc-shell">
      <a href="#main" className="doc-skip" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>{t("skip")}</a>
      <header className="doc-header">
        <IconButton label={t("openNav")} className="doc-header__menu" onClick={() => setNavOpen(true)}>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </IconButton>
        <NavLink to="/" className="doc-logo"><span className="doc-logo__mark" aria-hidden="true" />Prumo</NavLink>
        <span className="doc-header__tag">v0.1</span>
        <div className="doc-header__tools">
          <Switch label={t("compact")} checked={chrome.compact} onCheckedChange={chrome.setCompact} />
          <Menu label={t("theme")} align="end" trigger={<Button size="sm" aria-label={`${t("theme")}: ${themeLabel[chrome.theme]}`}>{themeLabel[chrome.theme]}</Button>}>
            {(["light", "dark", "system"] as Theme[]).map((th) => <MenuItem key={th} onSelect={() => chrome.setTheme(th)}>{themeLabel[th]}{chrome.theme === th ? " ✓" : ""}</MenuItem>)}
          </Menu>
          <Button size="sm" onClick={() => setLang(lang === "en" ? "pt" : "en")} aria-label={t("langLabel")} lang={lang === "en" ? "pt-BR" : "en"}>{t("langButton")}</Button>
        </div>
      </header>
      <div className="doc-body">
        <aside className="doc-sidebar"><Nav /></aside>
        <Sheet title="Prumo" description={t("docsNav")} side="left" open={navOpen} onOpenChange={setNavOpen} closeLabel={t("closeNav")}><Nav onNavigate={() => setNavOpen(false)} /></Sheet>
        <main id="main" tabIndex={-1} className="doc-main"><Outlet /></main>
      </div>
    </div>
  );
}
