import { useState, type JSX } from "react";
import { useParams } from "react-router";
import { Button, Card, Table, Td, Th, contrastRatio, inGamut, oklabDistance, pairs, palette, scale, semantic, semanticAliases, toHex } from "@prumo";
import { Pass, Section } from "../components/Blocks";
import { Rich, useLang, type Key } from "../i18n";
import { FOUNDATIONS } from "../Layout";
import { usePageTitle } from "../title";
import NotFound from "./NotFound";

type Mode = "light" | "dark";
type S = keyof typeof semantic.light;
const MODES: Mode[] = ["light", "dark"];
const sw = (value: string) => ({ background: value });

function Color() {
  const { t } = useLang();
  const statuses = ["success", "warning", "danger", "info"] as const;
  const allIn = Object.values(palette).every((f) => Object.values(f).every(inGamut));
  const passing = MODES.reduce((n, m) => n + pairs.filter((p) => contrastRatio(semantic[m][p.fg as S], semantic[m][p.bg as S]) >= p.min).length, 0);
  const col = (m: Mode) => (m === "light" ? t("lightCol") : t("darkCol"));
  return (
    <>
      <p className="doc-lead">{t("colorLead")}</p>
      <div className="doc-row"><Pass ok={allIn}>{allIn ? t("allInGamut") : t("someOutGamut")}</Pass><Pass ok={passing === pairs.length * 2}>{t("pairsPass", { n: passing, total: pairs.length * 2 })}</Pass></div>
      <Section title={t("palette")} id="palette">
        <p className="doc-p">{t("paletteBody")}</p>
        {Object.entries(palette).map(([fam, steps]) => (
          <div key={fam} className="doc-palette">
            <h3 className="doc-h3">{fam}</h3>
            <ol className="doc-swatches" aria-label={t("scaleOf", { name: fam })}>
              {Object.entries(steps).map(([step, value]) => (
                <li key={step} className="doc-swatch"><span className="doc-swatch__chip" style={sw(value)} aria-hidden="true" /><span className="doc-swatch__name">{step}</span><code className="doc-swatch__value">{toHex(value)}</code></li>
              ))}
            </ol>
          </div>
        ))}
      </Section>
      <Section title={t("semantic")} id="semantic">
        <p className="doc-p">{t("semanticBody")}</p>
        <div className="doc-table-card">
          <Table caption={t("semanticCaption")}>
            <thead><tr><Th>{t("token")}</Th><Th>{t("lightCol")}</Th><Th>{t("darkCol")}</Th></tr></thead>
            <tbody>
              {(Object.keys(semantic.light) as S[]).map((k) => (
                <tr key={k}>
                  <Td label={t("token")}><code>--pr-{k}</code></Td>
                  {MODES.map((m) => <Td key={m} label={col(m)}><span className="doc-token"><span className="doc-token__chip" style={sw(semantic[m][k])} aria-hidden="true" /><code>{semanticAliases[m][k]}</code></span></Td>)}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>
      <Section title={t("contrast")} id="contrast">
        <p className="doc-p">{t("contrastBody")}</p>
        <div className="doc-table-card">
          <Table caption={t("contrastCaption")}>
            <thead><tr><Th>{t("foreground")}</Th><Th>{t("background")}</Th><Th numeric>{t("minimum")}</Th><Th numeric>{t("lightCol")}</Th><Th numeric>{t("darkCol")}</Th></tr></thead>
            <tbody>
              {pairs.map((p) => (
                <tr key={p.fg + p.bg}>
                  <Td label={t("foreground")}><code>{p.fg}</code></Td><Td label={t("background")}><code>{p.bg}</code></Td><Td label={t("minimum")} numeric>{p.min}:1</Td>
                  {MODES.map((m) => { const r = contrastRatio(semantic[m][p.fg as S], semantic[m][p.bg as S]); return <Td key={m} label={col(m)} numeric><Pass ok={r >= p.min}>{r.toFixed(2)}:1</Pass></Td>; })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>
      <Section title={t("distance")} id="distance">
        <p className="doc-p">{t("distanceBody")}</p>
        <div className="doc-table-card">
          <Table caption={t("distanceCaption")}>
            <thead><tr><Th>{t("pair")}</Th><Th numeric>{t("lightCol")}</Th><Th numeric>{t("darkCol")}</Th></tr></thead>
            <tbody>
              {statuses.flatMap((a, i) => statuses.slice(i + 1).map((b) => (
                <tr key={a + b}><Td label={t("pair")}>{a} × {b}</Td>{MODES.map((m) => <Td key={m} label={col(m)} numeric>{oklabDistance(semantic[m][`${a}-solid`], semantic[m][`${b}-solid`]).toFixed(3)}</Td>)}</tr>
              )))}
            </tbody>
          </Table>
        </div>
      </Section>
    </>
  );
}

function Typography() {
  const { t } = useLang();
  const leading: Record<string, Key> = { tight: "leadingTight", snug: "leadingSnug", normal: "leadingNormal" };
  return (
    <>
      <p className="doc-lead">{t("typeLead")}</p>
      <Section title={t("scale")} id="scale">
        <div className="doc-type-list">
          {Object.entries(scale.fontSize).reverse().map(([k, v]) => (
            <div key={k} className="doc-type-row"><code className="doc-type-row__token">--pr-text-{k}<br /><span>{v} · {parseFloat(v) * 16}px</span></code><p style={{ fontSize: `var(--pr-text-${k})`, margin: 0, lineHeight: 1.25 }}>{t("typeSample")}</p></div>
          ))}
        </div>
      </Section>
      <Section title={t("weightLeading")} id="weight">
        <div className="doc-grid">
          {Object.entries(scale.fontWeight).map(([k, v]) => <Card key={k}><p style={{ fontWeight: v, margin: 0, fontSize: "var(--pr-text-xl)" }}>{k}</p><code>--pr-weight-{k}: {v}</code></Card>)}
          {Object.entries(scale.leading).map(([k, v]) => <Card key={k}><p style={{ lineHeight: v, margin: 0 }}>{t(leading[k], { k })}</p><code>--pr-leading-{k}: {v}</code></Card>)}
        </div>
      </Section>
    </>
  );
}

function Spacing() {
  const { t } = useLang();
  const bands: Key[] = ["bp0", "bp1", "bp2", "bp3", "bp4"];
  return (
    <>
      <p className="doc-lead">{t("spacingLead")}</p>
      <Section title={t("space")} id="space">
        <ul className="doc-bars">{Object.entries(scale.space).map(([k, v]) => <li key={k}><code>--pr-space-{k}</code><span className="doc-bar" style={{ width: v === "0" ? 1 : v }} aria-hidden="true" /><span>{v}</span></li>)}</ul>
      </Section>
      <Section title={t("radius")} id="radius">
        <div className="doc-row">{Object.entries(scale.radius).map(([k, v]) => <div key={k} className="doc-radius" style={{ borderRadius: v }}><code>{k}</code><span>{v}</span></div>)}</div>
      </Section>
      <Section title={t("controlHeight")} id="control">
        <p className="doc-p">{t("controlBody")}</p>
        <div className="doc-row" style={{ alignItems: "flex-end" }}>{(["sm", "md", "lg"] as const).map((s) => <Button key={s} size={s}>{s} · {scale.control[s]}</Button>)}</div>
      </Section>
      <Section title={t("breakpoints")} id="breakpoints">
        <p className="doc-p">{t("breakpointsBody")}</p>
        <div className="doc-table-card">
          <Table caption={t("breakpoints")}>
            <thead><tr><Th>{t("token")}</Th><Th numeric>{t("width")}</Th><Th>{t("typicalScreen")}</Th></tr></thead>
            <tbody>{Object.entries(scale.breakpoint).map(([k, v], i) => <tr key={k}><Td label={t("token")}><code>{k}</code></Td><Td label={t("width")} numeric>{v}</Td><Td label={t("typicalScreen")}>{t(bands[i])}</Td></tr>)}</tbody>
          </Table>
        </div>
      </Section>
    </>
  );
}

function Elevation() {
  const { t } = useLang();
  const [moved, setMoved] = useState(false);
  return (
    <>
      <p className="doc-lead">{t("elevLead")}</p>
      <Section title={t("shadow")} id="shadow">
        <div className="doc-grid">{Object.keys(scale.shadow.light).map((k) => <div key={k} className="doc-elev" style={{ boxShadow: `var(--pr-shadow-${k})` }}><code>--pr-shadow-{k}</code></div>)}</div>
      </Section>
      <Section title={t("motion")} id="motion">
        <p className="doc-p">{t("motionBody")}</p>
        <Button onClick={() => setMoved(!moved)}>{moved ? t("moveBack") : t("moveSquares")}</Button>
        <div className="doc-motion">
          {Object.entries(scale.duration).map(([k, v]) => (
            <div key={k} className="doc-motion__row"><code>{k} · {v}</code><span className="doc-motion__track"><span className="doc-motion__dot" style={{ transform: moved ? "translateX(calc(100cqi - 1.5rem))" : "none", transitionDuration: v }} /></span></div>
          ))}
        </div>
        <p className="doc-p"><Rich text={t("easing", { standard: `cubic-bezier(${scale.ease.standard.join(", ")})`, emphasized: `cubic-bezier(${scale.ease.emphasized.join(", ")})` })} /></p>
      </Section>
    </>
  );
}

function Layers() {
  const { t } = useLang();
  const layers = Object.entries(scale.z).filter(([k]) => k !== "base").reverse();
  return (
    <>
      <p className="doc-lead">{t("layersLead")}</p>
      <Section title={t("theScale")} id="scale">
        <ol className="doc-layers" aria-label={t("layersList")}>
          {layers.map(([k, z], i) => (
            <li key={k} className="doc-layer" style={{ marginLeft: `${i * 1.25}rem` }}>
              <code className="doc-layer__name">--pr-z-{k}</code><span className="doc-layer__value">{z.value}</span><span className="doc-layer__desc">{t(`z${k}` as Key)}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section title={t("whyOrder")} id="why">
        <ul className="doc-list">{(["why1", "why2", "why3"] as const).map((k) => <li key={k}>{t(k)}</li>)}</ul>
      </Section>
    </>
  );
}

function Accessibility() {
  const { t } = useLang();
  const focusOk = MODES.every((m) => contrastRatio(semantic[m].focus, semantic[m].bg) >= 3 && contrastRatio(semantic[m].focus, semantic[m].surface) >= 3);
  return (
    <>
      <p className="doc-lead">{t("a11yLead")}</p>
      <Section title={t("sevenTitle")} id="states"><p className="doc-p"><Rich text={t("sevenBody")} /></p></Section>
      <Section title={t("focus")} id="focus"><p className="doc-p">{t("focusBody")}</p><Pass ok={focusOk}>{focusOk ? t("focusOk") : t("focusBad")}</Pass></Section>
      <Section title={t("keeps")} id="contract"><ul className="doc-list">{(["k1", "k2", "k3", "k4", "k5", "k6", "k7"] as const).map((k) => <li key={k}><Rich text={t(k)} /></li>)}</ul></Section>
      <Section title={t("tested")} id="tests"><ul className="doc-list">{(["t1", "t2", "t3"] as const).map((k) => <li key={k}>{t(k)}</li>)}</ul></Section>
    </>
  );
}

const PAGES: Record<string, () => JSX.Element> = { color: Color, typography: Typography, spacing: Spacing, elevation: Elevation, layers: Layers, accessibility: Accessibility };

export default function Foundation() {
  const { t } = useLang();
  const { page = "" } = useParams();
  const meta = FOUNDATIONS.find((f) => f.slug === page);
  usePageTitle(meta ? t(meta.key) : t("notFound"));
  const Page = PAGES[page];
  if (!meta || !Page) return <NotFound />;
  return (
    <article className="doc-article">
      <p className="doc-eyebrow">{t("foundations")}</p>
      <h1 tabIndex={-1} className="doc-h1">{t(meta.key)}</h1>
      <Page />
    </article>
  );
}
