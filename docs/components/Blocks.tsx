import { useId, useState, type ReactNode } from "react";
import { Badge, Button, Checkbox, Select, Switch, Table, Td, TextInput, Th, useToast } from "@prumo";
import { example, titleKey } from "../examples";
import { useLang, type Key } from "../i18n";
import type { Doc } from "../registry";

export function Example({ slug, name }: { slug: string; name: string }) {
  const { lang, t } = useLang();
  const { Component, source } = example(slug, name, lang);
  const [open, setOpen] = useState(false);
  const id = useId();
  const toast = useToast();
  const title = t(titleKey(name));
  const copy = async () => {
    try { await navigator.clipboard.writeText(source); toast(t("copied"), { tone: "success" }); } catch { toast(t("copyFailed"), { tone: "danger" }); }
  };
  return (
    <figure className="doc-example">
      <figcaption className="doc-example__title">{title}</figcaption>
      <div className="doc-example__stage"><Component /></div>
      <div className="doc-example__bar">
        <Button size="sm" variant="ghost" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{open ? t("hideCode") : t("showCode")}</Button>
        <Button size="sm" variant="ghost" onClick={copy}>{t("copyCode")}</Button>
      </div>
      <pre id={id} hidden={!open} className="doc-code" tabIndex={0} aria-label={t("sourceOf", { name: title })}><code>{source}</code></pre>
    </figure>
  );
}

const STATES = [["Default", "stDefault"], ["Hover", "stHover"], ["Focus", "stFocus"], ["Active", "stActive"], ["Disabled", "stDisabled"], ["Loading", "stLoading"], ["Error", "stError"]] as const;
type State = (typeof STATES)[number][0];
const NA: Record<string, Partial<Record<State, Key>>> = {
  button: { Error: "naButtonError" },
  input: { Active: "naInputActive" },
  select: { Active: "naSelectActive", Loading: "naSelectLoading" },
  checkbox: { Loading: "naCheckLoading", Error: "naCheckError" },
  switch: { Loading: "naSwitchLoading", Error: "naSwitchError" },
};

function Sample({ kind, state, label }: { kind: NonNullable<Doc["states"]>; state: State; label: string }) {
  const { t } = useLang();
  const force = ["Hover", "Focus", "Active"].includes(state) ? state.toLowerCase() : undefined;
  const disabled = state === "Disabled";
  const node = (() => {
    switch (kind) {
      case "button": return <Button variant="primary" disabled={disabled} loading={state === "Loading"} tabIndex={-1}>{t("sSave")}</Button>;
      case "input": return <TextInput aria-label={`${t("sAmount")}, ${label}`} defaultValue="1.240,00" disabled={disabled} loading={state === "Loading"} invalid={state === "Error"} tabIndex={-1} />;
      case "select": return <Select aria-label={`${t("sPeriod")}, ${label}`} disabled={disabled} invalid={state === "Error"} tabIndex={-1}><option>{t("sMarch")}</option></Select>;
      case "checkbox": return <Checkbox label={t("sPaid")} defaultChecked disabled={disabled} tabIndex={-1} />;
      case "switch": return <Switch label={t("sAlerts")} defaultChecked disabled={disabled} />;
    }
  })();
  return <div data-pr-state={force} className="doc-state__sample" inert>{node}</div>;
}

export function StateMatrix({ kind }: { kind: NonNullable<Doc["states"]> }) {
  const { t } = useLang();
  return (
    <div className="doc-states" role="list" aria-label={t("sevenStates")}>
      {STATES.map(([s, key]) => {
        const na = NA[kind]?.[s];
        const label = t(key);
        return (
          <div key={s} role="listitem" className="doc-state" data-na={na ? true : undefined}>
            <p className="doc-state__name">{label}</p>
            {na ? <p className="doc-state__na"><span aria-hidden="true">— </span>{t(na)}</p> : <Sample kind={kind} state={s} label={label.toLowerCase()} />}
          </div>
        );
      })}
    </div>
  );
}

export function PropsTable({ props }: { props: Doc["props"] }) {
  const { t } = useLang();
  if (!props.length) return <p className="doc-muted">{t("noProps")}</p>;
  return (
    <div className="doc-table-card">
      <Table caption={t("props")} stackBelow>
        <thead><tr><Th>{t("prop")}</Th><Th>{t("type")}</Th><Th>{t("default")}</Th><Th>{t("description")}</Th></tr></thead>
        <tbody>{props.map((p) => <tr key={p.name}><Td label={t("prop")}><code>{p.name}</code></Td><Td label={t("type")}><code className="doc-type">{p.type || "—"}</code></Td><Td label={t("default")}>{p.default ? <code>{p.default}</code> : "—"}</Td><Td label={t("description")}>{p.description || "—"}</Td></tr>)}</tbody>
      </Table>
    </div>
  );
}

export function KeyboardTable({ rows }: { rows: string[][] }) {
  const { t } = useLang();
  return (
    <div className="doc-table-card">
      <Table caption={t("keyboard")}>
        <thead><tr><Th>{t("keys")}</Th><Th>{t("whatHappens")}</Th></tr></thead>
        <tbody>{rows.map(([k, v]) => <tr key={k}><Td label={t("keys")}><span className="doc-keys">{k.split(", ").map((x) => <kbd key={x} className="pr-kbd">{x}</kbd>)}</span></Td><Td label={t("whatHappens")}>{v}</Td></tr>)}</tbody>
      </Table>
    </div>
  );
}

export function Section({ title, id, children }: { title: string; id: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="doc-section"><h2 id={id} className="doc-h2">{title}</h2>{children}</section>;
}

export function Pass({ ok, children }: { ok: boolean; children: ReactNode }) {
  return <Badge tone={ok ? "success" : "danger"} icon={ok ? "✓" : "✕"}>{children}</Badge>;
}
