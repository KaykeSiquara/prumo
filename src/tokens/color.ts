export type Rgb = [number, number, number];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function parseOklch(value: string): { l: number; c: number; h: number; alpha: number } {
  const m = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/.exec(value);
  if (!m) throw new Error(`Not an oklch() color: ${value}`);
  return { l: Number(m[1]), c: Number(m[2]), h: Number(m[3]), alpha: m[4] === undefined ? 1 : Number(m[4]) };
}

export function oklchToLinear(l: number, c: number, h: number): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const L = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const M = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const S = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S, -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S, -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S];
}

export function inGamut(value: string): boolean {
  const { l, c, h } = parseOklch(value);
  return oklchToLinear(l, c, h).every((v) => v >= -1e-4 && v <= 1 + 1e-4);
}

export function luminance(value: string): number {
  const { l, c, h } = parseOklch(value);
  const [r, g, b] = oklchToLinear(l, c, h).map(clamp01);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fg: string, bg: string): number {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function oklabDistance(x: string, y: string): number {
  const p = parseOklch(x);
  const q = parseOklch(y);
  const ab = (o: { c: number; h: number }) => [o.c * Math.cos((o.h * Math.PI) / 180), o.c * Math.sin((o.h * Math.PI) / 180)];
  const [pa, pb] = ab(p);
  const [qa, qb] = ab(q);
  return Math.hypot(p.l - q.l, pa - qa, pb - qb);
}

export function toHex(value: string): string {
  const { l, c, h } = parseOklch(value);
  const gamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
  return "#" + oklchToLinear(l, c, h).map((v) => Math.round(gamma(clamp01(v)) * 255).toString(16).padStart(2, "0")).join("");
}
