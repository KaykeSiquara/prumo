import type { ComponentType } from "react";
import type { Key, Lang } from "./i18n";

const modules = import.meta.glob("./examples/*/*.tsx", { eager: true, import: "default" }) as Record<string, ComponentType>;
const sources = import.meta.glob("./examples/*/*.tsx", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

export function example(slug: string, name: string, lang: Lang) {
  const base = `./examples/${slug}/${name}`;
  const key = lang === "pt" && modules[`${base}.pt.tsx`] ? `${base}.pt.tsx` : `${base}.tsx`;
  return { Component: modules[key], source: sources[key] };
}

export const hasPortuguese = (slug: string, name: string) => `./examples/${slug}/${name}.pt.tsx` in modules;

export const titleKey = (name: string) => `ex${name}` as Key;
