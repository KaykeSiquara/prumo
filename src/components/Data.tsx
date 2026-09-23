import { createContext, useContext, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { IconArrowDown, IconArrowUp, IconArrowUpDown, IconChevronLeft, IconChevronRight } from "../icons";
import { cx } from "../utils";

export type TableProps = HTMLAttributes<HTMLTableElement> & { caption: ReactNode; hideCaption?: boolean; density?: "comfortable" | "compact"; stackBelow?: boolean };

export function Table({ caption, hideCaption = true, density = "comfortable", stackBelow = true, className, children, ...rest }: TableProps) {
  return (
    <div className="pr-table-wrap" data-stack={stackBelow || undefined}>
      <table className={cx("pr-table", className)} data-density={density} {...rest}>
        <caption className={hideCaption ? "pr-visually-hidden" : "pr-table__caption"}>{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export type SortDirection = "ascending" | "descending";
export type ThProps = ThHTMLAttributes<HTMLTableCellElement> & { sort?: SortDirection | false; onSort?: () => void; numeric?: boolean };

export function Th({ sort, onSort, numeric = false, className, children, ...rest }: ThProps) {
  const sortable = sort !== undefined;
  const Icon = sort === "ascending" ? IconArrowUp : sort === "descending" ? IconArrowDown : IconArrowUpDown;
  return (
    <th scope="col" aria-sort={sort || undefined} className={cx("pr-table__th", className)} data-numeric={numeric || undefined} {...rest}>
      {sortable ? <button type="button" className="pr-table__sort" onClick={onSort} data-active={sort ? true : undefined}>{children}<Icon className="pr-table__sort-icon" /></button> : children}
    </th>
  );
}

export type TdProps = TdHTMLAttributes<HTMLTableCellElement> & { label?: string; numeric?: boolean };

export function Td({ label, numeric = false, className, ...rest }: TdProps) {
  return <td data-label={label} data-numeric={numeric || undefined} className={cx("pr-table__td", className)} {...rest} />;
}

export type PaginationProps = { page: number; pages: number; onPageChange: (page: number) => void; label?: string; previousLabel?: string; nextLabel?: string; pageLabel?: (p: number) => string };

export function pageWindow(page: number, pages: number): (number | "gap")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => { if (i && p - sorted[i - 1] > 1) out.push("gap"); out.push(p); });
  return out;
}

export function Pagination({ page, pages, onPageChange, label = "Pagination", previousLabel = "Previous", nextLabel = "Next", pageLabel = (p) => `Page ${p}` }: PaginationProps) {
  return (
    <nav className="pr-pagination" aria-label={label}>
      <button type="button" className="pr-pagination__button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><IconChevronLeft /><span>{previousLabel}</span></button>
      <ul className="pr-pagination__pages">
        {pageWindow(page, pages).map((p, i) => (
          <li key={p === "gap" ? `gap-${i}` : p}>
            {p === "gap" ? <span className="pr-pagination__gap" aria-hidden="true">…</span> : (
              <button type="button" className="pr-pagination__page" aria-current={p === page ? "page" : undefined} aria-label={pageLabel(p)} onClick={() => onPageChange(p)}>{p}</button>
            )}
          </li>
        ))}
      </ul>
      <button type="button" className="pr-pagination__button" disabled={page >= pages} onClick={() => onPageChange(page + 1)}><span>{nextLabel}</span><IconChevronRight /></button>
    </nav>
  );
}

export function Breadcrumb({ items, label = "Breadcrumb" }: { items: { label: ReactNode; href?: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="pr-breadcrumb">
      <ol>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {last || !it.href ? <span aria-current={last ? "page" : undefined}>{it.label}</span> : <a href={it.href} className="pr-link">{it.label}</a>}
              {!last && <IconChevronRight className="pr-breadcrumb__sep" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Avatar({ name, src, size = "md" }: { name: string; src?: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className="pr-avatar" data-size={size} role="img" aria-label={name}>
      {src ? <img src={src} alt="" /> : <span aria-hidden="true">{initials}</span>}
    </span>
  );
}

export function EmptyState({ title, children, action, icon }: { title: ReactNode; children?: ReactNode; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="pr-empty">
      {icon && <span className="pr-empty__icon" aria-hidden="true">{icon}</span>}
      <p className="pr-empty__title">{title}</p>
      {children && <div className="pr-empty__text">{children}</div>}
      {action && <div className="pr-empty__action">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, delta, trend }: { label: ReactNode; value: ReactNode; delta?: ReactNode; trend?: "up" | "down" | "flat" }) {
  const symbol = trend === "up" ? "↑" : trend === "down" ? "↓" : trend === "flat" ? "→" : null;
  return (
    <div className="pr-stat">
      <p className="pr-stat__label">{label}</p>
      <p className="pr-stat__value">{value}</p>
      {delta && <p className="pr-stat__delta" data-trend={trend}>{symbol && <span aria-hidden="true">{symbol} </span>}{delta}</p>}
    </div>
  );
}

const DensityContext = createContext<"comfortable" | "compact">("comfortable");
export const useDensity = () => useContext(DensityContext);
export function DensityProvider({ density, children }: { density: "comfortable" | "compact"; children: ReactNode }) {
  return <DensityContext.Provider value={density}><div data-pr-density={density} style={{ display: "contents" }}>{children}</div></DensityContext.Provider>;
}
