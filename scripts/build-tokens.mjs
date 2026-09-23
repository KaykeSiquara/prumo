import { readFileSync, writeFileSync } from "node:fs";

const src = JSON.parse(readFileSync(new URL("../tokens/tokens.json", import.meta.url), "utf8"));
const get = (path) => path.split(".").reduce((o, k) => o?.[k], src);
const resolve = (v) => (typeof v === "string" && /^\{.+\}$/.test(v) ? resolve(get(v.slice(1, -1)).$value) : v);
const cssVar = (v) => (typeof v === "string" && /^\{color\.(.+)\}$/.test(v) ? `var(--pr-${v.slice(7, -1).replace(".", "-")})` : Array.isArray(v) ? `cubic-bezier(${v.join(", ")})` : String(v));

const primitives = [];
for (const [fam, steps] of Object.entries(src.color)) for (const [step, t] of Object.entries(steps)) primitives.push([`--pr-${fam}-${step}`, t.$value]);
const scalar = [];
for (const [k, t] of Object.entries(src.font.family)) scalar.push([`--pr-font-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.font.size)) scalar.push([`--pr-text-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.font.weight)) scalar.push([`--pr-weight-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.font.leading)) scalar.push([`--pr-leading-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.space)) scalar.push([`--pr-space-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.radius)) scalar.push([`--pr-radius-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.control)) scalar.push([`--pr-control-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.motion.duration)) scalar.push([`--pr-duration-${k}`, t.$value]);
for (const [k, t] of Object.entries(src.motion.ease)) scalar.push([`--pr-ease-${k}`, cssVar(t.$value)]);
for (const [k, t] of Object.entries(src.z)) scalar.push([`--pr-z-${k}`, t.$value]);
const theme = (mode) => [
  ...Object.entries(src.semantic[mode]).map(([k, t]) => [`--pr-${k}`, cssVar(t.$value)]),
  ...Object.entries(src.shadow[mode]).map(([k, t]) => [`--pr-shadow-${k}`, t.$value]),
];
const decl = (list, pad = "    ") => list.map(([k, v]) => `${pad}${k}: ${v};`).join("\n");

const css = `@layer prumo.tokens {
  :root {
${decl(primitives)}
${decl(scalar)}
${decl(theme("light"))}
    color-scheme: light;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-pr-theme="light"]) {
${decl(theme("dark"), "      ")}
      color-scheme: dark;
    }
  }
  [data-pr-theme="dark"] {
${decl(theme("dark"))}
    color-scheme: dark;
  }
  [data-pr-theme="light"] {
${decl(theme("light"))}
    color-scheme: light;
  }
  [data-pr-density="compact"] {
    --pr-control-sm: 28px;
    --pr-control-md: 32px;
    --pr-control-lg: 40px;
  }
}
`;
writeFileSync(new URL("../src/styles/tokens.css", import.meta.url), css);

const resolved = { light: {}, dark: {} };
for (const mode of ["light", "dark"]) for (const [k, t] of Object.entries(src.semantic[mode])) resolved[mode][k] = resolve(t.$value);
const palette = Object.fromEntries(Object.entries(src.color).map(([fam, steps]) => [fam, Object.fromEntries(Object.entries(steps).map(([s, t]) => [s, t.$value]))]));
const aliases = { light: {}, dark: {} };
for (const mode of ["light", "dark"]) for (const [k, t] of Object.entries(src.semantic[mode])) aliases[mode][k] = String(t.$value).replace(/^\{color\.(.+)\}$/, "$1");
const pick = (group) => Object.fromEntries(Object.entries(group).map(([k, t]) => [k, t.$value]));
const ts = `export const palette = ${JSON.stringify(palette, null, 2)} as const;

export const semantic = ${JSON.stringify(resolved, null, 2)} as const;

export const semanticAliases = ${JSON.stringify(aliases, null, 2)} as const;

export const scale = ${JSON.stringify({
  space: pick(src.space), radius: pick(src.radius), fontSize: pick(src.font.size), fontWeight: pick(src.font.weight), leading: pick(src.font.leading),
  control: pick(src.control), duration: pick(src.motion.duration), ease: pick(src.motion.ease), breakpoint: pick(src.breakpoint),
  z: Object.fromEntries(Object.entries(src.z).map(([k, t]) => [k, { value: t.$value, description: t.$description }])),
  shadow: { light: pick(src.shadow.light), dark: pick(src.shadow.dark) },
}, null, 2)} as const;

export const pairs = ${JSON.stringify(src.$extensions.prumo.pairs, null, 2)} as const;

export type SemanticToken = keyof typeof semantic.light;
`;
writeFileSync(new URL("../src/tokens/tokens.ts", import.meta.url), ts);

const tw = `@theme inline {
${Object.keys(src.semantic.light).map((k) => `  --color-${k}: var(--pr-${k});`).join("\n")}
${Object.keys(src.radius).map((k) => `  --radius-${k}: var(--pr-radius-${k});`).join("\n")}
${Object.keys(src.font.size).map((k) => `  --text-${k}: var(--pr-text-${k});`).join("\n")}
${Object.keys(src.shadow.light).map((k) => `  --shadow-${k}: var(--pr-shadow-${k});`).join("\n")}
  --font-sans: var(--pr-font-sans);
  --font-mono: var(--pr-font-mono);
}
`;
writeFileSync(new URL("../src/styles/tailwind-theme.css", import.meta.url), tw);
console.log(`tokens: ${primitives.length} primitivas, ${Object.keys(src.semantic.light).length} semânticas por tema, ${scalar.length} de escala`);
