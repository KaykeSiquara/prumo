import { describe, expect, it } from "vitest";
import { contrastRatio, inGamut, toHex } from "./color";
import { palette, pairs, semantic } from "./tokens";

describe("palette", () => {
  it.each(Object.entries(palette).flatMap(([fam, steps]) => Object.entries(steps).map(([s, v]) => [`${fam}-${s}`, v])))("%s fits the sRGB gamut", (_, v) => expect(inGamut(v)).toBe(true));
  it("keeps neutrals at low chroma on hue 266", () => {
    for (const v of Object.values(palette.neutral)) expect(v).toMatch(/oklch\([\d.]+ 0\.0[01]\d (266|0)\)/);
  });
  it("converts known values", () => {
    expect(toHex("oklch(1 0 0)")).toBe("#ffffff");
    expect(contrastRatio("oklch(0 0 0)", "oklch(1 0 0)")).toBeCloseTo(21, 3);
  });
});

describe.each(["light", "dark"] as const)("%s theme", (mode) => {
  it.each(pairs.map((p) => [p.fg, p.bg, p.min] as const))("%s on %s reaches %s:1", (fg, bg, min) => {
    const ratio = contrastRatio(semantic[mode][fg as keyof typeof semantic.light], semantic[mode][bg as keyof typeof semantic.light]);
    expect(ratio, `${fg} on ${bg} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(min);
  });
});
