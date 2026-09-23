import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, describe, expect, it } from "vitest";
import * as Prumo from "../src/index";
import { example, hasPortuguese, titleKey } from "./examples";
import { DICT, LangProvider, useLang, type Lang } from "./i18n";
import { COMPONENTS } from "./pages/Home";
import { docs } from "./registry";
import { pt } from "./registry.pt";
import { FOUNDATIONS } from "./Layout";
import { routes } from "./routes";

const pages = ["/", ...FOUNDATIONS.map((f) => `/foundations/${f.slug}`), ...docs.map((d) => `/components/${d.slug}`)];

function Toasts({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  return <Prumo.ToastProvider dismissLabel={t("dismiss")}>{children}</Prumo.ToastProvider>;
}

async function open(path: string, lang?: Lang) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<LangProvider lang={lang}><Toasts><RouterProvider router={router} /></Toasts></LangProvider>);
  return screen.findByRole("heading", { level: 1 });
}

const audit = async () => {
  const r = await axe.run(document.body, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }, rules: { "color-contrast": { enabled: false } } });
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
};

afterEach(() => localStorage.clear());

describe("documentation content", () => {
  it("documents every component it counts, and exports every one", () => {
    const exported = new Set(docs.flatMap((d) => d.exports));
    for (const c of COMPONENTS) expect(exported.has(c) || exported.has(`${c}Provider`), c).toBe(true);
    for (const e of exported) expect(e in Prumo, e).toBe(true);
  });

  it("translates every component page completely", () => {
    for (const d of docs) {
      const p = pt[d.slug];
      expect(p, d.slug).toBeDefined();
      for (const prop of d.props) expect(p.props?.[prop.name], `${d.slug} ${prop.name}`).toBeDefined();
      expect(p.keyboard?.length ?? 0, `${d.slug} keyboard`).toBe(d.keyboard.length);
      expect(p.a11y?.length ?? 0, `${d.slug} a11y`).toBe(d.a11y.length);
      expect(p.do?.length ?? 0, `${d.slug} do`).toBe(d.do.length);
      expect(p.dont?.length ?? 0, `${d.slug} dont`).toBe(d.dont.length);
    }
  });

  it("has a Portuguese version and a translated title for every example", () => {
    for (const d of docs) for (const e of d.examples) {
      expect(hasPortuguese(d.slug, e), `${d.slug}/${e}`).toBe(true);
      expect(example(d.slug, e, "pt").Component, `${d.slug}/${e}`).toBeTypeOf("function");
      expect(DICT.en[titleKey(e)], `title ${e}`).toBeTruthy();
      expect(DICT.pt[titleKey(e)], `título ${e}`).toBeTruthy();
    }
  });
});

describe("language", () => {
  it("switches the whole site between English and Portuguese and remembers it", async () => {
    const user = userEvent.setup();
    expect(await open("/components/button", "en")).toHaveTextContent("Button");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("heading", { level: 2, name: "Examples" })).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Ler em português" });
    expect(toggle).toHaveAttribute("lang", "pt-BR");
    await user.click(toggle);
    expect(await screen.findByRole("heading", { level: 2, name: "Exemplos" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(screen.getAllByRole("button", { name: "Salvar documento" }).length).toBeGreaterThan(0);
    expect(localStorage.getItem("prumo:lang")).toBe("pt");
    await user.click(screen.getByRole("button", { name: "Read in English" }));
    expect(await screen.findByRole("heading", { level: 2, name: "Examples" })).toBeInTheDocument();
  });

  it("uses the translated labels the library accepts", async () => {
    await open("/components/pagination", "pt");
    expect(screen.getByRole("navigation", { name: "Paginação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 6" })).toHaveAttribute("aria-current", "page");
  });
});

describe.each(["en", "pt"] as const)("pages in %s", (lang) => {
  it.each(pages)("%s has no WCAG 2.1 A or AA violations", async (path) => {
    await open(path, lang);
    expect(await audit()).toEqual([]);
  });
  it("shows a not found page for unknown addresses", async () => {
    expect(await open("/components/nothing", lang)).toHaveTextContent(lang === "pt" ? "Página não encontrada" : "Page not found");
  });
});
